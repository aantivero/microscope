/**
 * Created by alex on 13/04/2015.
 * Manipula post_edit.html
 */
Template.postEdit.events({
   'function form': function (e) {
       e.preventDefault();

       var currentPostId = this._id;

       var postProperties = {
           url: $(e.target).find('[name=url]').val(),
           title: $(e.target).find('[name=title]').val()
       }

       Posts.update(currentPostId, {$set: postProperties}, function (error) {
          if (error) {
              //display the error
              alert(error.reason);
          } else {
              Router.go('postPage', {_id: currentPostId});
          }
       });
   },
    'click .delete': function (e) {
        e.preventDefault();
        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});