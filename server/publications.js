/**
 * Created by alex on 11/04/2015.
 */
Meteor.publish('posts', function () {
    return Posts.find();
});
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