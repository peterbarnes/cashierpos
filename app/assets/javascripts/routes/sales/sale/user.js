App.SaleUserRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sale');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('users', App.User.query('','assigned',1,10));
  }
});