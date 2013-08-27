App.PurchaseCustomerRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('purchase');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('customers', App.Customer.query('','all',1,10));
  }
});