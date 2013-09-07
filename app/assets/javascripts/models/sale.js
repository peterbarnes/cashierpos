App.Sale = Ember.Object.extend({
  sku: "",
  complete: false,
  taxRate: 0,
  pdfUrl: "",
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