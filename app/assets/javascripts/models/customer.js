App.Customer = Ember.Object.extend({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  sku: "",
  notes: "",
  credit: 0,
  dateOfBirth: new Date(),
  imageUrl: "",
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});

App.Customer.reopenClass({
  fixtures: function() {
    var fixtures = [];
    App.Customer.FIXTURES.forEach(function(customer) {
      var _customer = App.Customer.create({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        organization: customer.organization,
        sku: customer.sku,
        notes: customer.notes,
        credit: customer.credit,
        dateOfBirth: customer.dateOfBirth,
        imageUrl: customer.imageUrl
      });
      fixtures.pushObject(_customer);
    });
    return fixtures;
  }
});

App.Customer.reopen({
  save: function() {
    
  }
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
    dateOfBirth: new Date(),
    imageUrl: ''
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
    dateOfBirth: new Date(),
    imageUrl: ''
  }
];