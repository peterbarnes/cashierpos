App.PurchaseTillController = Ember.ObjectController.extend({
  needs: 'purchase',
  back: function() {
    this.transitionToRoute('purchase');
  },
  select: function(till) {
    this.set('model.till', till);
    this.transitionToRoute('purchase');
  }
});