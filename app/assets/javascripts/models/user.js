App.User = Ember.Object.extend({
  active: false,
  administrator: false,
  authenticated: true,
  email: "",
  firstName: "",
  lastName: "",
  username: "",
  pin: "",
  pinValue: "",
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName'),
  pinChanged: function() {
    if (this.get('pinValue') === this.get('pin')) {
      this.set('authenticated', false);
    }
  }.observes('pinValue')
});

App.User.reopenClass({
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
    App.User.FIXTURES.forEach(function(user) {
      var _user = App.User.create({
        id: user.id,
        active: user.active,
        administrator: user.administrator,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        pin: user.pin
      });
      fixtures.pushObject(_user);
    });
    return fixtures;
  }
});

App.User.FIXTURES = [
  {
    id: 0,
    active: true,
    administrator: true,
    firstName: 'Bob',
    lastName: 'User',
    email: 'example@example.com',
    username: 'example',
    pin: '0000'
  },
  {
    id: 1,
    active: true,
    administrator: false,
    firstName: 'Bob2',
    lastName: 'User2',
    email: 'example2@example.com',
    username: 'example2',
    pin: '1111'
  }
];