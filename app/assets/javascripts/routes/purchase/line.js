App.PurchaseLineRoute = Ember.Route.extend({
  model: function() {
    return Ember.Object.create();
  },
  renderTemplate: function() {
    this.render('line', { into: 'purchase', outlet: 'line' });
  }
});