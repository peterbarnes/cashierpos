App.SaleLineController = Ember.ObjectController.extend({
  needs: 'sale',
  add: function() {
    this.get('model.lines').pushObject(this.get('line'));
    this.transitionToRoute('sale');
  },
  cancel: function() {
    this.transitionToRoute('sale');
  }
});