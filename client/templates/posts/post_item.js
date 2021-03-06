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
    },
    //si no esta conectado o ya ha votado no podrà votar, condicional css para deshabilitar el botón
    upvotedClass: function () {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    }
});
Template.postItem.events({
   'click .upvotable': function (e) {
       e.preventDefault();
       Meteor.call('upvote', this._id);
   }
});