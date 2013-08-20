App.PurchasesIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Purchase.query('','all',1,10);
  }
});