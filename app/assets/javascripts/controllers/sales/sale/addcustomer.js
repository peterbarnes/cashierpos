App.SaleAddcustomerController = Ember.ObjectController.extend({
  needs: 'sale',
  actions: {
    add: function() {
      var customer = this.get('newcustomer');
      customer.save();
      this.set('model.customer', customer);
      this.transitionToRoute('sale');
    },
    cancel: function() {
      this.transitionToRoute('sale');
    }
  }
});