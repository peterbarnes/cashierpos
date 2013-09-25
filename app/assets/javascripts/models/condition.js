App.Condition = Ember.Object.extend({
  id: null,
  adjustment: 0,
  adjustmentPercentage: false,
  adjustmentCash: 0,
  adjustmentCashPercentage: false,
  adjustmentCredit: 0,
  adjustmentCreditPercentage: false,
  description: "",
  name: "",
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

App.Condition.reopenClass({
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
    App.Condition.FIXTURES.forEach(function(condition) {
      var _condition = App.Condition.create({
        id: condition.id,
        adjustment: condition.adjustment,
        adjustmentPercentage: condition.adjustmentPercentage,
        adjustmentCash: condition.adjustmentCash,
        adjustmentCashPercentage: condition.adjustmentCashPercentage,
        adjustmentCredit: condition.adjustmentCredit,
        adjustmentCreditPercentage: condition.adjustmentCreditPercentage,
        description: condition.description,
        name: condition.name
      });
      fixtures.pushObject(_condition);
    });
    return fixtures;
  }
});

App.Condition.FIXTURES = [
  {
    id: 0,
    adjustment: 1.44,
    adjustmentPercentage: true,
    adjustmentCash: 2.33,
    adjustmentCashPercentage: false,
    adjustmentCredit: -4.44,
    adjustmentCreditPercentage: true,
    description: "Lorem Ipsum...",
    name: "Condition 1"
  },
  {
    id: 0,
    adjustment: 3.44,
    adjustmentPercentage: false,
    adjustmentCash: 1.22,
    adjustmentCashPercentage: true,
    adjustmentCredit: -0.33,
    adjustmentCreditPercentage: false,
    description: "Lorem Ipsum...",
    name: "Condition 1"
  }
];