App.PurchaseConfigureRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('purchase');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('item', model.get('configurable'));
    controller.set('components', model.get('configurable.typicalComponents'));
    controller.set('conditions', Ember.A());
    controller.set('variant', null);
  }
});