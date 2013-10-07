App.PurchaseEditcustomerController = Ember.ObjectController.extend({
  needs: 'purchase',
  actions: {
    save: function() {
      var customer = this.get('customer');
      customer.save();
      this.transitionToRoute('purchase');
    },
    cancel: function() {
      this.transitionToRoute('purchase');
    }
  }
});