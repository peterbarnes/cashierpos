App.SaleLineController = Ember.ObjectController.extend({
  needs: 'sale',
  save: function() {
    var line = App.Line.createRecord({
      // name: this.get('tname'),
      // note: this.get('controllers.sale.model')
    });
    this.transitionToRoute('sale');
  },
  cancel: function() {
    this.transitionToRoute('sale');
  }
});