App.PurchaseIndexController = Ember.ObjectController.extend({
  actions: {
    add: function() {
      this.transitionToRoute('purchase.line');
    },
    search: function() {
      this.transitionToRoute('purchase.search', this.get('query'));
      this.set('query', null);
    },
    remove: function(line) {
      line.set('remove', true);
    },
    quantityPlus: function(line) {
      line.set('quantity', parseInt(line.get('quantity')) + 1);
    },
    quantityMinus: function(line) {
      var quantity = parseInt(line.get('quantity'));
      if (quantity > 0) {
        quantity = quantity - 1;
      }
      line.set('quantity', quantity);
    }
  }
});