App.Item = Ember.Object.extend({
  id: null,
  depth: 0,
  description: "",
  dimensionMeasure: "in",
  flagged: false,
  height: 0,
  identifier: "",
  identifierType: "UPC",
  imageUrl: "",
  manufacturer: "",
  name: "",
  price: 0,
  priceCash: 0,
  priceCredit: 0,
  properties: null,
  saleable: false,
  sku: "",
  taxable: true,
  tags: null,
  weight: 0,
  weightMeasure: "lb",
  width: 0,
  components: null,
  conditions: null,
  variants: null,
  init: function() {
    this._super();
    this.set('properties', Ember.A());
    this.set('tags', Ember.A());
    this.set('components', Ember.A());
    this.set('conditions', Ember.A());
    this.set('variants', Ember.A());
  },
  typicalComponents: function() {
    var _components = Ember.A();
    this.get('components').forEach(function(component) {
      if (component.get('typical')) {
        _components.pushObject(component);
      }
    });
    return _components;
  }.property('components')
});

App.Item.reopenClass({
  query: function(query, filter, page, perPage) {
    console.log('query: ' + query);
    console.log('filter: ' + filter);
    console.log('page: ' + page);
    console.log('perPage: ' + perPage);
    
    return this.fixtures();
  },
  count: function(query, filter) {
    return 2;
  },
  find: function(id) {
    return this.fixtures().objectAt(id);
  },
  fixtures: function() {
    var fixtures = [];
    App.Item.FIXTURES.forEach(function(item) {
      var _item = App.Item.create({
        id: item.id,
        depth: item.depth,
        description: item.description,
        dimensionMeasure: item.dimensionMeasure,
        flagged: item.flagged,
        height: item.height,
        identifier: item.identifier,
        identifierType: item.identifierType,
        imageUrl: item.imageUrl,
        manufacturer: item.manufacturer,
        name: item.name,
        price: item.price,
        priceCash: item.priceCash,
        priceCredit: item.priceCredit,
        properties: item.properties,
        saleable: item.saleable,
        sku: item.sku,
        taxable: item.taxable,
        tags: item.tags,
        weight: item.weight,
        weightMeasure: item.weightMeasure,
        width: item.width
      });
      _item.set('components', App.Component.fixtures());
      _item.set('conditions', App.Condition.fixtures());
      _item.set('variants', App.Variant.fixtures());
      fixtures.pushObject(_item);
    });
    return fixtures;
  }
});

App.Item.FIXTURES = [
  {
    id: 0,
    depth: 0,
    description: "Lorem Ipsum...",
    dimensionMeasure: "in",
    flagged: false,
    height: 0,
    identifier: "1234",
    identifierType: "MPN",
    imageUrl: "",
    manufacturer: "Acme",
    name: "Item 1",
    price: 1000,
    priceCash: 700,
    priceCredit: 800,
    properties: [{
      key: "Prop 1",
      value: "Value 1"
    }],
    saleable: true,
    sku: "00123",
    taxable: true,
    tags: [{
      name: "Tag 1"
    }],
    weight: 0,
    weightMeasure: "lb",
    width: 0
  },
  {
    id: 1,
    depth: 0,
    description: "",
    dimensionMeasure: "in",
    flagged: false,
    height: 0,
    identifier: "2345",
    identifierType: "MPN",
    imageUrl: "",
    manufacturer: "Acme",
    name: "Item 2",
    price: 1000,
    priceCash: 750,
    priceCredit: 825,
    properties: [{
      key: "Prop 1",
      value: "Value 1"
    }],
    saleable: false,
    sku: "00234",
    taxable: false,
    tags: [{
      name: "Tag 1"
    }],
    weight: 0,
    weightMeasure: "lb",
    width: 0
  }
];