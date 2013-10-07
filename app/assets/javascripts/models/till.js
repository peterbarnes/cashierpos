App.Till = Ember.Object.extend({
  id: null,
  name: "",
  minimum: 0,
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
          createdAt: new Date(till.created_at),
          updatedAt: new Date(till.updated_at)
        });
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
  find: function(id) {
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
          createdAt: new Date(till.created_at),
          updatedAt: new Date(till.updated_at)
        });
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
        minimum: till.minimum
      });
      fixtures.pushObject(_till);
    });
    return fixtures;
  }
});

App.Till.reopen({
  save: function() {
    
  }
});

App.Till.FIXTURES = [
  {
    id: 0,
    name: 'Till 1',
    minimum: 0
  },
  {
    id: 1,
    name: 'Till 2',
    minimum: 0
  }
];