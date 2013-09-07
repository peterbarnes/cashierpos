App.PurchaseIndexController = Ember.ObjectController.extend({
  add: function() {
    this.transitionToRoute('purchase.line');
  },
  search: function() {
    // var query = this.get('query');
    // var units = App.Unit.query(query);
    // var controller = this;
    // this.set('query', null);
    // units.on('didLoad', function() {
//       this.forEach(function(unit) {
//         controller.get('model.lines').pushObject(App.Line.createRecord({
//           title: unit.get('name'),
//           amount: unit.get('price'),
//           quantity: 1,
//           sku: unit.get('sku'),
//           taxable: unit.get('taxable'),
//         }));
//       });
//     });
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