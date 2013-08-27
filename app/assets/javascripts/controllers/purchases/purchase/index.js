App.PurchaseIndexController = Ember.ObjectController.extend({
  add: function() {
    
  },
  search: function() {
    console.log(this.get('query'));
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
  },
  save: function(purchase) {
    purchase.save();
    this.transitionToRoute('purchases');
  },
  complete: function(purchase) {
    purchase.set('complete', true);
    purchase.save();
    this.transitionToRoute('purchases');
  }
});