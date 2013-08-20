App.Purchase = Ember.Object.extend({
  id: null,
  sku: "",
  complete: false,
  pdfUrl: "",
  storeCredit: 0,
  cash: 0,
  customer: null,
  till: null,
  user: null,
  lines: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  init: function() {
    this._super();
    this.set('customer', Ember.Object.create());
    this.set('till', Ember.Object.create());
    this.set('user', Ember.Object.create());
    this.set('lines', Ember.A());
  },
  quantity: function() {
    var lines = this.get('lines');
    var quantity = 0;
    lines.forEach(function(line) {
      quantity += line.get('quantity');
    });
    return quantity;
  }.property('lines', 'lines.@each.quantity'),
  subtotal: function() {
    var lines = this.get('lines');
    var subtotal = 0;
    lines.forEach(function(line) {
      subtotal += line.get('subtotal');
    });
    return subtotal;
  }.property('lines', 'lines.@each.subtotal'),
  total: function() {
    return this.get('subtotal');
  }.property('lines', 'lines.@each.subtotal'),
  due: function() {
    return this.get('cash');
  }.property('cash'),
  dueLabel: function() {
    return "Change Due:";
  }.property(),
  completable: function() {
    return this.get('user') && this.get('customer') && this.get('till') && this.get('quantity') > 0 && this.get('due') <= 0;
  }.property('user', 'till', 'customer', 'quantity', 'due'),
  nonCompletable: function() {
    return !this.get('completable');
  }.property('completable')
});

App.Purchase.reopen({
  save: function() {
    
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
    return this.fixtures.objectAt(id);
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
        storeCredit: purchase.storeCredit
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
    cash: 10,
    storeCredit: 0
  }
];