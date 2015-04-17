/**
 * Created by alex on 15/04/2015.
 */
Template.meteorErrors.helpers({
    errors: function () {
        return Errors.collection.find();
    }
});

Template.meteorError.rendered = function () {
    var error = this.data;
    Meteor.setTimeout(function () {
        Errors.collection.remove(error._id);
    }, 3000);
};