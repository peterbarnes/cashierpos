App.Store = Ember.Object.extend({
  id: null,
  name: "",
  description: "",
  taxRate: 0,
  imageUrl: "",
  tills: null,
  init: function() {
    this._super();
    this.set('tills', Ember.A());
  }
});

App.Store.reopenClass({
  fixtures: function() {
    var fixtures = [];
    App.Store.FIXTURES.forEach(function(store) {
      var _store = App.Store.create({
        id: store.id,
        name: store.name,
        description: store.description,
        taxRate: store.taxRate,
        imageUrl: store.imageUrl
      });
      _stores.set('tills', App.Till.fixtures());
      fixtures.pushObject(_store);
    });
    return fixtures;
  }
});

App.Store.FIXTURES = [
  {
    id: 0,
    name: 'Business 1',
    description: 'Lorem Ipsum...',
    taxRate: 0.07,
    imageUrl: ''
  },
  {
    id: 1,
    name: 'Business 2',
    description: 'Lorem Ipsum...',
    taxRate: 0.06,
    imageUrl: ''
  }
];