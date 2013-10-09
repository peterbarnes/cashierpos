App.PurchasesIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Purchase.query('','active',1,10);
  }
});