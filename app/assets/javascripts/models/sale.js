App.Sale = Ember.Object.extend({
  sku: "",
  complete: false,
  taxRate: 0,
  pdfUrl: "",
  configurable: null,
  customer: null,
  till: null,
  user: null,
  lines: null,
  payment: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  init: function() {
    this._super();
    this.set('payment', App.Payment.create());
    this.set('lines', Ember.A());
  },
  quantity: function() {
    var lines = this.get('lines');
    var quantity = 0;
    lines.forEach(function(line) {
      if (!line.get('remove')) {
        quantity += parseInt(line.get('quantity'));
      }
    });
    return quantity;
  }.property('lines', 'lines.@each.quantity', 'lines.@each.remove'),
  subtotal: function() {
    var lines = this.get('lines');
    var subtotal = 0;
    lines.forEach(function(line) {
      if (!line.get('remove')) {
        subtotal += line.get('subtotal');
      }
    });
    return subtotal;
  }.property('lines', 'lines.@each.subtotal', 'lines.@each.remove'),
  subtotalAfterStoreCredit: function() {
    return this.get('subtotal') - this.get('payment.storeCredit');
  }.property('lines', 'lines.@each.subtotal', 'lines.@each.remove', 'payment.storeCredit'),
  taxableSubtotal: function() {
    var lines = this.get('lines');
    var subtotal = 0;
    lines.forEach(function(line) {
      if (line.get('taxable') &&  !line.get('remove')) {
        subtotal += line.get('subtotal');
      }
    });
    return subtotal;
  }.property('lines', 'lines.@each.subtotal', 'lines.@each.remove'),
  tax: function() {
    var subtotal = this.get('subtotal') - this.get('payment.storeCredit');
    if (subtotal > 0) {
      var taxableSubtotal = this.get('taxableSubtotal') - this.get('payment.storeCredit');
      if (taxableSubtotal > 0) {
        return parseInt(taxableSubtotal * this.get('taxRate'));
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }.property('lines', 'lines.@each.subtotal', 'lines.@each.taxable', 'lines.@each.remove', 'payment.storeCredit'),
  total: function() {
    return this.get('subtotalAfterStoreCredit') + this.get('tax');
  }.property('lines', 'lines.@each.subtotal', 'lines.@each.remove', 'payment.storeCredit'),
  due: function() {
    return this.get('total') - this.get('payment.total');
  }.property('total', 'payment.storeCredit', 'payment.giftCard', 'payment.check', 'payment.credit', 'payment.cash'),
  dueLabel: function() {
    var due = this.get('due')
    if (due > 0) {
      return "Amount Due:";
    } else {
      return "Change Due:";
    }
  }.property('due'),
  completable: function() {
    return this.get('user') && this.get('till') && this.get('payment') && this.get('quantity') > 0 && this.get('due') <= 0;
  }.property('user', 'till', 'payment', 'quantity', 'due'),
  nonCompletable: function() {
    return !this.get('completable');
  }.property('completable')
});

App.Sale.reopen({
  save: function() {
    console.log('saving...');
  },
  delete: function() {
    console.log('deleting...');
  },
  print: function() {
    console.log('printing...');
  }
});

App.Sale.reopenClass({
  query: function(query, filter, page, perPage, callback) {
    var sales = [];
    $.ajax({
      url: '/api/sales',
      data: {
        query: query,
        filter: filter,
        limit: perPage,
        offset: (page - 1) * perPage
      }
    }).then(function(response) {
      response.forEach(function(object){
        var sale = object.sale;
        var model = App.Sale.create({
          id: sale.id,
          sku: sale.sku,
          complete: sale.complete,
          taxRate: sale.tax_rate,
          pdfUrl: sale.pdf_url,
          createdAt: new Date(sale.created_at),
          updatedAt: new Date(sale.updated_at)
        });
        model.set('customer', App.Customer.find(sale.customer_id));
        model.set('till', App.Till.find(sale.till_id));
        model.set('user', App.User.find(sale.user_id));
        model.set('payment', App.Payment.create({
          cash: sale.payment.cash,
          credit: sale.payment.credit,
          check: sale.payment.check,
          giftCard: sale.payment.gift_card,
          storeCredit: sale.payment.store_credit
        }));
        var lines = [];
        sale.lines.forEach(function(_line){
          var line = App.Line.create({
            amount: _line.amount,
            quantity: _line.quantity,
            note: _line.note,
            sku: _line.sku,
            taxable: _line.taxable,
            title: _line.title
          });
          lines.addObject(line);
        });
        model.set('lines', lines);
        sales.addObject(model);
      });
      if (callback) {
        callback();
      }
    });
    return sales;
  },
  count: function(query, filter) {
    var count = 0;
    $.ajax({
      url: '/api/sales/count',
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
    var _sale = App.Sale.create();
    $.ajax({
      url: "/api/sales/" + id
    }).then(function(response) {
      var sale = response.sale;
      _sale.setProperties({
        id: sale.id,
        sku: sale.sku,
        complete: sale.complete,
        taxRate: sale.tax_rate,
        pdfUrl: sale.pdf_url,
        createdAt: new Date(sale.created_at),
        updatedAt: new Date(sale.updated_at)
      });
      _sale.set('customer', App.Customer.find(sale.customer_id));
      _sale.set('till', App.Till.find(sale.till_id));
      _sale.set('user', App.User.find(sale.user_id));
      _sale.set('payment', App.Payment.create({
        cash: sale.payment.cash,
        credit: sale.payment.credit,
        check: sale.payment.check,
        giftCard: sale.payment.gift_card,
        storeCredit: sale.payment.store_credit
      }));
      var lines = [];
      sale.lines.forEach(function(_line){
        var line = App.Line.create({
          amount: _line.amount,
          quantity: _line.quantity,
          note: _line.note,
          sku: _line.sku,
          taxable: _line.taxable,
          title: _line.title
        });
        lines.addObject(line);
      });
      _sale.set('lines', lines);
    });
    return _sale;
  },
  fixtures: function() {
    var fixtures = [];
    App.Sale.FIXTURES.forEach(function(sale) {
      var _sale = App.Sale.create({
        id: sale.id,
        sku: sale.sku,
        complete: sale.complete,
        taxRate: sale.taxRate,
        pdfUrl: sale.pdfUrl
      });
      _sale.set('customer', App.Customer.fixtures().objectAt(0));
      _sale.set('till', App.Till.fixtures().objectAt(0));
      _sale.set('user', App.User.fixtures().objectAt(0));
      _sale.set('payment', App.Payment.fixtures().objectAt(0));
      _sale.set('lines', App.Line.fixtures());
      fixtures.pushObject(_sale);
    });
    return fixtures;
  }
});

App.Sale.FIXTURES = [
  {
    id: 0,
    sku: "BFC94FA0-D0BC-0130-AD86-109ADD6B8334",
    complete: false,
    taxRate: 0.07,
    pdfUrl: "http://www.example.com/example.pdf"
  },
  {
    id: 1,
    sku: "BFC94FA0-D0BC-0130-AD86-109ADD6B8334",
    complete: false,
    taxRate: 0.07,
    pdfUrl: "http://www.example.com/example.pdf"
  }
];