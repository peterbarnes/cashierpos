App.SaleAddcustomerRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sale');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('newcustomer', App.Customer.create());
  }
});