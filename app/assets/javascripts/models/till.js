App.Till = Ember.Object.extend({
  id: null,
  name: "",
  minimum: 0
});

App.Till.reopenClass({
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