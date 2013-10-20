App.SaleController = Ember.ObjectController.extend({
  actions: {
    save: function(sale) {
      sale.set('user', null);
      sale.set('till', null);
      sale.save((function() {
        this.transitionToRoute('sales');
      }).bind(this));
    },
    complete: function(sale) {
      sale.set('complete', true);
      sale.save((function() {
        this.transitionToRoute('sales');
      }).bind(this));
    },
    payment: function() {
      this.transitionToRoute('sale.payment');
    },
    selectUser: function() {
      this.transitionToRoute('sale.user');
    },
    clearUser: function(sale) {
      sale.set('user', null);
      sale.set('till', null);
      $.removeCookie('cashierpos.user');
      $.removeCookie('cashierpos.till');
    },
    selectCustomer: function() {
      this.transitionToRoute('sale.customer');
    },
    editCustomer: function() {
      this.transitionToRoute('sale.editcustomer');
    },
    addCustomer: function() {
      this.transitionToRoute('sale.addcustomer');
    }
  }
});