// Models

App.Sale = DS.Model.extend({
  sku: DS.attr('string'),
  complete: DS.attr('boolean'),
  taxRate: DS.attr('number'),
  pdfUrl: DS.attr('string'),
  customer: DS.belongsTo('App.Customer'),
  till: DS.belongsTo('App.Till'),
  user: DS.belongsTo('App.User'),
  lines: DS.hasMany('App.Line'),
  payment: DS.belongsTo('App.Payment'),
  quantity: function() {
    var lines = this.get('lines');
    var quantity = 0;
    lines.forEach(function(line) {
      quantity += parseInt(line.get('quantity'));
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
  subtotalAfterStoreCredit: function() {
    return this.get('subtotal') - this.get('payment.storeCredit');
  }.property('lines', 'lines.@each.subtotal', 'payment.storeCredit'),
  taxableSubtotal: function() {
    var lines = this.get('lines');
    var subtotal = 0;
    lines.forEach(function(line) {
      if (line.get('taxable')) {
        subtotal += line.get('subtotal');
      }
    });
    return subtotal;
  }.property('lines', 'lines.@each.subtotal'),
  tax: function() {
    var subtotal = this.get('taxableSubtotal') - this.get('payment.storeCredit');
    if (subtotal > 0) {
      return parseInt(subtotal * this.get('taxRate'));
    } else {
      return 0;
    }
  }.property('lines', 'lines.@each.subtotal', 'lines.@each.taxable', 'payment.storeCredit'),
  total: function() {
    return this.get('subtotalAfterStoreCredit') + this.get('tax');
  }.property('lines', 'lines.@each.subtotal', 'payment.storeCredit'),
  due: function() {
    return this.get('total') - this.get('payment.total');
  }.property('total'),
  dueLabel: function() {
    var due = this.get('due')
    if (due > 0) {
      return "Amount Due:";
    } else {
      return "Change Due:";
    }
  }.property('due'),
  completable: function() {
    return this.get('user') && this.get('till') && this.get('payment') && this.get('quantity') > 0 && this.get('due') <= 0;
  }.property('user', 'till', 'payment', 'quantity', 'due'),
  nonCompletable: function() {
    return !this.get('completable');
  }.property('completable')
});

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

App.Customer = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  organization: DS.attr('string'),
  sku: DS.attr('string'),
  notes: DS.attr('string'),
  credit: DS.attr('number'),
  dateOfBirth: DS.attr('date'),
  imageUrl: DS.attr('string'),
  sales: DS.hasMany('App.Sale'),
  purchases: DS.hasMany('App.Purchase'),
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});

App.Till = DS.Model.extend({
  name: DS.attr('string'),
  minimum: DS.attr('number'),
  business: DS.belongsTo('App.Business'),
  sales: DS.hasMany('App.Sale'),
  purchases: DS.hasMany('App.Purchase')
});

App.Business = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  taxRate: DS.attr('number'),
  imageUrl: DS.attr('string'),
  tills: DS.hasMany('App.Till')
});

App.User = DS.Model.extend({
  active: DS.attr('boolean'),
  administrator: DS.attr('boolean'),
  email: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  username: DS.attr('string'),
  pin: DS.attr('string'),
  sales: DS.hasMany('App.Sale'),
  purchases: DS.hasMany('App.Purchase'),
  fullname: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});

App.Line = DS.Model.extend({
  amount: DS.attr('number'),
  quantity: DS.attr('number'),
  note: DS.attr('string'),
  sku: DS.attr('string'),
  taxable: DS.attr('boolean'),
  title: DS.attr('string'),
  sale: DS.belongsTo('App.Sale'),
  purchase: DS.belongsTo('App.Purchase'),
  subtotal: function() {
    return parseInt(this.get('amount')) * parseInt(this.get('quantity'));
  }.property('amount', 'quantity')
});

App.Payment = DS.Model.extend({
  cash: DS.attr('number'),
  credit: DS.attr('number'),
  check: DS.attr('number'),
  giftCard: DS.attr('number'),
  storeCredit: DS.attr('number'),
  sale: DS.belongsTo('App.Sale'),
  total: function() {
    return parseInt(this.get('cash')) + parseInt(this.get('credit')) + parseInt(this.get('check')) + parseInt(this.get('giftCard'));
  }.property('cash', 'credit', 'check', 'giftCard')
});

App.Unit = DS.Model.extend({
  name: DS.attr('string'),
  sku: DS.attr('string'),
  price: DS.attr('number'),
  taxable: DS.attr('boolean')
});