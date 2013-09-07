App.Payment = Ember.Object.extend({
  cash: 0,
  credit: 0,
  check: 0,
  giftCard: 0,
  storeCredit: 0,
  total: function() {
    return parseInt(this.get('cash')) + parseInt(this.get('credit')) + parseInt(this.get('check')) + parseInt(this.get('giftCard'));
  }.property('cash', 'credit', 'check', 'giftCard'),
  cashFmt: function(key, value) {
    if (value) {
      this.set('cash', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('cash') * 0.01).toFixed(2);
    }
  }.property('cash'),
  creditFmt: function(key, value) {
    if (value) {
      this.set('credit', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('credit') * 0.01).toFixed(2);
    }
  }.property('credit'),
  checkFmt: function(key, value) {
    if (value) {
      this.set('check', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('check') * 0.01).toFixed(2);
    }
  }.property('check'),
  giftCardFmt: function(key, value) {
    if (value) {
      this.set('giftCard', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('giftCard') * 0.01).toFixed(2);
    }
  }.property('giftCard'),
  storeCreditFmt: function(key, value) {
    if (value) {
      this.set('storeCredit', parseInt(Math.round(1000 * value * 100) / 1000));
    } else {
      return parseFloat(this.get('storeCredit') * 0.01).toFixed(2);
    }
  }.property('storeCredit')
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