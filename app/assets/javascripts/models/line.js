App.Line = DS.Model.extend({
  amount: DS.attr('number'),
  quantity: DS.attr('number'),
  note: DS.attr('string'),
  sku: DS.attr('string'),
  taxable: DS.attr('boolean'),
  title: DS.attr('string'),
  sale: DS.belongsTo('App.Sale'),
  purchase: DS.belongsTo('App.Purchase'),
  subtotal: function() {
    return parseInt(this.get('amount')) * parseInt(this.get('quantity'));
  }.property('amount', 'quantity')
});

App.Line.FIXTURES = [
  {
    id: 0,
    sale: 0,
    amount: 1000,
    quantity: 2,
    note: "",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    id: 1,
    sale: 0,
    amount: 100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    id: 2,
    sale: 1,
    amount: 1000,
    quantity: 2,
    note: "Lorem Ipsum...",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    id: 3,
    sale: 1,
    amount: 100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    id: 4,
    purchase: 0,
    amount: -100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: false,
    title: "Line 2"
  }
];