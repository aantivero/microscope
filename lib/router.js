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
    name: 'postsList',
    waitOn: function () {
        //considerar si llega el parametro caso contrario usaremos 5
        var limit = parseInt(this.params.postsLimit) || 5;
        //se pasa el objeto options como parametro
        return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
    },
    //la función data devuelve un objeto javascript, esto nos permite crear un contexto de datos
    //que llamamos posts. lo que significa es que en lugr en disponer en this también
    //disponible como posts
    //no necesitamos mas del helper posts_list.js
    data: function () {
        var limit = parseInt(this.params.postsLimit) || 5;
        return {
            posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
        };
    }
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