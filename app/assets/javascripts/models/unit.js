App.Unit = Ember.Object.extend({
  id: null,
  calculated: false,
  filing: 0,
  quantity: 0,
  name: "",
  sku: "",
  price: 0,
  taxable: true,
  item: null,
  components: null,
  conditions: null,
  variant: null,
  init: function() {
    this._super();
    this.set('components', Ember.A());
    this.set('conditions', Ember.A());
  },
  priceCalculated: function() {
    var unit = this;
    var item = this.get('item');
    if (item) {
      var calculated_price = item.get('price');
      item.get('components').forEach(function(component) {
        if (component.get('typical') && unit.get('components').indexOf(component) == -1) {
          calculated_price = calculated_price - component.adjuster(item.get('price'));
        }
        if (!component.get('typical') && unit.get('components').indexOf(component) >= 0) {
          calculated_price = calculated_price + component.adjuster(item.get('price'));
        }
      });
      item.get('conditions').forEach(function(condition) {
        calculated_price = calculated_price + condition.adjuster(item.get('price'));
      });
      var variant = this.get('variant');
      if (variant) {
        calculated_price = calculated_price + variant.adjuster(item.get('price'));
      }
      return calculated_price;
    } else {
      return 0;
    }
  }.property('item', 'components.@each', 'conditions.@each', 'variant')
});

App.Unit.reopenClass({
  query: function(query, filter, page, perPage) {
    console.log('query: ' + query);
    console.log('filter: ' + filter);
    console.log('page: ' + page);
    console.log('perPage: ' + perPage);
    
    return this.fixtures();
  },
  match: function(query) {
    return [this.fixtures().objectAt(0)];
  },
  count: function(query, filter) {
    return 2;
  },
  find: function(id) {
    return this.fixtures().objectAt(id);
  },
  fixtures: function() {
    var fixtures = [];
    App.Unit.FIXTURES.forEach(function(unit) {
      var _unit = App.Unit.create({
        id: unit.id,
        calculated: unit.calculated,
        filing: unit.filing,
        quantity: unit.quantity,
        name: unit.name,
        sku: unit.sku,
        price: unit.price,
        taxable: unit.taxable,
      });
      _unit.set('item', App.Item.fixtures().objectAt(0));
      _unit.set('components', App.Component.fixtures());
      _unit.set('conditions', App.Condition.fixtures());
      _unit.set('variant', App.Variant.fixtures().objectAt(0));
      fixtures.pushObject(_unit);
    });
    return fixtures;
  }
});

App.Unit.FIXTURES = [
  {
    id: 0,
    calculated: true,
    filing: 0,
    quantity: 2,
    name: "Unit 1",
    sku: "1234",
    price: 1234,
    taxable: true
  },
  {
    id: 1,
    calculated: false,
    filing: 1,
    quantity: 1,
    name: "Unit 2",
    sku: "2345",
    price: 2345,
    taxable: true
  }
];