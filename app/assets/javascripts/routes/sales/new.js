App.SalesNewRoute = Ember.Route.extend({
  model: function() {
    return App.Sale.createRecord({
      sku: Math.uuid(),
      complete: false,
      taxRate: 0,
      payment: App.Payment.createRecord({
        storeCredit: 0,
        cash: 0,
        credit: 0,
        check: 0,
        giftCard: 0
      })
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('sale').set('model', model);
  },
  renderTemplate: function() {
    this.render('sale', { controller:'sale' });
  },
  deactivate: function() {
    if (this.currentModel.get('isNew') && !this.currentModel.get('isSaving')) {
      this.currentModel.deleteRecord();
      this.get('store').commit();
    }
  }
});