App.PurchaseAddcustomerRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('purchase');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('newcustomer', App.Customer.create());
  }
});