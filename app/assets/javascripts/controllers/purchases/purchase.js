App.PurchaseController = Ember.ObjectController.extend({
  actions: {
    save: function(purchase) {
      purchase.save((function() {
        this.transitionToRoute('purchases');
      }).bind(this));
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
  }
});