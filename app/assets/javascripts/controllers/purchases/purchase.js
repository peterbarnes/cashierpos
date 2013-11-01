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
      var win = window.open();
      purchase.set('complete', true);
      purchase.save((function() {
        this.transitionToRoute('purchases');
        win.location = window.location.protocol + '//' + window.location.host + '/receipt/purchase/' + purchase.id + '/?print=true'
      }).bind(this, purchase));
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