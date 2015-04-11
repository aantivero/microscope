/**
 * Created by alex on 11/04/2015.
 */
var postsData = [
    {
        title: 'Introducing Telescopre',
        url: 'http://sachagreif.com/introducing-telescope'
    },
    {
        title: 'Meteor',
        url: 'http://meteor.com'
    },
    {
        title: 'The Meteor Book',
        url: 'http://themeteorbook.com'
    }
];
Template.postsList.helpers({
    posts: postsData
});