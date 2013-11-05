App.Store = Ember.Object.extend({
  id: null,
  name: "",
  description: "",
  imageUrl: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  tills: null,
  init: function() {
    this._super();
    this.set('tills', Ember.A());
  }
});

App.Store.reopenClass({
  query: function(query, filter, page, perPage, callback) {
    var stores = [];
    $.ajax({
      url: '/api/stores',
      data: {
        query: query,
        filter: filter,
        limit: perPage,
        offset: (page - 1) * perPage
      }
    }).then(function(response) {
      response.forEach(function(object){
        var store = object.store;
        var model = App.Store.create({
          id: store.id,
          name: store.name,
          description: store.description,
          imageUrl: store.image_url,
          createdAt: new Date(store.created_at),
          updatedAt: new Date(store.updated_at)
        });
        var tills = [];
        store.tills.forEach(function(till) {
          var _till = App.Till.create({
            id: till.id,
            name: till.name,
            minimum: till.minimum,
            taxRate: till.tax_rate,
            createdAt: new Date(till.created_at),
            updatedAt: new Date(till.updated_at)
          });
          tills.addObject(_till);
        });
        model.set('tills', tills);
        stores.addObject(model);
      });
      if (callback) {
        callback();
      }
    });
    return stores;
  },
  count: function(query, filter) {
    var count = 0;
    $.ajax({
      url: '/api/stores/count',
      data: {
        query: query,
        filter: filter
      },
      success: function(result) {
        count = result.count;
      },
      async: false
    });
    return count;
  },
  find: function(id) {
    if (id) {
      var _store = App.Store.create();
      $.ajax({
        url: "/api/stores/" + id
      }).then(function(response) {
        var store = response.store;
        _store.setProperties({
          id: store.id,
          name: store.name,
          description: store.description,
          imageUrl: store.image_url,
          createdAt: new Date(store.created_at),
          updatedAt: new Date(store.updated_at)
        });
        var tills = [];
        _store.tills.forEach(function(till) {
          var _till = App.Till.create({
            id: till.id,
            name: till.name,
            minimum: till.minimum,
            taxRate: till.tax_rate,
            createdAt: new Date(till.created_at),
            updatedAt: new Date(till.updated_at)
          });
          tills.addObject(_till);
        });
        _store.set('tills', tills);
      });
      return _store;
    }
    return null;
  },
  fixtures: function() {
    var fixtures = [];
    App.Store.FIXTURES.forEach(function(store) {
      var _store = App.Store.create({
        id: store.id,
        name: store.name,
        description: store.description,
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
    imageUrl: ''
  },
  {
    id: 1,
    name: 'Business 2',
    description: 'Lorem Ipsum...',
    imageUrl: ''
  }
];