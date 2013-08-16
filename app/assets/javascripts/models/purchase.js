App.Purchase = DS.Model.extend({
  sku: DS.attr('string'),
  complete: DS.attr('boolean'),
  pdfUrl: DS.attr('string'),
  storeCredit: DS.attr('number'),
  cash: DS.attr('number'),
  customer: DS.belongsTo('App.Customer'),
  till: DS.belongsTo('App.Till'),
  user: DS.belongsTo('App.User'),
  lines: DS.hasMany('App.Line'),
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

App.Purchase.FIXTURES = [
  {
    id: 0,
    sku: "BFC94FA0-D0BC-0130-AD33-109ADD6B83AAA",
    complete: false,
    pdfUrl: "http://www.example.com/example.pdf",
    cash: 10,
    storeCredit: 0,
    customer: 0,
    till: 0,
    user: 0,
    lines: [4]
  }
];