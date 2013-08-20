App.Unit = Ember.Object.extend({
  id: null,
  name: "",
  sku: "",
  price: 0,
  taxable: true
});

App.Unit.reopenClass({
  fixtures: function() {
    var fixtures = [];
    App.Unit.FIXTURES.forEach(function(unit) {
      var _unit = App.Unit.create({
        id: unit.id,
        name: unit.name,
        minimum: unit.minimum
      });
      fixtures.pushObject(_unit);
    });
  }
});

App.Unit.FIXTURES = [
  {
    id: 0,
    sku: '1234',
    price: 1234,
    name: 'Unit 1',
    taxable: true,
  },
  {
    id: 1,
    sku: '2345',
    price: 2345,
    name: 'Unit 2',
    taxable: false
  }
];