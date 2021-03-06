App.Customer = Ember.Object.extend({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  identifier: "",
  identifierType: "",
  organization: "",
  sku: "",
  notes: "",
  credit: 0,
  dateOfBirth: new Date(),
  imageUrl: "",
  phone: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName'),
  creditFmt: function(key, value) {
    if (value) {
      this.set('credit', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('credit') * 0.01).toFixed(2);
    }
  }.property('credit')
});

App.Customer.reopenClass({
  query: function(query, filter, page, perPage, callback) {
    var customers = [];
    $.ajax({
      url: '/api/customers',
      data: {
        query: query,
        filter: filter,
        limit: perPage,
        offset: (page - 1) * perPage
      }
    }).then(function(response) {
      response.forEach(function(object){
        var customer = object.customer;
        var model = App.Customer.create({
          id: customer.id,
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          organization: customer.organization,
          sku: customer.sku,
          notes: customer.notes,
          credit: customer.credit,
          dateOfBirth: new Date(customer.date_of_birth),
          imageUrl: customer.image_url,
          phone: customer.phone,
          createdAt: new Date(customer.created_at),
          updatedAt: new Date(customer.updated_at)
        });
        customers.addObject(model);
      });
      if (callback) {
        callback();
      }
    });
    return customers;
  },
  count: function(query, filter) {
    var count = 0;
    $.ajax({
      url: '/api/customers/count',
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
      var _customer = App.Customer.create();
      $.ajax({
        url: "/api/customers/" + id
      }).then(function(response) {
        var customer = response.customer;
        _customer.setProperties({
          id: customer.id,
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          organization: customer.organization,
          sku: customer.sku,
          notes: customer.notes,
          credit: customer.credit,
          dateOfBirth: new Date(customer.date_of_birth),
          imageUrl: customer.image_url,
          phone: customer.phone,
          createdAt: new Date(customer.created_at),
          updatedAt: new Date(customer.updated_at)
        });
      });
      return _customer;
    }
    return null;
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
    var data = {
      customer: {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        identifier: this.identifier,
        identifier_type: this.identifierType,
        organization: this.organization,
        notes: this.notes,
        date_of_birth: this.dateOfBirth.toISOString(),
        phone: this.phone
      }
    }
    if (this.id) {
      $.ajax({
        url: '/api/customers/' + this.id,
        data: JSON.stringify(data),
        type: 'PUT',
        contentType: 'application/json',
        success: (function(result) {
          var customer = result.customer;
          this.setProperties({
            id: customer.id,
            firstName: customer.first_name,
            lastName: customer.last_name,
            email: customer.email,
            identifier: customer.identifier,
            identifierType: customer.identifier_type,
            organization: customer.organization,
            sku: customer.sku,
            notes: customer.notes,
            credit: customer.credit,
            dateOfBirth: new Date(customer.date_of_birth),
            imageUrl: customer.image_url,
            phone: customer.phone,
            createdAt: new Date(customer.created_at),
            updatedAt: new Date(customer.updated_at)
          });
        }).bind(this)
      });
    } else {
      $.ajax({
        url: '/api/customers',
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json',
        success: (function(result) {
          var customer = result.customer;
          this.setProperties({
            id: customer.id,
            firstName: customer.first_name,
            lastName: customer.last_name,
            email: customer.email,
            identifier: customer.identifier,
            identifierType: customer.identifier_type,
            organization: customer.organization,
            sku: customer.sku,
            notes: customer.notes,
            credit: customer.credit,
            dateOfBirth: new Date(customer.date_of_birth),
            imageUrl: customer.image_url,
            phone: customer.phone,
            createdAt: new Date(customer.created_at),
            updatedAt: new Date(customer.updated_at)
          });
        }).bind(this)
      });
    }
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