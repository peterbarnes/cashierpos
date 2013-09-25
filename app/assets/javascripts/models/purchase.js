App.Purchase = Ember.Object.extend({
  sku: "",
  complete: false,
  pdfUrl: "",
  cash: 0,
  credit: 0,
  ratio: 0,
  configurable: null,
  customer: null,
  till: null,
  user: null,
  lines: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  init: function() {
    this._super();
    this.set('lines', Ember.A());
    this.set('ratio', 1);
  },
  quantity: function() {
    var lines = this.get('lines');
    var quantity = 0;
    lines.forEach(function(line) {
      if (!line.get('remove')) {
        quantity += line.get('quantity');
      }
    });
    return quantity;
  }.property('lines', 'lines.@each.quantity', 'lines.@each.remove'),
  cashSubtotal: function() {
    var lines = this.get('lines');
    var subtotal = 0;
    lines.forEach(function(line) {
      if (!line.get('remove')) {
        subtotal += line.get('cashSubtotal');
      }
    });
    return subtotal;
  }.property('lines', 'lines.@each.cashSubtotal', 'lines.@each.remove'),
  creditSubtotal: function() {
    var lines = this.get('lines');
    var subtotal = 0;
    lines.forEach(function(line) {
      if (!line.get('remove')) {
        subtotal += line.get('creditSubtotal');
      }
    });
    return subtotal;
  }.property('lines', 'lines.@each.creditSubtotal', 'lines.@each.remove'),
  due: function() {
    return this.get('cash');
  }.property('cash'),
  dueLabel: function() {
    return "Change Due:";
  }.property(),
  completable: function() {
    return this.get('user') && this.get('customer') && this.get('till') && this.get('quantity') > 0 && this.get('due') >= 0;
  }.property('user', 'till', 'customer', 'quantity', 'due'),
  nonCompletable: function() {
    return !this.get('completable');
  }.property('completable'),
  cashFmt: function(key, value) {
    if (value) {
      var cash = parseInt(Math.round(1000 * value * 100) / 1000);
      var cashSubtotal = this.get('cashSubtotal');
      var ratio = cash / cashSubtotal;
      this.set('cash', cash);
      this.set('ratio', 1 - ratio);
    } else {
      return parseFloat(this.get('cash') * 0.01).toFixed(2);
    }
  }.property('cash'),
  creditFmt: function(key, value) {
    if (value) {
      var credit = parseInt(Math.round(1000 * value * 100) / 1000);
      var creditSubtotal = this.get('creditSubtotal');
      var ratio = credit / creditSubtotal;
      this.set('credit', credit);
      this.set('ratio', ratio);
    } else {
      return parseFloat(this.get('credit') * 0.01).toFixed(2);
    }
  }.property('credit'),
  ratioChanged: function() {
    var ratio = this.get('ratio');
    var cashSubtotal = this.get('cashSubtotal');
    var creditSubtotal = this.get('creditSubtotal');
    var cashMultiplier = 0;
    var creditMultiplier = 0;
    if (ratio >= 0) {
      cashMultiplier = 1 - ratio;
      creditMultiplier = ratio;
    } else {
      cashMultiplier = ratio * -1;
      creditMultiplier = -1 - ratio;
    }
    this.set('cash', parseInt(cashSubtotal * cashMultiplier));
    this.set('credit', parseInt(creditSubtotal * creditMultiplier));
  }.observes('ratio', 'cashSubtotal', 'creditSubtotal')
});

App.Purchase.reopen({
  save: function() {
    console.log('saving...');
  },
  delete: function() {
    console.log('deleting...');
  },
  print: function() {
    console.log('printing...');
  }
})

App.Purchase.reopenClass({
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
    App.Purchase.FIXTURES.forEach(function(purchase) {
      var _purchase = App.Purchase.create({
        id: purchase.id,
        sku: purchase.sku,
        complete: purchase.complete,
        pdfUrl: purchase.pdfUrl,
        cash: purchase.cash,
        credit: purchase.credit
      });
      _purchase.set('customer', App.Customer.fixtures().objectAt(0));
      _purchase.set('till', App.Till.fixtures().objectAt(0));
      _purchase.set('user', App.User.fixtures().objectAt(0));
      _purchase.set('lines', App.Line.fixtures());
      fixtures.pushObject(_purchase);
    });
    return fixtures;
  }
});

App.Purchase.FIXTURES = [
  {
    id: 0,
    sku: "BFC94FA0-D0BC-0130-AD33-109ADD6B83AAA",
    complete: false,
    pdfUrl: "http://www.example.com/example.pdf",
    cash: 0,
    credit: 0
  }
];