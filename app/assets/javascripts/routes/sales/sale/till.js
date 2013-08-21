App.SaleTillRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('sale');
  }
});