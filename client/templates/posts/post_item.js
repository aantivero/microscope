/**
 * Created by alex on 11/04/2015.
 */
Template.postItem.helpers({
    domain: function () {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }
})