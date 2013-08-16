App.PurchaseRoute = Ember.Route.extend({
  deactivate: function() {
    var model = this.currentModel;
    if (model.get('isDirty') && !model.get('isSaving')) {
      model.get('transaction').rollback();
    }
  }
});