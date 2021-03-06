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
  gravatarUrl: "",
  till: null,
  createdAt: new Date(),
  updatedAt: new Date(),
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
  query: function(query, filter, page, perPage, callback) {
    var users = [];
    $.ajax({
      url: '/api/users',
      data: {
        query: query,
        filter: filter,
        limit: perPage,
        offset: (page - 1) * perPage
      }
    }).then(function(response) {
      response.forEach(function(object){
        var user = object.user;
        var model = App.User.create({
          id: user.id,
          active: user.active,
          administrator: user.administrator,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          username: user.username,
          pin: user.pin,
          gravatarUrl: user.gravatar_url,
          createdAt: new Date(user.created_at),
          updatedAt: new Date(user.updated_at)
        });
        model.set('till', App.Till.find(user.till_id));
        users.addObject(model);
      });
      if (callback) {
        callback();
      }
    });
    return users;
  },
  count: function(query, filter) {
    var count = 0;
    $.ajax({
      url: '/api/users/count',
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
      var _user = App.User.create();
      $.ajax({
        url: "/api/users/" + id
      }).then(function(response) {
        var user = response.user;
        _user.setProperties({
          id: user.id,
          active: user.active,
          administrator: user.administrator,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          username: user.username,
          pin: user.pin,
          gravatarUrl: user.gravatar_url,
          tillId: user.till_id,
          createdAt: new Date(user.created_at),
          updatedAt: new Date(user.updated_at)
        });
        _user.set('till', App.Till.find(user.till_id));
        if (callback) {
          callback();
        }
      });
      return _user;
    }
    return null;
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