/**
 * Created by alex on 11/04/2015.
 */
Posts = new Mongo.Collection('posts');

//solo lo puede actualizar y eliminar el que creo el post
Posts.allow({
    update: function (userId, post) {
        console.log("pasa por el allow update");
        return ownsDocument(userId, post);
    },
    remove: function (userId, post) {
        console.log("pasa por el allow remove");
        return ownsDocument(userId, post);
    }
});

//solo se pueden editar ciertos atributos epecíficos
Posts.deny({
    update: function (userId, post, fieldNames) {
        console.log("pasa por el deny update");
        //solo se puede editar dos atributos
        //el método without de underscore devuelve un sub-array
        // con los campos que no son ni url ni title
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

//se añade una nueva regla deny para el update
//el post es la publicacion existente, se llama a validatePost con el contenido del
//modificador $set
Posts.deny({
    update: function (userId, post, fieldNames, modifier){
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

//hay dos llamadas a deny, falla si alguna devuelve true. solo se hara update si:
//se modifica title y url y ninguna está vacía.

//creamos una nueva función para validar el objeto post.
//devuelve errors con cualquiera de los errores relevantes
validatePost = function (post) {
    var errors = {};
    if (!post.title)
        errors.title = "Please fill in a headline";
    if (!post.url)
        errors.url = "Please fill in a URL";
    return errors;
};

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });
        //validaciones del lado del servidor
        var errors = validatePost(postAttributes);
        if (errors.title || errors.url) throw new Meteor.Error('invalid-post', "You must set a title and URL");
        //test compensation
        /*
        if (Meteor.isServer) {
            postAttributes.title += "(server)";
            Meteor._sleepForMs(5000);
        } else {
            postAttributes.title += "(client)";
        }
        */
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount: 0, //me aseguro de que inicia sin comentarios
            upvoters: [],//inicializa sin votantes ni votos
            votes: 0
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    },
    upvote: function (postId) {
        check(this.userId, String);
        check(postId, String);

        //mejora en el algoritmo de voto:
        //encuentra a todos los posts con este id
        // que todavía no fueron votados por este usuario y actualizalos.
        // si ya fueron votados no hará nadame
        var affected = Posts.update({
            _id: postId,
            upvoters: {$ne: this.userId}
        }, {
            $addToSet: {upvoters: this.userId},
            $inc: {votes: 1}
        });
        if (! affected)
            Errors("You weren't able to upvote that post");
    }
});