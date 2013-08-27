App.SaleController = Ember.ObjectController.extend({
  save: function(sale) {
    sale.save();
    this.transitionToRoute('sales');
  },
  complete: function(sale) {
    sale.set('complete', true);
    sale.save();
    this.transitionToRoute('sales');
  },
  editTill: function() {
    this.transitionToRoute('sale.till');
  },
  editUser: function() {
    this.transitionToRoute('sale.user');
  },
  editCustomer: function() {
    this.transitionToRoute('sale.customer');
  },
  addCustomer: function() {
    this.transitionToRoute('sale.addcustomer');
  }
});