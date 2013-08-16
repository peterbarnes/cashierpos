App.SalesIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Sale.find();
  }
});