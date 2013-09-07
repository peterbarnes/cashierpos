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

App.RangeField = Ember.TextField.extend({
  type: 'range',
  attributeBindings: ['min', 'max', 'step']
});

App.DateField = Ember.TextField.extend({
  type: 'date',
  date: function(key, date) {
    if (date) {
      this.set('value', date.toISOString().substring(0, 10));
    } else {
      value = this.get('value');
      if (value) {
        date = new Date(value);
      } else {
        date = null;
      }
    }
    return date;
  }.property('value')
});