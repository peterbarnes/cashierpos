App.PurchaseTillRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('purchase');
  }
});