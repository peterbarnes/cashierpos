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
  phone: "",
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});

App.Customer.reopenClass({
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
        imageUrl: customer.imageUrl,
        phone: customer.phone
      });
      fixtures.pushObject(_customer);
    });
    return fixtures;
  }
});

App.Customer.reopen({
  save: function() {
    App.Customer.FIXTURES.pushObject({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      organization: this.organization,
      sku: this.sku,
      notes: this.notes,
      credit: this.credit,
      dateOfBirth: this.dateOfBirth,
      imageUrl: this.imageUrl,
      phone: this.phone
    })
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
    imageUrl: '',
    phone: '333-444-5555'
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
    imageUrl: '',
    phone: '222-333-6666'
  }
];