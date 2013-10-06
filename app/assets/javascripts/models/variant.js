App.Variant = Ember.Object.extend({
  id: null,
  adjustment: 0,
  adjustmentPercentage: false,
  adjustmentCash: 0,
  adjustmentCashPercentage: false,
  adjustmentCredit: 0,
  adjustmentCreditPercentage: false,
  description: "",
  identifier: "",
  identifierType: "",
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

App.Variant.reopenClass({
  fixtures: function() {
    var fixtures = [];
    App.Variant.FIXTURES.forEach(function(variant) {
      var _variant = App.Variant.create({
        id: variant.id,
        adjustment: variant.adjustment,
        adjustmentPercentage: variant.adjustmentPercentage,
        adjustmentCash: variant.adjustmentCash,
        adjustmentCashPercentage: variant.adjustmentCashPercentage,
        adjustmentCredit: variant.adjustmentCredit,
        adjustmentCreditPercentage: variant.adjustmentCreditPercentage,
        description: variant.description,
        identifier: variant.identifier,
        identifierType: variant.identifierType,
        name: variant.name
      });
      fixtures.pushObject(_variant);
    });
    return fixtures;
  }
});

App.Variant.FIXTURES = [
  {
    id: 0,
    adjustment: 2.33,
    adjustmentPercentage: true,
    adjustmentCash: 1.22,
    adjustmentCashPercentage: false,
    adjustmentCredit: 3.32,
    adjustmentCreditPercentage: false,
    description: "Lorem Ipsum...",
    identifier: "1234",
    identifierType: "MPN",
    name: "Variant 1",
    typical: true
  },
  {
    id: 0,
    adjustment: 0.33,
    adjustmentPercentage: true,
    adjustmentCash: 0.44,
    adjustmentCashPercentage: false,
    adjustmentCredit: 0.88,
    adjustmentCreditPercentage: false,
    description: "Lorem Ipsum...",
    identifier: "2345",
    identifierType: "MPN",
    name: "Variant 2",
    typical: false
  }
];