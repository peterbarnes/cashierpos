App.PurchaseEditcustomerRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('purchase');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  },
  renderTemplate: function() {
    this.render('purchase/editcustomer');
  }
});