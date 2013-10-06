App.Purchase = Ember.Object.extend({
  sku: "",
  complete: false,
  pdfUrl: "",
  cash: 0,
  credit: 0,
  ratio: 1,
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
  }.property('lines.@each', 'lines.@each.quantity', 'lines.@each.remove'),
  cashSubtotal: function() {
    var lines = this.get('lines');
    var subtotal = 0;
    lines.forEach(function(line) {
      if (!line.get('remove')) {
        subtotal += line.get('cashSubtotal');
      }
    });
    return subtotal;
  }.property('lines.@each', 'lines.@each.cashSubtotal', 'lines.@each.remove'),
  creditSubtotal: function() {
    var lines = this.get('lines');
    var subtotal = 0;
    lines.forEach(function(line) {
      if (!line.get('remove')) {
        subtotal += line.get('creditSubtotal');
      }
    });
    return subtotal;
  }.property('lines.@each', 'lines.@each.creditSubtotal', 'lines.@each.remove'),
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
      if (value.match(/\d+\.\d\d/)) {
        var cash = parseInt(Math.round(1000 * value * 100) / 1000);
        var cashSubtotal = this.get('cashSubtotal');
        var ratio = cash / cashSubtotal;
        if (ratio < 0) { ratio = 0; }
        if (ratio > 1) { ratio = 1; }
        this.set('ratio', 1 - ratio);
      }
    } else {
      return parseFloat(this.get('cash') * 0.01).toFixed(2);
    }
  }.property('cash'),
  creditFmt: function(key, value) {
    if (value) {
      if (value.match(/\d+\.\d\d/)) {
        var credit = parseInt(Math.round(1000 * value * 100) / 1000);
        var creditSubtotal = this.get('creditSubtotal');
        var ratio = credit / creditSubtotal;
        if (ratio < 0) { ratio = 0; }
        if (ratio > 1) { ratio = 1; }
        this.set('ratio', ratio);
      }
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
    this.set('cash', parseInt(Math.round(cashSubtotal * cashMultiplier)));
    this.set('credit', parseInt(Math.round(creditSubtotal * creditMultiplier)));
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
  query: function(query, filter, page, perPage, callback) {
    var purchases = [];
    $.ajax({
      url: '/api/purchases',
      data: {
        query: query,
        filter: filter,
        limit: perPage,
        offset: (page - 1) * perPage
      }
    }).then(function(response) {
      response.forEach(function(object){
        var purchase = object.purchase;
        var model = App.Purchase.create({
          id: purchase.id,
          sku: purchase.sku,
          complete: purchase.complete,
          ratio: purchase.ratio,
          pdfUrl: purchase.pdf_url,
          createdAt: new Date(purchase.created_at),
          updatedAt: new Date(purchase.updated_at)
        });
        model.set('customer', App.Customer.find(purchase.customer_id));
        model.set('till', App.Till.find(purchase.till_id));
        model.set('user', App.User.find(purchase.user_id));
        var lines = [];
        purchase.lines.forEach(function(_line){
          var line = App.Line.create({
            amountCash: _line.amount_credit,
            amountCredit: _line.amount_cash,
            quantity: _line.quantity,
            note: _line.note,
            sku: _line.sku,
            title: _line.title
          });
          lines.addObject(line);
        });
        model.set('lines', lines);
        purchases.addObject(model);
      });
      if (callback) {
        callback();
      }
    });
    return purchases;
  },
  count: function(query, filter) {
    var count = 0;
    $.ajax({
      url: '/api/purchases/count',
      data: {
        query: query,
        filter: filter
      },
      success: function(result) {
        count = result.count;
      },
      async: false
    });
    return count;
  },
  find: function(id) {
    var _purchase = App.Sale.create();
    $.ajax({
      url: "/api/purchases/" + id
    }).then(function(response) {
      var purchase = response.purchase;
      _purchase.setProperties({
        id: purchase.id,
        sku: purchase.sku,
        complete: purchase.complete,
        ratio: parseFloat(purchase.ratio),
        pdfUrl: purchase.pdf_url,
        createdAt: new Date(purchase.created_at),
        updatedAt: new Date(purchase.updated_at)
      });
      _purchase.set('customer', App.Customer.find(purchase.customer_id));
      _purchase.set('till', App.Till.find(purchase.till_id));
      _purchase.set('user', App.User.find(purchase.user_id));
      var lines = [];
      purchase.lines.forEach(function(_line){
        var line = App.Line.create({
          amountCash: _line.amount_cash,
          amountCredit: _line.amount_credit,
          quantity: _line.quantity,
          note: _line.note,
          sku: _line.sku,
          title: _line.title
        });
        lines.addObject(line);
      });
      _purchase.set('lines', lines);
    });
    return _purchase;
  },
  fixtures: function() {
    var fixtures = [];
    App.Purchase.FIXTURES.forEach(function(purchase) {
      var _purchase = App.Purchase.create({
        id: purchase.id,
        sku: purchase.sku,
        complete: purchase.complete,
        pdfUrl: purchase.pdfUrl,
        ratio: purchase.ratio
      });
      _purchase.set('customer', App.Customer.fixtures().objectAt(0));
      _purchase.set('till', App.Till.fixtures().objectAt(0));
      _purchase.set('user', App.User.fixtures().objectAt(0));
      _purchase.set('lines', App.Line.fixtures());
      _purchase.ratioChanged();
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
    ratio: 1
  }
];