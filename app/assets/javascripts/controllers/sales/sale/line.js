App.SaleLineController = Ember.ObjectController.extend({
  needs: 'sale',
  actions: {
    add: function() {
      this.get('model.lines').pushObject(this.get('line'));
      this.transitionToRoute('sale');
    },
    cancel: function() {
      this.transitionToRoute('sale');
    }
  }
});