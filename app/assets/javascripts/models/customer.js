App.Customer = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  organization: DS.attr('string'),
  sku: DS.attr('string'),
  notes: DS.attr('string'),
  credit: DS.attr('number'),
  dateOfBirth: DS.attr('date'),
  imageUrl: DS.attr('string'),
  sales: DS.hasMany('App.Sale'),
  purchases: DS.hasMany('App.Purchase'),
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});

App.Customer.FIXTURES = [
  {
    id: 0,
    firstName: "Joe",
    lastName: "Customer",
    email: 'example@example.com',
    organization: 'Acme Inc.',
    sku: 'BFC94FA0',
    notes: 'Lorem Ipsum...',
    credit: 10000,
    dateOfBirth: '',
    imageUrl: '',
    purchases: [0],
    sales: [0,1]
  },
  {
    id: 1,
    firstName: "Joe 2",
    lastName: "Customer 2",
    email: 'example2@example.com',
    organization: 'Acme Inc.',
    sku: 'BFC94RE0',
    notes: 'Lorem Ipsum...',
    credit: 7655,
    dateOfBirth: '',
    imageUrl: '',
    purchases: [],
    sales: []
  }
];