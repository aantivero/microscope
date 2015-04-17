/**
 * Created by alex on 12/04/2015.
 */
//uso session para almacenar un objeto postSubmitErrors para contener el potencial mensaje de error
Template.postSubmit.created = function () {
  Session.set('postSubmitErrors', {});
};
//vamos a definir dos ayudantes de la plantilla, buscarán la propiedad field donde
//sería url o title
//errorMessage devuelve el mensaje en sí mismo, errorClass comprueba la presencia de un mensaje
// y devuelve has-error en caso de que exista un mensaje
Template.postSubmit.helpers({
    errorMessage: function (field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !! Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});
Template.postSubmit.events({
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        //llamamos a la función de validación
        var errors = validatePost(post);
        if (errors.title || errors.url) {
            return Session.set('postSubmitErrors', errors);
        }

        Meteor.call('postInsert', post, function(error, result){
            //display the error to the user and abort
            if (error)
                Errors.throw(error.reason);

            //show this result but route anyway
            if (result.postExists)
                Errors.throw('This link has already been posted');
            //remove when test compensation
            Router.go('postPage', {_id: result._id});
        });
        //test compensation
        //Router.go('postsList');
    }
});