App.PurchaseRoute = Ember.Route.extend({
  deactivate: function() {
    if (this.currentModel.get('isDirty') && !this.currentModel.get('isSaving')) {
      this.currentModel.get('transaction').rollback();
      this.get('store').commit();
    }
  }
});