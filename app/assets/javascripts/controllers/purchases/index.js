App.PurchasesIndexController = Ember.ArrayController.extend({
  new: function() {
    var purchase = App.Purchase.createRecord();
    this.transitionToRoute('purchase', purchase);
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
  load: function(purchase) {
    this.transitionToRoute('purchase', purchase);
  },
  receipt: function(purchase) {
    console.log(purchase);
  },
  delete: function(purchase) {
    purchase.deleteRecord();
    purchase.save();
  }
});