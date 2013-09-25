App.Component = Ember.Object.extend({
  id: null,
  adjustment: 0,
  adjustmentPercentage: false,
  adjustmentCash: 0,
  adjustmentCashPercentage: false,
  adjustmentCredit: 0,
  adjustmentCreditPercentage: false,
  description: "",
  name: "",
  typical: false,
  configured: false,
  adjuster: function(price) {
    if (this.get('adjustmentPercentage')) {
      return parseInt(Math.round(price * this.get('adjustment') * 0.01));
    } else {
      return parseInt(this.get('adjustment') * 100);
    }
  },
  adjusterCash: function(price) {
    if (this.get('adjustmentCashPercentage')) {
      return parseInt(Math.round(price * this.get('adjustmentCash') * 0.01));
    } else {
      return parseInt(this.get('adjustmentCash') * 100);
    }
  },
  adjusterCredit: function(price) {
    if (this.get('adjustmentCreditPercentage')) {
      return parseInt(Math.round(price * this.get('adjustmentCredit') * 0.01));
    } else {
      return parseInt(this.get('adjustmentCredit') * 100);
    }
  }
});

App.Component.reopenClass({
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
    App.Component.FIXTURES.forEach(function(component) {
      var _component = App.Component.create({
        id: component.id,
        adjustment: component.adjustment,
        adjustmentPercentage: component.adjustmentPercentage,
        adjustmentCash: component.adjustmentCash,
        adjustmentCashPercentage: component.adjustmentCashPercentage,
        adjustmentCredit: component.adjustmentCredit,
        adjustmentCreditPercentage: component.adjustmentCreditPercentage,
        description: component.description,
        name: component.name,
        typical: component.typical,
        configured: component.typical
      });
      fixtures.pushObject(_component);
    });
    return fixtures;
  }
});

App.Component.FIXTURES = [
  {
    id: 0,
    adjustment: 1.23,
    adjustmentPercentage: true,
    adjustmentCash: -0.84,
    adjustmentCashPercentage: false,
    adjustmentCredit: 1.22,
    adjustmentCreditPercentage: true,
    description: "Lorem Ipsum...",
    name: "Component 1",
    typical: true
  },
  {
    id: 0,
    adjustment: 2.34,
    adjustmentPercentage: false,
    adjustmentCash: 0.33,
    adjustmentCashPercentage: true,
    adjustmentCredit: 2.33,
    adjustmentCreditPercentage: false,
    description: "Lorem Ipsum...",
    name: "Component 1",
    typical: false
  }
];