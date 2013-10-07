App.SalePaymentController = Ember.ObjectController.extend({
  needs: 'sale',
  actions: {
    back: function() {
      this.transitionToRoute('sale');
    },
    amountDue: function(field) {
      this.get('payment').set(field, this.get('due'));
    },
    clear: function(field) {
      this.get('payment').set(field, 0);
    },
    increment: function(amount) {
      var payment = this.get('payment');
      payment.set('cash', payment.get('cash') + parseInt(amount));
    },
    applyCustomerCredit: function() {
      var subtotal = this.get('subtotal');
      var credit = this.get('customer.credit');
      var payment = this.get('payment');
      if (credit > subtotal) {
        payment.set('storeCredit', parseInt(subtotal));
      } else {
        payment.set('storeCredit', parseInt(credit));
      }
    }
  },
  noCustomer: function() {
    if(this.get('customer')) {
      return false;
    }
    return true;
  }.property('customer'),
  validateStoreCredit: function() {
    if (this.get('customer')) {
      var payment = this.get('payment');
      var storeCredit = payment.get('storeCredit');
      var subtotal = this.get('subtotal');
      var credit = this.get('customer.credit');
      if (storeCredit > credit) {
        payment.set('storeCredit', credit);
      }
      if (storeCredit > subtotal) {
        payment.set('storeCredit', subtotal);
      }
    }
  }.observes('payment.storeCredit')
});