/**
 * Created by alex on 11/04/2015.
 */
Meteor.publish('posts', function () {
    return Posts.find();
});
//se publica comentarios
Meteor.publish('comments', function () {
    return Comments.find();
});