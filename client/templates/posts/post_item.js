/**
 * Created by alex on 11/04/2015.
 */
Template.postItem.helpers({
    ownPost: function () {
        //enlazar solo si el usuario lo creo
        return this.userId === Meteor.userId();
    },
    domain: function () {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }
})