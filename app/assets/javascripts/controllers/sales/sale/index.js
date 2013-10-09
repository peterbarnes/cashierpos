App.SaleIndexController = Ember.ObjectController.extend({
  scanning: false,
  actions: {
    add: function() {
      this.transitionToRoute('sale.line');
    },
    search: function() {
      if (this.get('scanning')) {
        var query = this.get('query');
        var units = App.Unit.match(query);
        var controller = this;
        units.forEach(function(unit) {
          controller.get('model.lines').pushObject(App.Line.create({
            title: unit.get('name'),
            amount: unit.get('calculated') ? unit.get('priceCalculated') : unit.get('price'),
            quantity: 1,
            sku: unit.get('sku'),
            taxable: unit.get('taxable'),
          }));
        });
      } else {
        this.transitionToRoute('sale.search', this.get('query'));
      }
      this.set('scanning', false);
      this.set('query', null);
    },
    scan: function() {
      this.set('scanning', !this.get('scanning'));
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
  },
  keypress: function(event) {
    if (event.charCode == 223) {
      this.set('scanning', true);
      $('form.item_search input[type=text]').focus();
      event.preventDefault();
    }
  }
});