App.PurchaseLineRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('purchase');
  }
});