App.SaleCustomerRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sale');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('customers', App.Customer.query('','all',1,10));
  }
});