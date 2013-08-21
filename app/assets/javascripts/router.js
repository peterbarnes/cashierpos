App.Router.map(function() {
  this.resource('sales', function() {
    this.resource('sale', { path: "/:sale_id" }, function() {
      this.route('line', { path: "/line" });
      this.route('user', { path: "/user" });
      this.route('customer', { path: "/customer" });
      this.route('till', { path: "/till" });
    });
  });
  this.resource('purchases', function() {
    this.resource('purchase', { path: "/:purchase_id" }, function() {
      this.route('line', { path: "/line" });
      this.route('user', { path: "/user" });
      this.route('customer', { path: "/customer" });
      this.route('till', { path: "/till" });
    });
  });
});