/**
 * Created by alex on 11/04/2015.
 */
Template.postsList.helpers({
    posts: function () {
        return Posts.find({}, {sort: {submitted: -1}});
    }
});