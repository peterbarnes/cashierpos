App.PurchaseLineController = Ember.ObjectController.extend({
  needs: 'purchase',
  save: function() {
    var line = App.Line.createRecord({
      // name: this.get('tname'),
      // note: this.get('controllers.sale.model')
    });
    this.transitionToRoute('purchase');
  },
  cancel: function() {
    this.transitionToRoute('purchase');
  }
});