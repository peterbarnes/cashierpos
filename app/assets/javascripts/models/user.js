App.User = Ember.Object.extend({
  active: false,
  administrator: false,
  email: "",
  firstName: "",
  lastName: "",
  username: "",
  pin: "",
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});

App.User.reopenClass({
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