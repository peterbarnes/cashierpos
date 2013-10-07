App.Unit = Ember.Object.extend({
  id: null,
  calculated: false,
  filing: 0,
  quantity: 0,
  name: "",
  sku: "",
  price: 0,
  taxable: true,
  createdAt: new Date(),
  updatedAt: new Date(),
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
  query: function(query, filter, page, perPage, callback) {
    var units = [];
    $.ajax({
      url: '/api/units',
      data: {
        query: query,
        filter: filter,
        limit: perPage,
        offset: (page - 1) * perPage
      }
    }).then(function(response) {
      response.forEach(function(object){
        var unit = object.unit;
        var model = App.Unit.create({
          id: unit.id,
          calculated: unit.calculated,
          filing: unit.filing,
          quantity: unit.quantity,
          name: unit.name,
          sku: unit.sku,
          price: unit.price,
          taxable: unit.taxable,
          createdAt: new Date(unit.created_at),
          updatedAt: new Date(unit.updated_at)
        });
        model.set('item', App.Item.find(unit.item_id));
        var components = [];
        unit.components.forEach(function(_component){
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
        model.set('components', components);
        var conditions = [];
        unit.conditions.forEach(function(_condition){
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
        model.set('conditions', conditions);
        model.set('variant', App.Variant.create({
          id: unit.variant.id,
          adjustment: unit.variant.adjustment,
          adjustmentPercentage: unit.variant.adjustment_percentage,
          adjustmentCash: unit.variant.adjustment_cash,
          adjustmentCashPercentage: unit.variant.adjustment_cash_percentage,
          adjustmentCredit: unit.variant.adjustment_credit,
          adjustmentCreditPercentage: unit.variant.adjustment_credit_percentage,
          description: unit.variant.description,
          identifier: unit.variant.identifier,
          identifierType: unit.variant.identifier_type,
          name: unit.variant.name
        }));
        units.addObject(model);
      });
      if (callback) {
        callback();
      }
    });
    return units;
  },
  match: function(query) {
    var units = [];
    $.ajax({
      url: '/api/units/match',
      data: {
        query: query
      },
      async: false,
      success: function(response) {
        response.forEach(function(object){
          var unit = object.unit;
          var model = App.Unit.create({
            id: unit.id,
            calculated: unit.calculated,
            filing: unit.filing,
            quantity: unit.quantity,
            name: unit.name,
            sku: unit.sku,
            price: unit.price,
            taxable: unit.taxable,
            createdAt: new Date(unit.created_at),
            updatedAt: new Date(unit.updated_at)
          });
          model.set('item', App.Item.find(unit.item_id));
          var components = [];
          unit.components.forEach(function(_component){
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
          model.set('components', components);
          var conditions = [];
          unit.conditions.forEach(function(_condition){
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
          model.set('conditions', conditions);
          model.set('variant', App.Variant.create({
            id: unit.variant.id,
            adjustment: unit.variant.adjustment,
            adjustmentPercentage: unit.variant.adjustment_percentage,
            adjustmentCash: unit.variant.adjustment_cash,
            adjustmentCashPercentage: unit.variant.adjustment_cash_percentage,
            adjustmentCredit: unit.variant.adjustment_credit,
            adjustmentCreditPercentage: unit.variant.adjustment_credit_percentage,
            description: unit.variant.description,
            identifier: unit.variant.identifier,
            identifierType: unit.variant.identifier_type,
            name: unit.variant.name
          }));
          units.addObject(model);
        });
      }
    });
    return units;
  },
  count: function(query, filter) {
    var count = 0;
    $.ajax({
      url: '/api/units/count',
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
  find: function(id) {
    if (id) {
      var _unit = App.Unit.create();
      $.ajax({
        url: "/api/units/" + id
      }).then(function(response) {
        var unit = response.unit;
        _unit.setProperties({
          id: unit.id,
          calculated: unit.calculated,
          filing: unit.filing,
          quantity: unit.quantity,
          name: unit.name,
          sku: unit.sku,
          price: unit.price,
          taxable: unit.taxable,
          createdAt: new Date(unit.created_at),
          updatedAt: new Date(unit.updated_at)
        });
        var components = [];
        unit.components.forEach(function(_component){
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
        _unit.set('components', components);
        var conditions = [];
        unit.conditions.forEach(function(_condition){
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
        _unit.set('conditions', conditions);
        _unit.set('variant', App.Variant.create({
          id: unit.variant.id,
          adjustment: unit.variant.adjustment,
          adjustmentPercentage: unit.variant.adjustment_percentage,
          adjustmentCash: unit.variant.adjustment_cash,
          adjustmentCashPercentage: unit.variant.adjustment_cash_percentage,
          adjustmentCredit: unit.variant.adjustment_credit,
          adjustmentCreditPercentage: unit.variant.adjustment_credit_percentage,
          description: unit.variant.description,
          identifier: unit.variant.identifier,
          identifierType: unit.variant.identifier_type,
          name: unit.variant.name
        }));
      });
      return _unit;
    }
    return null;
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