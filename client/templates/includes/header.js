/**
 * Ayudante para la cabecera
 * Created by alex on 19/04/2015.
 */

Template.header.helpers({
    activeRouteClass: function (/* route names */) {
        //convierte arguments a un array
        var args = Array.prototype.slice.call(arguments, 0);
        //se deshace del hash que añade Spacebars
        args.pop();

        //con la lista de nombres de ruta
        //ayudante any de underscore para ver si las rutas pasan la prueba o sea
        //si su URL es igual a la actual
        //si cualquiera de las rutas se corresponde con la actual any devuelve true
        var active = _.any(args, function (name) {
           return Router.current() && Router.current().route.getName() === name
        });

        //hago uso del patron boolean && myString
        //false && myString devuelve false
        //true && myString devuelve myString
        return active && 'active';
    }
});