App.Till = Ember.Object.extend({
  id: null,
  name: "",
  minimum: 0
});

App.Till.reopenClass({
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