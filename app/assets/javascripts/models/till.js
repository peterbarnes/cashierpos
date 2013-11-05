App.Till = Ember.Object.extend({
  id: null,
  name: "",
  taxRate: 0,
  minimum: 0,
  store: null,
  createdAt: new Date(),
  updatedAt: new Date()
});

App.Till.reopenClass({
  query: function(query, filter, page, perPage, callback) {
    var tills = [];
    $.ajax({
      url: '/api/tills',
      data: {
        query: query,
        filter: filter,
        limit: perPage,
        offset: (page - 1) * perPage
      }
    }).then(function(response) {
      response.forEach(function(object){
        var till = object.till;
        var model = App.Till.create({
          id: till.id,
          name: till.name,
          minimum: till.minimum,
          taxRate: till.tax_rate,
          createdAt: new Date(till.created_at),
          updatedAt: new Date(till.updated_at)
        });
        model.set('store', App.Store.find(till.store_id));
        tills.addObject(model);
      });
      if (callback) {
        callback();
      }
    });
    return tills;
  },
  count: function(query, filter) {
    var count = 0;
    $.ajax({
      url: '/api/tills/count',
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
  find: function(id, callback) {
    if (id) {
      var _till = App.Till.create();
      $.ajax({
        url: "/api/tills/" + id
      }).then(function(response) {
        var till = response.till;
        _till.setProperties({
          id: till.id,
          name: till.name,
          minimum: till.minimum,
          taxRate: till.tax_rate,
          createdAt: new Date(till.created_at),
          updatedAt: new Date(till.updated_at)
        });
        _till.set('store', App.Store.find(till.store_id, callback));
        if (callback) {
          callback();
        }
      });
      return _till;
    }
    return null;
  },
  fixtures: function() {
    var fixtures = [];
    App.Till.FIXTURES.forEach(function(till) {
      var _till = App.Till.create({
        id: till.id,
        name: till.name,
        minimum: till.minimum,
        taxRate: till.tax_rate
      });
      fixtures.pushObject(_till);
    });
    return fixtures;
  }
});

App.Till.FIXTURES = [
  {
    id: 0,
    name: 'Till 1',
    minimum: 0,
    tax_rate: 0
  },
  {
    id: 1,
    name: 'Till 2',
    minimum: 0,
    tax_rate: 0
  }
];