App.SaleController = Ember.ObjectController.extend({
  actions: {
    save: function(sale) {
      sale.save();
      this.transitionToRoute('sales');
    },
    complete: function(sale) {
      sale.set('complete', true);
      sale.save();
      this.transitionToRoute('sales');
    },
    payment: function() {
      this.transitionToRoute('sale.payment');
    },
    selectTill: function() {
      this.transitionToRoute('sale.till');
    },
    selectUser: function() {
      this.transitionToRoute('sale.user');
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