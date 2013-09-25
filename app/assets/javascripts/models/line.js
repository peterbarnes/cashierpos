App.Line = Ember.Object.extend({
  amount: 0,
  amountCash: 0,
  amountCredit: 0,
  quantity: 0,
  note: "",
  sku: "",
  taxable: true,
  title: "",
  remove: false,
  amountFmt: function(key, amount) {
    if (amount) {
      this.set('amount', parseInt(Math.round(1000 * amount * 100) / 1000));
    } else {
      return parseFloat(this.get('amount') * 0.01).toFixed(2);
    }
  }.property('amount'),
  amountCashFmt: function(key, amount) {
    if (amount) {
      this.set('amountCash', parseInt(Math.round(1000 * amount * 100) / 1000));
    } else {
      return parseFloat(this.get('amountCash') * 0.01).toFixed(2);
    }
  }.property('amountCash'),
  amountCreditFmt: function(key, amount) {
    if (amount) {
      this.set('amountCredit', parseInt(Math.round(1000 * amount * 100) / 1000));
    } else {
      return parseFloat(this.get('amountCredit') * 0.01).toFixed(2);
    }
  }.property('amountCredit'),
  subtotal: function() {
    return parseInt(this.get('amount')) * parseInt(this.get('quantity'));
  }.property('amount', 'quantity'),
  cashSubtotal: function() {
    return parseInt(this.get('amountCash')) * parseInt(this.get('quantity'));
  }.property('amountCash', 'quantity'),
  creditSubtotal: function() {
    return parseInt(this.get('amountCredit')) * parseInt(this.get('quantity'));
  }.property('amountCredit', 'quantity')
});

App.Line.reopenClass({
  fixtures: function() {
    var fixtures = [];
    App.Line.FIXTURES.forEach(function(line) {
      var _line = App.Line.create({
        id: line.id,
        amount: line.amount,
        amountCash: line.amountCash,
        amountCredit: line.amountCredit,
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
    amountCash: 700,
    amountCredit: 800,
    quantity: 2,
    note: "",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    amount: 100,
    amountCash: 70,
    amountCredit: 80,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    amount: 1000,
    amountCash: 700,
    amountCredit: 800,
    quantity: 2,
    note: "Lorem Ipsum...",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    amount: 100,
    amountCash: 70,
    amountCredit: 80,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    amount: -100,
    amountCash: 700,
    amountCredit: 800,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: false,
    title: "Line 2"
  }
];