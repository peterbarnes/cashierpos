App.PurchaseIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('purchase');
  }
});