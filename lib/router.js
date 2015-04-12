/**
 * Created by alex on 12/04/2015.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('posts');
    }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});