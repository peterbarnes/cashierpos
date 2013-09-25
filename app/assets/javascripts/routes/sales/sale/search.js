App.SaleSearchRoute = Ember.Route.extend({
  model: function(params) {
    return {query: params.query, model: this.modelFor('sale')};
  },
  setupController: function(controller, model) {
    controller.set('model', model.model);
    controller.set('query', model.query);
    controller.set('items', App.Item.query(model.query,'all',1,10));
  }
});