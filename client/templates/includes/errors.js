/**
 * ayudante para el manejo de errores
 * Created by alex on 14/04/2015.
 */
Template.errors.helpers({
    errors: function () {
        return Errors.find();
    }
});

//vamos a eliminar de la colección los antiguos errores
//vamos hacer una función que se ejecute después de 3000 milisegundos
//la llamada rendered se llama una vez que la plantilla ha sido renderizada
Template.error.rendered = function () {
    //this hace referencia a la instancia actual de la plantilla
    //this.data nos da acceso a los datos del objeto que está siendo renderizado
    var error = this.data;
    Meteor.setTimeout(function () {
        Errors.remove(error._id);
    }, 3000);
};