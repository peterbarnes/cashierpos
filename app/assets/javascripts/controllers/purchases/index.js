App.PurchasesIndexController = Ember.ArrayController.extend({
  delete: function(purchase) {
    purchase.deleteRecord();
    this.get('store').commit();
  },
  receipt: function(purchase) {
    console.log(purchase);
  }
});