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

App.Sale.FIXTURES = [
  {
    id: 0,
    sku: "BFC94FA0-D0BC-0130-AD86-109ADD6B8334",
    complete: false,
    taxRate: 0.07,
    pdfUrl: "http://www.example.com/example.pdf",
    customer: 0,
    till: 0,
    user: 0,
    lines: [0,1],
    payment: 0
  },
  {
    id: 1,
    sku: "BFC94FA0-D0BC-0130-AD86-109ADD6B8334",
    complete: false,
    taxRate: 0.07,
    pdfUrl: "http://www.example.com/example.pdf",
    customer: 0,
    till: 0,
    user: 0,
    lines: [2,3],
    payment: 1
  }
];