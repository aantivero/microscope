/**
 * ayudante para el manejo de errores
 * Created by alex on 14/04/2015.
 */
Template.errors.helpers({
    errors: function () {
        return Errors.find();
    }
});