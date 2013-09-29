App.SaleIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sale');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    $(document).on('keypress', controller.keypress.bind(controller));
  },
  deactivate: function() {
    $(document).off('keypress');
  }
});