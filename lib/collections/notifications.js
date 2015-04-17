/**
 * Se crea la notificación cuando alguien comenta un post.
 * Colección Notifications
 * Actualizando notificaciones del lado del cliente
 * Allow debe comprobar:
 *  - el usuario que hace la llamada update es el dueño de la notificación modificada.
 *  - el usuario solo modifica un solo campo
 *  - el campo a modificar es la propiedad read de nuestra aplicación
 * Created by alex on 17/04/2015.
 */

Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function (userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
                fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});

createCommentNotification = function (comment) {
    var post = Posts.findOne(comment.postId);
    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        })
    }
};