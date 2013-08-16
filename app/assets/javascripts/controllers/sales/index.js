App.SalesIndexController = Ember.ArrayController.extend({
  new: function() {
    var sale = App.Sale.createRecord();
    this.transitionToRoute('sale', sale);
  },
  search: function() {
    
  },
  reset: function() {
    
  },
  all: function() {
    
  },
  newest: function() {
    
  },
  recent: function() {
    
  },
  prev: function() {
    
  },
  next: function() {
    
  },
  perTen: function() {
    
  },
  perTwentyFive: function() {
    
  },
  perFifty: function() {
    
  },
  load: function(sale) {
    this.transitionToRoute('sale', sale);
  },
  receipt: function(sale) {
    console.log(sale);
  },
  delete: function(sale) {
    sale.deleteRecord();
    sale.save();
  }
});