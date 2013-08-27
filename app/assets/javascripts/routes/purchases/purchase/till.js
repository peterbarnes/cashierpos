App.PurchaseTillRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('purchase');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('stores', App.Store.query('','all',1,null));
  }
});