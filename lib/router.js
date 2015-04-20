/**
 * Created by alex on 12/04/2015.
 * Agrego la subscripcion a los comentarios
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        //return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
        //return Meteor.subscribe('posts');
        //para la paginacion dejamos solo notifications
        // return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];
        return [Meteor.subscribe('notifications')];
    }
});

//controlador de ruta, agrupar en un paquete reutilizable características de enrutamiento
//que puede heredar cualquier ruta
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    //devuleve el número actual de posts que nos gustaría mostrar
    postsLimit: function () {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function () {
        return {sort: this.sort, limit: this.postsLimit()};
    },
    subscriptions: function () {
        //hook para la suscripcion y dejar de usar waitOn
        //al sacar el waitOn no recarga toda la página
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    //cursor actual de posts
    posts: function () {
      return Posts.find({}, this.findOptions());
    },
    data: function () {
        var hasMore = this.posts().count() === this.postsLimit();
        //esta armando la url con un path
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,//lo comprobaremos en la plantilla
            nextPath: hasMore ? this.nextPath() : null
        };
    }
});
//extendemos dos controladores
//devuelve los mas nuevos
NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function () {
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment});
    }
});
//devuelve los mas votados
BestPostsController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath: function () {
        return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment});
    }
});

//Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function () {
      return [
          Meteor.subscribe('singlePost', this.params._id),
          Meteor.subscribe('comments', this.params._id)
          ];
    },
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

//nuevo router a la página de edición
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn: function () {
        return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/', {
    name: 'home',
    controller: NewPostsController
});
Router.route('/new/:postsLimit?', {name: 'newPosts'});
Router.route('/best/:postsLimit?', {name: 'bestPosts'});

var requireLogin = function () {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }

    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});