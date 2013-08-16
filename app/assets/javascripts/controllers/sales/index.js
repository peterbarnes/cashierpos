App.SalesIndexController = Ember.ArrayController.extend({
  delete: function(sale) {
    sale.deleteRecord();
    this.get('store').commit();
  },
  receipt: function(sale) {
    console.log(sale);
  },
  load: function(sale) {
    this.transitionToRoute('sale', sale);
  }
});