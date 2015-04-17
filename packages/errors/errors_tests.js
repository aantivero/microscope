/**
 * Tests para probar el paquete. Se usa Tinytest
 * Created by alex on 16/04/2015.
 * para poder ejecutar los test:
 * meteor test-packages aleantivero:errors
 */
Tinytest.add('Errors - collection', function (test) {
    test.equal(Errors.collection.find({}).count(), 0);

    Errors.throw('A new error!!!');
    test.equal(Errors.collection.find({}).count(), 1);

    Errors.collection.remove({});
});

Tinytest.addAsync('Errors- template', function (test, done) {
    Errors.throw('A new error!');
    test.equal(Errors.collection.find({}).count(), 1);

    //render del template
    UI.insert(UI.render(Template.meteorErrors), document.body);

    Meteor.setTimeout(function () {
       test.equal(Errors.collection.find({}).count(), 0);
        done();
    }, 3500);
});