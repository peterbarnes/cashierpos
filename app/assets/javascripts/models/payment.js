App.Payment = DS.Model.extend({
  cash: DS.attr('number'),
  credit: DS.attr('number'),
  check: DS.attr('number'),
  giftCard: DS.attr('number'),
  storeCredit: DS.attr('number'),
  sale: DS.belongsTo('App.Sale'),
  total: function() {
    return parseInt(this.get('cash')) + parseInt(this.get('credit')) + parseInt(this.get('check')) + parseInt(this.get('giftCard'));
  }.property('cash', 'credit', 'check', 'giftCard')
});

App.Payment.FIXTURES = [
  {
    id: 0,
    sale: 0,
    cash: 1000,
    credit: 400,
    check: 10,
    giftCard: 100,
    storeCredit: 200
  },
  {
    id: 1,
    sale: 1,
    cash: 1000,
    credit: 400,
    check: 10,
    giftCard: 100,
    storeCredit: 200
  }
];