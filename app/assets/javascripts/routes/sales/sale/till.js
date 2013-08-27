App.SaleTillRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sale');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('stores', App.Store.query('','all',1,null));
  }
});