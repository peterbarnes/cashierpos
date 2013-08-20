App.Payment = Ember.Object.extend({
  cash: 0,
  credit: 0,
  check: 0,
  giftCard: 0,
  storeCredit: 0,
  total: function() {
    return parseInt(this.get('cash')) + parseInt(this.get('credit')) + parseInt(this.get('check')) + parseInt(this.get('giftCard'));
  }.property('cash', 'credit', 'check', 'giftCard')
});

App.Payment.reopenClass({
  fixtures: function() {
    var fixtures = [];
    App.Payment.FIXTURES.forEach(function(payment) {
      var _payment = App.Payment.create({
        id: payment.id,
        cash: payment.cash,
        credit: payment.credit,
        check: payment.check,
        giftCard: payment.giftCard,
        storeCredit: payment.storeCredit
      });
      fixtures.pushObject(_payment);
    });
    return fixtures;
  }
});

App.Payment.FIXTURES = [
  {
    id: 0,
    cash: 1000,
    credit: 400,
    check: 10,
    giftCard: 100,
    storeCredit: 200
  },
  {
    id: 1,
    cash: 1000,
    credit: 400,
    check: 10,
    giftCard: 100,
    storeCredit: 200
  }
];