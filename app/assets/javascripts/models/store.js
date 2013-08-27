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
  query: function(query, filter, page, perPage) {
    console.log('query: ' + query);
    console.log('filter: ' + filter);
    console.log('page: ' + page);
    console.log('perPage: ' + perPage);
    
    return this.fixtures();
  },
  count: function(query, filter) {
    return 2;
  },
  find: function(id) {
    return this.fixtures().objectAt(id);
  },
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
      _store.set('tills', App.Till.fixtures());
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