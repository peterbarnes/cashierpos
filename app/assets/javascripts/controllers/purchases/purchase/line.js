App.PurchaseLineController = Ember.ObjectController.extend({
  needs: 'purchase',
  add: function() {
    this.get('model.lines').pushObject(this.get('line'));
    this.transitionToRoute('purchase');
  },
  cancel: function() {
    this.transitionToRoute('purchase');
  }
});