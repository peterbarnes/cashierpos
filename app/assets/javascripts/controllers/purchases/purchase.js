App.PurchaseController = Ember.ObjectController.extend({
  actions: {
    save: function(purchase) {
      purchase.set('user', null);
      purchase.set('till', null);
      purchase.save((function() {
        this.transitionToRoute('purchases');
      }).bind(this));
    },
    complete: function(purchase) {
      purchase.set('complete', true);
      purchase.save((function() {
        this.transitionToRoute('purchases');
      }).bind(this));
    },
    selectUser: function() {
      this.transitionToRoute('purchase.user');
    },
    clearUser: function(purchase) {
      purchase.set('user', null);
      purchase.set('till', null);
      $.removeCookie('cashierpos.user');
      $.removeCookie('cashierpos.till');
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