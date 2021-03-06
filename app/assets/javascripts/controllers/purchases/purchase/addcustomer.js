App.PurchaseAddcustomerController = Ember.ObjectController.extend({
  needs: 'purchase',
  actions: {
    add: function() {
      var customer = this.get('newcustomer');
      customer.save();
      this.set('model.customer', customer);
      this.transitionToRoute('purchase');
    },
    cancel: function() {
      this.transitionToRoute('purchase');
    }
  }
});