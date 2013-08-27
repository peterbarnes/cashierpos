App.PurchaseController = Ember.ObjectController.extend({
  save: function(purchase) {
    purchase.save();
    this.transitionToRoute('purchases');
  },
  complete: function(purchase) {
    purchase.set('complete', true);
    purchase.save();
    this.transitionToRoute('purchases');
  },
  editTill: function() {
    this.transitionToRoute('purchase.till');
  },
  editUser: function() {
    this.transitionToRoute('purchase.user');
  },
  editCustomer: function() {
    this.transitionToRoute('purchase.customer');
  },
  addCustomer: function() {
    this.transitionToRoute('purchase.addcustomer');
  }
});