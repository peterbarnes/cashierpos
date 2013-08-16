App.PurchasesNewRoute = Ember.Route.extend({
  model: function() {
    return App.Purchase.createRecord({
      sku: Math.uuid(),
      complete: false,
      taxRate: 0,
      pdfUrl: '',
      cash: 0,
      storeCredit: 0
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('purchase').set('model', model);
  },
  renderTemplate: function() {
    this.render('purchase', { controller:'purchase' });
  },
  deactivate: function() {
    if (this.currentModel.get('isNew') && !this.currentModel.get('isSaving')) {
      this.currentModel.deleteRecord();
      this.get('store').commit();
    }
  }
});