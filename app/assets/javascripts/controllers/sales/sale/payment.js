App.SalePaymentController = Ember.ObjectController.extend({
  needs: 'sale',
  back: function() {
    this.transitionToRoute('sale');
  }
});