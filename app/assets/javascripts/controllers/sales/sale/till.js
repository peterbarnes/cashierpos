App.SaleTillController = Ember.ObjectController.extend({
  needs: 'sale',
  back: function() {
    this.transitionToRoute('sale');
  },
  select: function(till) {
    this.set('model.till', till);
    this.transitionToRoute('sale');
  },
  refresh: function() {
    
  }
});