App.PurchasesIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Purchase.find();
  }
});