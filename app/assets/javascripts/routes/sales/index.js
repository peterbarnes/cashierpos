App.SalesIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Sale.query('','all',1,10);
  }
});