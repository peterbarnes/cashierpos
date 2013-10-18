App.SalesIndexController = Ember.ArrayController.extend({
  query: '',
  filter: 'active',
  page: 1,
  perPage: 10,
  newCount: 0,
  searching: false,
  actions: {
    new: function() {
      var sale = App.Sale.create({id: 'new-' + this.get('newCount')});
      this.incrementProperty('newCount');
      this.transitionToRoute('sale', sale);
    },
    load: function(sale) {
      this.transitionToRoute('sale', sale.id);
    },
    print: function(sale) {
      sale.print();
    },
    flag: function(sale) {
      sale.set('flagged', !sale.get('flagged'));
      sale.save();
    },
    view: function(sale) {
      this.send('load', sale);
    },
    delete: function(sale) {
      if (confirm('Are you sure you want to delete this sale?')) {
        sale.delete((function (result){
          this.send('search');
        }).bind(this));
      }
    },
    search: function() {
      this.set('searching', true);
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage'), (function() {
        this.set('searching', false);
      }).bind(this)));
    },
    refresh: function() {
      this.send('search');
    },
    clear: function() {
      this.set('query', '');
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    },
    active: function() {
      this.set('filter', 'active');
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    },
    complete: function() {
      this.set('filter', 'complete');
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    },
    flagged: function() {
      this.set('filter', 'flagged');
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    },
    recent: function() {
      this.set('filter', 'recent');
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    },
    prev: function() {
      if (this.get('page') > 1) {
        this.decrementProperty('page');
        this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
      }
    },
    next: function() {
      this.incrementProperty('page');
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    },
    perTen: function() {
      this.set('perPage', 10);
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    },
    perTwentyFive: function() {
      this.set('perPage', 25);
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    },
    perFifty: function() {
      this.set('perPage', 50);
      this.set('content', App.Sale.query(this.get('query'),this.get('filter'),this.get('page'),this.get('perPage')));
    }
  },
  isFilterActive: function() {
    return this.get('filter') == 'active';
  }.property('filter'),
  isFilterComplete: function() {
    return this.get('filter') == 'complete';
  }.property('filter'),
  isFilterFlagged: function() {
    return this.get('filter') == 'flagged';
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
  }.property('searching', 'filter', 'perPage'),
  totalPages: function() {
    return Math.floor(this.get('total') / this.get('perPage')) + 1;
  }.property('total')
});