Ember.Handlebars.registerBoundHelper('currency', function(value) {
  if (isNaN(value)) { return "0.00"; }
  return parseFloat(value / 100).toFixed(2).toString();
});

Ember.Handlebars.registerBoundHelper('boolean', function(value) {
  if (value) { return "Yes"; } else { return "No"; }
});

App.NumberField = Ember.TextField.extend({
  type: 'number',
  attributeBindings: ['min', 'max', 'step']
});