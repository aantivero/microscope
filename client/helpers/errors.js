/**
 * Created by alex on 14/04/2015.
 * Colección para almacenar errores de la aplicación del lado del cliente
 */
Errors = new Mongo.Collection(null);

throwError = function (message) {
    Errors.insert({message: message});
};