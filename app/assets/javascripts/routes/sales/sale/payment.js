App.SalePaymentRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sale');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('payment', model.get('payment'));
  }
});