App.User = DS.Model.extend({
  active: DS.attr('boolean'),
  administrator: DS.attr('boolean'),
  email: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  username: DS.attr('string'),
  pin: DS.attr('string'),
  sales: DS.hasMany('App.Sale'),
  purchases: DS.hasMany('App.Purchase'),
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
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
    pin: '0000',
    sales: [0,1],
    purchases: [0]
  },
  {
    id: 1,
    active: true,
    administrator: false,
    firstName: 'Bob2',
    lastName: 'User2',
    email: 'example2@example.com',
    username: 'example2',
    pin: '1111',
    sales: [],
    purchases: []
  }
];