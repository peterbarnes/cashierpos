App.Sale = Ember.Object.extend({
  sku: "",
  complete: false,
  flagged: false,
  taxRate: 0,
  pdfUrl: "",
  note: "",
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
  save: function(callback) {
    var data = {
      sale: {
        id: this.get('id'),
        sku: this.get('sku'),
        complete: this.get('complete'),
        flagged: this.get('flagged'),
        taxRate: this.get('taxRate'),
        note: this.get('note'),
        customer_id: null,
        till_id: null,
        user_id: null,
        lines_attributes: [],
        payment_attributes: null
      }
    }
    if (this.get('customer')) {
      data.sale.customer_id = this.get('customer.id');
    }
    if (this.get('till')) {
      data.sale.till_id = this.get('till.id');
    }
    if (this.get('user')) {
      data.sale.user_id = this.get('user.id');
    }
    if (this.get('payment')) {
      data.sale.payment_attributes = {
        id: this.get('payment.id'),
        cash: this.get('payment.cash'),
        credit: this.get('payment.credit'),
        check: this.get('payment.check'),
        gift_card: this.get('payment.giftCard'),
        store_credit: this.get('payment.storeCredit')
      }
    }
    this.get('lines').forEach(function(line) {
      data.sale.lines_attributes.addObject({
        id: line.get('id'),
        amount: line.get('amount'),
        amount_cash: line.get('amountCash'),
        amount_credit: line.get('amountCredit'),
        bullets: line.get('bullets'),
        inventory: line.get('inventory'),
        quantity: line.get('quantity'),
        note: line.get('note'),
        sku: line.get('sku'),
        taxable: line.get('taxable'),
        title: line.get('title'),
        _destroy: line.get('remove')
      });
    });
    if (this.id.indexOf('new') == -1) {
      $.ajax({
        url: '/api/sales/' + this.id,
        data: JSON.stringify(data),
        type: 'PUT',
        contentType: 'application/json',
        success: (function(result) {
          var sale = result.sale;
          this.setProperties({
            id: sale.id,
            sku: sale.sku,
            complete: sale.complete,
            flagged: sale.flagged,
            taxRate: sale.tax_rate,
            pdfUrl: sale.pdf_url,
            note: sale.note,
            createdAt: new Date(sale.created_at),
            updatedAt: new Date(sale.updated_at)
          });
          this.set('customer', App.Customer.find(sale.customer_id));
          this.set('till', App.Till.find(sale.till_id));
          this.set('user', App.User.find(sale.user_id));
          if (sale.payment) {
            this.set('payment', App.Payment.create({
              id: sale.payment.id,
              cash: sale.payment.cash,
              credit: sale.payment.credit,
              check: sale.payment.check,
              giftCard: sale.payment.gift_card,
              storeCredit: sale.payment.store_credit
            }));
          }
          var lines = [];
          sale.lines.forEach(function(_line){
            var line = App.Line.create({
              id: _line.id,
              amount: _line.amount,
              inventory: _line.inventory,
              quantity: _line.quantity,
              note: _line.note,
              sku: _line.sku,
              taxable: _line.taxable,
              title: _line.title
            });
            line.set('bullets', _line.bullets);
            lines.addObject(line);
          });
          this.set('lines', lines);
          if (this.get('complete')) {
            this.print();
          }
          if (callback) {
            callback();
          }
        }).bind(this)
      });
    } else {
      $.ajax({
        url: '/api/sales',
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json',
        success: (function(result) {
          var sale = result.sale;
          this.setProperties({
            id: sale.id,
            sku: sale.sku,
            complete: sale.complete,
            flagged: sale.flagged,
            taxRate: sale.tax_rate,
            pdfUrl: sale.pdf_url,
            note: sale.note,
            createdAt: new Date(sale.created_at),
            updatedAt: new Date(sale.updated_at)
          });
          this.set('customer', App.Customer.find(sale.customer_id));
          this.set('till', App.Till.find(sale.till_id));
          this.set('user', App.User.find(sale.user_id));
          if (sale.payment) {
            this.set('payment', App.Payment.create({
              id: sale.payment.id,
              cash: sale.payment.cash,
              credit: sale.payment.credit,
              check: sale.payment.check,
              giftCard: sale.payment.gift_card,
              storeCredit: sale.payment.store_credit
            }));
          }
          var lines = [];
          sale.lines.forEach(function(_line){
            var line = App.Line.create({
              id: _line.id,
              amount: _line.amount,
              inventory: _line.inventory,
              quantity: _line.quantity,
              note: _line.note,
              sku: _line.sku,
              taxable: _line.taxable,
              title: _line.title
            });
            line.set('bullets', _line.bullets);
            lines.addObject(line);
          });
          this.set('lines', lines);
          if (this.get('complete')) {
            this.print();
          }
          if (callback) {
            callback();
          }
        }).bind(this)
      });
    }
  },
  delete: function(callback) {
    if (this.id) {
      $.ajax({
        url: '/api/sales/' + this.id,
        type: 'DELETE',
        success: function(result) {
          console.log(result);
          if (callback) {
            callback(result);
          }
        }
      });
    }
  },
  print: function() {
    if (this.id) {
      $.ajax({
        url: '/api/sales/print/' + this.id,
        type: 'GET',
        success: function(result) {
          console.log(result);
        }
      });
    }
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
          flagged: sale.flagged,
          taxRate: sale.tax_rate,
          pdfUrl: sale.pdf_url,
          note: sale.note,
          createdAt: new Date(sale.created_at),
          updatedAt: new Date(sale.updated_at)
        });
        model.set('customer', App.Customer.find(sale.customer_id));
        model.set('till', App.Till.find(sale.till_id));
        model.set('user', App.User.find(sale.user_id));
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
        flagged: sale.flagged,
        taxRate: sale.tax_rate,
        pdfUrl: sale.pdf_url,
        note: sale.note,
        createdAt: new Date(sale.created_at),
        updatedAt: new Date(sale.updated_at)
      });
      _sale.set('customer', App.Customer.find(sale.customer_id));
      _sale.set('till', App.Till.find(sale.till_id));
      _sale.set('user', App.User.find(sale.user_id));
      if (sale.payment) {
        _sale.set('payment', App.Payment.create({
          id: sale.payment.id,
          cash: sale.payment.cash,
          credit: sale.payment.credit,
          check: sale.payment.check,
          giftCard: sale.payment.gift_card,
          storeCredit: sale.payment.store_credit
        }));
      }
      var lines = [];
      sale.lines.forEach(function(_line){
        var line = App.Line.create({
          id: _line.id,
          amount: _line.amount,
          inventory: _line.inventory,
          quantity: _line.quantity,
          note: _line.note,
          sku: _line.sku,
          taxable: _line.taxable,
          title: _line.title
        });
        line.set('bullets', _line.bullets);
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