App.PurchaseRoute = Ember.Route.extend({
  model: function(params) {
    return App.Purchase.find(params.purchase_id);
  }
});