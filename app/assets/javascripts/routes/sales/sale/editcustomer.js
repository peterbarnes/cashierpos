App.SaleEditcustomerRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sale');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  },
  renderTemplate: function() {
    this.render('sale/editcustomer');
  }
});