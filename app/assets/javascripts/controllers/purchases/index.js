App.PurchasesIndexController = Ember.ArrayController.extend({
  query: '',
  filter: 'all',
  page: 1,
  perPage: 10,
  new: function() {
    var purchase = App.Purchase.createRecord();
    this.transitionToRoute('purchase', purchase);
  },
  search: function() {
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  clear: function() {
    this.set('query', '');
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  all: function() {
    this.set('filter', 'all');
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  newest: function() {
    this.set('filter', 'newest');
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  recent: function() {
    this.set('filter', 'recent');
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  prev: function() {
    if (this.get('page') > 1) {
      this.decrementProperty('page');
      this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    }
  },
  next: function() {
    this.incrementProperty('page');
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  perTen: function() {
    this.set('perPage', 10);
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  perTwentyFive: function() {
    this.set('perPage', 25);
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  perFifty: function() {
    this.set('perPage', 50);
    this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  isFilterAll: function() {
    return this.get('filter') == 'all';
  }.property('filter'),
  isFilterNewest: function() {
    return this.get('filter') == 'newest';
  }.property('filter'),
  isFilterRecent: function() {
    return this.get('filter') == 'recent';
  }.property('filter'),
  isPerTen: function() {
    return this.get('perPage') == 10;
  }.property('perPage'),
  isPerTwentyFive: function() {
    return this.get('perPage') == 25;
  }.property('perPage'),
  isPerFifty: function() {
    return this.get('perPage') == 50;
  }.property('perPage'),
  hasPages: function() {
    return this.get('totalPages') > 1;
  }.property('totalPages'),
  cantPagePrev: function() {
    return this.get('page') <= 1;
  }.property('page'),
  cantPageNext: function() {
    return this.get('page') >= this.get('totalPages');
  }.property('page', 'totalPages'),
  total: function() {
    return App.Sale.count(this.get('query'),this.get('filter'));
  }.property('query', 'filter', 'perPage'),
  totalPages: function() {
    return this.get('total') / this.get('perPage');
  }.property('total'),
  load: function(purchase) {
    this.transitionToRoute('purchase', purchase);
  },
  print: function(purchase) {
    console.log(purchase);
  },
  delete: function(purchase) {
    purchase.deleteRecord();
    purchase.save();
  }
});