App.Router.map(function() {
  this.resource('sales', function() {
    this.resource('sale', { path: "/:sale_id" }, function() {
      this.route('line', { path: "/line" });
    });
    this.route('new', { path:"/new" });
  });
  this.resource('purchases', function() {
    this.resource('purchase', { path: "/:purchase_id" });
    this.route('new', { path:"/new" });
  });
});