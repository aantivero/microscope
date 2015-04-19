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
        return {sort: {submitted: -1}, limit: this.postsLimit()};
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
            nextPath: hasMore ? nextPath : null
        };
    }
});

//Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function () {
      return Meteor.subscribe('comments', this.params._id);
    },
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

//nuevo router a la página de edición
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {name: 'postSubmit'});

//path de post con limitación para la paginación
Router.route('/:postsLimit?', {
    name: 'postsList'
});

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