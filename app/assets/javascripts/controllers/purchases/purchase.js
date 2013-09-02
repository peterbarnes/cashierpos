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
  selectTill: function() {
    this.transitionToRoute('purchase.till');
  },
  selectUser: function() {
    this.transitionToRoute('purchase.user');
  },
  selectCustomer: function() {
    this.transitionToRoute('purchase.customer');
  },
  editCustomer: function() {
    this.transitionToRoute('purchase.editcustomer');
  },
  addCustomer: function() {
    this.transitionToRoute('purchase.addcustomer');
  }
});