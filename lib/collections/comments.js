/**
 * Colección para el manejo de comentarios
 * Created by alex on 17/04/2015.
 */

Comments = new Mongo.Collection('comments');

//metodos
Meteor.methods({
    commentInsert: function (commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);
        if (!post)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');
        comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        //incrementamos con un contador de mongo el número de comentarios del post
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});
        return Comments.insert(comment);
    }
});