App.PurchaseSearchController = Ember.ObjectController.extend({
  needs: 'purchase',
  query: '',
  filter: 'all',
  page: 1,
  perPage: 10,
  searching: false,
  back: function() {
    this.transitionToRoute('purchase');
  },
  select: function(item) {
    this.set('model.configurable', item);
    this.transitionToRoute('purchase.configure');
  },
  search: function() {
    this.set('searching', true);
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage'), (function() {
      this.set('searching', false);
    }).bind(this)));
  },
  refresh: function() {
    this.search();
  },
  clear: function() {
    this.set('query', '');
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  all: function() {
    this.set('filter', 'all');
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  newest: function() {
    this.set('filter', 'newest');
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  recent: function() {
    this.set('filter', 'recent');
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  prev: function() {
    if (this.get('page') > 1) {
      this.decrementProperty('page');
      this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    }
  },
  next: function() {
    this.incrementProperty('page');
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  perTen: function() {
    this.set('perPage', 10);
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  perTwentyFive: function() {
    this.set('perPage', 25);
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
  },
  perFifty: function() {
    this.set('perPage', 50);
    this.set('items', App.Item.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
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
    return App.Item.count(this.get('query'),this.get('filter'));
  }.property('query', 'filter', 'perPage'),
  totalPages: function() {
    return Math.floor(this.get('total') / this.get('perPage')) + 1;
  }.property('total')
});