App.SaleEditcustomerController = Ember.ObjectController.extend({
  needs: 'sale',
  save: function() {
    var customer = this.get('customer');
    customer.save();
    this.transitionToRoute('sale');
  },
  cancel: function() {
    this.transitionToRoute('sale');
  }
});