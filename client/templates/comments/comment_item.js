/**
 * Created by alex on 17/04/2015.
 */
//dar formato a la fecha de envío
Template.commentItem.helpers({
    submittedText: function () {
        return this.submitted.toString();
    }
});