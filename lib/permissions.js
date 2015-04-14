/**
 * Created by alex on 13/04/2015.
 */
ownsDocument = function (userId, doc) {
    return doc && doc.userId === userId;
}