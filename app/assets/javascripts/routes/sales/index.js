App.SalesIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Sale.query('','active',1,10);
  }
});