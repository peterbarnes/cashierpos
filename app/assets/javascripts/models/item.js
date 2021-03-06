App.Item = Ember.Object.extend({
  id: null,
  description: "",
  identifier: "",
  identifierType: "UPC",
  imageUrl: "",
  manufacturer: "",
  name: "",
  price: 0,
  priceCash: 0,
  priceCredit: 0,
  saleable: false,
  sku: "",
  taxable: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  components: null,
  conditions: null,
  variants: null,
  init: function() {
    this._super();
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
  query: function(query, filter, page, perPage, callback) {
    var items = [];
    $.ajax({
      url: '/api/items',
      data: {
        query: query,
        filter: filter,
        limit: perPage,
        offset: (page - 1) * perPage
      }
    }).then(function(response) {
      response.forEach(function(object){
        var item = object.item;
        var model = App.Item.create({
          id: item.id,
          description: item.description,
          identifier: item.identifier,
          identifierType: item.identifier_type,
          imageUrl: item.image_url,
          manufacturer: item.manufacturer,
          name: item.name,
          price: item.price,
          priceCash: item.price_cash,
          priceCredit: item.price_credit,
          saleable: item.saleable,
          sku: item.sku,
          taxable: item.taxable,
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at)
        });
        items.addObject(model);
      });
      if (callback) {
        callback();
      }
    });
    return items;
  },
  count: function(query, filter) {
    var count = 0;
    $.ajax({
      url: '/api/items/count',
      data: {
        query: query,
        filter: filter
      },
      success: function(result) {
        count = result.count;
      },
      async: false
    });
    return count;
  },
  find: function(id, callback) {
    if (id) {
      var _item = App.Item.create();
      $.ajax({
        url: "/api/items/" + id
      }).then(function(response) {
        var item = response.item;
        _item.setProperties({
          id: item.id,
          description: item.description,
          identifier: item.identifier,
          identifierType: item.identifier_type,
          imageUrl: item.image_url,
          manufacturer: item.manufacturer,
          name: item.name,
          price: item.price,
          priceCash: item.price_cash,
          priceCredit: item.price_credit,
          saleable: item.saleable,
          sku: item.sku,
          taxable: item.taxable,
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at)
        });
        var components = [];
        item.components.forEach(function(_component){
          var component = App.Component.create({
            id: _component.id,
            adjustment: _component.adjustment,
            adjustmentPercentage: _component.adjustment_percentage,
            adjustmentCash: _component.adjustment_cash,
            adjustmentCashPercentage: _component.adjustment_cash_percentage,
            adjustmentCredit: _component.adjustment_credit,
            adjustmentCreditPercentage: _component.adjustment_credit_percentage,
            description: _component.description,
            name: _component.name,
            typical: _component.typical,
            configured: _component.typical
          });
          components.addObject(component);
        });
        _item.set('components', components);
        var conditions = [];
        item.conditions.forEach(function(_condition){
          var condition = App.Condition.create({
            id: _condition.id,
            adjustment: _condition.adjustment,
            adjustmentPercentage: _condition.adjustment_percentage,
            adjustmentCash: _condition.adjustment_cash,
            adjustmentCashPercentage: _condition.adjustment_cash_percentage,
            adjustmentCredit: _condition.adjustment_credit,
            adjustmentCreditPercentage: _condition.adjustment_credit_percentage,
            description: _condition.description,
            name: _condition.name
          });
          conditions.addObject(condition);
        });
        _item.set('conditions', conditions);
        var variants = [];
        item.variants.forEach(function(_variant){
          var variant = App.Variant.create({
            id: _variant.id,
            adjustment: _variant.adjustment,
            adjustmentPercentage: _variant.adjustment_percentage,
            adjustmentCash: _variant.adjustment_cash,
            adjustmentCashPercentage: _variant.adjustment_cash_percentage,
            adjustmentCredit: _variant.adjustment_credit,
            adjustmentCreditPercentage: _variant.adjustment_credit_percentage,
            description: _variant.description,
            identifier: _variant.identifier,
            identifierType: _variant.identifier_type,
            name: _variant.name
          });
          variants.addObject(variant);
        });
        _item.set('variants', variants);
        if (callback) {
          callback();
        }
      });
      return _item;
    }
    return null;
  },
  fixtures: function() {
    var fixtures = [];
    App.Item.FIXTURES.forEach(function(item) {
      var _item = App.Item.create({
        id: item.id,
        description: item.description,
        identifier: item.identifier,
        identifierType: item.identifierType,
        imageUrl: item.imageUrl,
        manufacturer: item.manufacturer,
        name: item.name,
        price: item.price,
        priceCash: item.priceCash,
        priceCredit: item.priceCredit,
        saleable: item.saleable,
        sku: item.sku,
        taxable: item.taxable
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
    saleable: true,
    sku: "00123",
    taxable: true,
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
    saleable: false,
    sku: "00234",
    taxable: false,
    weight: 0,
    weightMeasure: "lb",
    width: 0
  }
];