App.Line = Ember.Object.extend({
  amount: 0,
  amountDecimal: 0,
  quantity: 0,
  note: "",
  sku: "",
  taxable: true,
  title: "",
  remove: false,
  amountDecimalChanged: function() {
    this.set('amount', parseInt(Math.round(1000 * this.get('amountDecimal') * 100) / 1000));
  }.observes('amountDecimal'),
  subtotal: function() {
    return parseInt(this.get('amount')) * parseInt(this.get('quantity'));
  }.property('amount', 'quantity')
});

App.Line.reopenClass({
  fixtures: function() {
    var fixtures = [];
    App.Line.FIXTURES.forEach(function(line) {
      var _line = App.Line.create({
        id: line.id,
        amount: line.amount,
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
    quantity: 2,
    note: "",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    amount: 100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    amount: 1000,
    quantity: 2,
    note: "Lorem Ipsum...",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    amount: 100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    amount: -100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: false,
    title: "Line 2"
  }
];