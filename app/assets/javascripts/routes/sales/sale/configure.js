App.SaleConfigureRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('sale');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('item', model.get('configurable'));
    controller.set('components', model.get('configurable.typicalComponents'));
  }
});