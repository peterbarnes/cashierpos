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
      var win = window.open();
      sale.set('complete', true);
      sale.save((function() {
        this.transitionToRoute('sales');
        win.location = window.location.protocol + '//' + window.location.host + '/receipt/sale/' + sale.id + '/?print=true'
      }).bind(this, sale));
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