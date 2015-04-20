/**
 * Nuevo ayudante de Spacebars para utilizar en la pluralización
 * Con UI.registerHelper se crea un ayudante global que se puede utilizar en cualquier plantilla
 * Created by alex on 19/04/2015.
 */
UI.registerHelper('pluralize', function (n, thing) {
    //pluralización sencilla
    if (n === 1) {
        return '1 ' + thing;
    } else {
        return n + ' ' + thing + 's';
    }
});