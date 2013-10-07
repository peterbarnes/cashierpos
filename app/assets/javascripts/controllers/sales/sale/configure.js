App.SaleConfigureController = Ember.ObjectController.extend({
  needs: 'sale',
  item: null,
  components: null,
  conditions: null,
  variant: null,
  actions: {
    add: function() {
      this.get('model.lines').pushObject(App.Line.create({
        title: this.get('item.name'),
        amount: this.get('configuredPrice'),
        quantity: 1,
        sku: this.get('item.sku'),
        taxable: this.get('item.taxable'),
      }));
      this.transitionToRoute('sale');
    },
    cancel: function() {
      this.transitionToRoute('sale');
    },
    selectComponent: function(component) {
      if (this.get('components').contains(component)) {
        this.get('components').removeObject(component);
      } else {
        this.get('components').pushObject(component);
      }
      component.set('configured', !component.get('configured'));
    },
    selectCondition: function(condition) {
      if (this.get('conditions').contains(condition)) {
        this.get('conditions').removeObject(condition);
      } else {
        this.get('conditions').pushObject(condition);
      }
      condition.set('configured', !condition.get('configured'));
    },
    selectVariant: function(variant) {
      this.get('item.variants').forEach(function(variant) {
        variant.set('configured', false);
      });
      if (this.get('variant') != variant) {
        variant.set('configured', !variant.get('configured'));
        this.set('variant', variant);
      } else {
        this.set('variant', null);
      }
    }
  },
  configuredPrice: function() {
    var controller = this;
    var item = this.get('item');
    if (item) {
      var item_price = item.get('price');
      var calculated_price = item_price;
      item.get('components').forEach(function(component) {
        if (component.get('typical') && !controller.get('components').contains(component)) {
          calculated_price = calculated_price - component.adjuster(item_price);
        }
        if (!component.get('typical') && controller.get('components').contains(component)) {
          calculated_price = calculated_price + component.adjuster(item_price);
        }
      });
      this.get('conditions').forEach(function(condition) {
        calculated_price = calculated_price + condition.adjuster(item_price);
      });
      var variant = this.get('variant');
      if (variant) {
        calculated_price = calculated_price + variant.adjuster(item_price);
      }
      return calculated_price;
    } else {
      return 0;
    }
  }.property('item', 'components.@each', 'conditions.@each', 'variant')
});