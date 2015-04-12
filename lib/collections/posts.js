/**
 * Created by alex on 11/04/2015.
 */
Posts = new Mongo.Collection('posts');

Posts.allow({
    insert: function(userId, doc) {
        //only allow posting if you are logged in
        return !! userId;
    }
});