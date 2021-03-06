/**
 * Created by alex on 11/04/2015.
 */
Meteor.publish('posts', function (options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Posts.find({}, options);
});
//nueva publicación para un solo post identificado por _id
Meteor.publish('singlePost', function (id) {
   check(id, String);
    return Posts.find(id);
});
/**
 * el patron mas seguro para la publicacion de posts
 * Meteor.publish('posts', function (sort, limit) {
 *  return Posts.find({}, {sort: sort, limit: limit});
 * }
 */
//se publica comentarios
/**Meteor.publish('comments', function () {
    return Comments.find();
});*/
//limitar el conjunto de datos a los comentarios que pertenecen al post actual
Meteor.publish('comments', function (postId) {
    return Comments.find({postId: postId});
});
//publicar las notificaciones
Meteor.publish('notifications', function () {
    //evitar los problemas de privacidad de las notificaciones
    return Notifications.find({userId: this.userId, read: false});
})