App.SaleLineRoute = Ember.Route.extend({
  model: function() {
    return Ember.Object.create();
  },
  renderTemplate: function() {
    this.render('line', { into: 'sale', outlet: 'line' });
  }
});