App.SaleIndexRoute = Ember.Route.extend({
  model: function(params) {
    return App.Sale.find(params.sale_id);
  }
});