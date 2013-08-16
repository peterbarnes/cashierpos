App.SaleController = Ember.ObjectController.extend({
  add: function() {
    var query = this.get('query');
    var units = App.Unit.find({sku: query});
    var controller = this;
    this.set('query', null);
    units.on('didLoad', function() {
      this.forEach(function(unit) {
        controller.get('model.lines').pushObject(App.Line.createRecord({
          title: unit.get('name'),
          amount: unit.get('price'),
          quantity: 1,
          sku: unit.get('sku'),
          taxable: unit.get('taxable'),
        }));
      });
    });
  },
  search: function() {
    console.log(this.get('query'));
    this.set('query', null);
  },
  remove: function(line) {
    line.deleteRecord();
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
  save: function(sale) {
    sale.save();
    this.transitionToRoute('sales');
  },
  complete: function(sale) {
    sale.set('complete', true);
    sale.save();
    this.transitionToRoute('sales');
  },
  editTill: function() {
    this.send('open', 'till');
  },
  editUser: function() {
    this.send('open', 'user');
  },
  editCustomer: function() {
    this.send('open', 'customer');
  }
});