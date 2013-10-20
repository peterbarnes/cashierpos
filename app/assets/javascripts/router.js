App.Router.map(function() {
  this.resource('sales', function() {
    this.resource('sale', { path: "/:sale_id" }, function() {
      this.route('search', { path: "/search/:query" });
      this.route('configure', { path: "/configure" });
      this.route('payment', { path: "/payment" });
      this.route('line', { path: "/line" });
      this.route('user', { path: "/user" });
      this.route('customer', { path: "/customer" });
      this.route('addcustomer', { path: "/addcustomer" });
      this.route('editcustomer', { path: "/editcustomer" });
    });
  });
  this.resource('purchases', function() {
    this.resource('purchase', { path: "/:purchase_id" }, function() {
      this.route('search', { path: "/search/:query" });
      this.route('configure', { path: "/configure" });
      this.route('line', { path: "/line" });
      this.route('user', { path: "/user" });
      this.route('customer', { path: "/customer" });
      this.route('addcustomer', { path: "/addcustomer" });
      this.route('editcustomer', { path: "/editcustomer" });
    });
  });
});