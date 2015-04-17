/**
 * Created by alex on 17/04/2015.
 */
Template.postPage.helpers({
   comments: function () {
       //this es un post para comments
       return Comments.find({postId: this._id});
   }
});