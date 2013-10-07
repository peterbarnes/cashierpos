App.PurchasesIndexController = Ember.ArrayController.extend({
  query: '',
  filter: 'all',
  page: 1,
  perPage: 10,
  newCount: 0,
  searching: false,
  actions: {
    new: function() {
      var purchase = App.Purchase.create({id: 'new-' + this.get('newCount')});
      this.incrementProperty('newCount');
      this.transitionToRoute('purchase', purchase);
    },
    load: function(purchase) {
      purchase.ratioChanged();
      this.transitionToRoute('purchase', purchase);
    },
    print: function(purchase) {
      purchase.print();
    },
    delete: function(purchase) {
      if (confirm('Are you sure you want to delete this purchase?')) {
        purchase.delete((function (result){
          this.send('search');
        }).bind(this));
      }
    },
    view: function(sale) {
      window.open(sale.get('pdfUrl'));
    },
    search: function() {
      this.set('searching', true);
      this.set('content', App.Purchase.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage'), (function() {
        this.set('searching', false);
      }).bind(this)));
    },
    refresh: function() {
      this.send('search');
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
    }
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
    return App.Purchase.count(this.get('query'),this.get('filter'));
  }.property('searching', 'filter', 'perPage'),
  totalPages: function() {
    return this.get('total') / this.get('perPage');
  }.property('total')
});