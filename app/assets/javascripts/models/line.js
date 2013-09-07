App.Line = Ember.Object.extend({
  amount: 0,
  valueCash: 0,
  valueCredit: 0,
  quantity: 0,
  note: "",
  sku: "",
  taxable: true,
  title: "",
  remove: false,
  amountFmt: function(key, value) {
    if (value) {
      this.set('amount', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('amount') * 0.01).toFixed(2);
    }
  }.property('amount'),
  valueCashFmt: function(key, value) {
    if (value) {
      this.set('valueCash', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('valueCash') * 0.01).toFixed(2);
    }
  }.property('valueCash'),
  valueCreditFmt: function(key, value) {
    if (value) {
      this.set('valueCredit', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('valueCredit') * 0.01).toFixed(2);
    }
  }.property('valueCredit'),
  subtotal: function() {
    return parseInt(this.get('amount')) * parseInt(this.get('quantity'));
  }.property('amount', 'quantity'),
  cashSubtotal: function() {
    return parseInt(this.get('valueCash')) * parseInt(this.get('quantity'));
  }.property('valueCash', 'quantity'),
  creditSubtotal: function() {
    return parseInt(this.get('valueCredit')) * parseInt(this.get('quantity'));
  }.property('valueCredit', 'quantity')
});

App.Line.reopenClass({
  fixtures: function() {
    var fixtures = [];
    App.Line.FIXTURES.forEach(function(line) {
      var _line = App.Line.create({
        id: line.id,
        amount: line.amount,
        valueCash: line.valueCash,
        valueCredit: line.valueCredit,
        quantity: line.quantity,
        note: line.note,
        sku: line.sku,
        taxable: line.taxable,
        title: line.title
      });
      fixtures.pushObject(_line);
    });
    return fixtures;
  }
});

App.Line.FIXTURES = [
  {
    amount: 1000,
    valueCash: 700,
    valueCredit: 800,
    quantity: 2,
    note: "",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    amount: 100,
    valueCash: 70,
    valueCredit: 80,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    amount: 1000,
    valueCash: 700,
    valueCredit: 800,
    quantity: 2,
    note: "Lorem Ipsum...",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    amount: 100,
    valueCash: 70,
    valueCredit: 80,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    amount: -100,
    valueCash: 700,
    valueCredit: 800,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: false,
    title: "Line 2"
  }
];