//= require ./vendor/jquery
//= require ./vendor/bootstrap
//= require ./vendor/handlebars
//= require ./vendor/ember
//= require ./vendor/ember-data
//= require ./vendor/math.uuid
//= require ./environment
//= require ./models
//= require ./fixtures
//= require_tree .
//= require_self

App.Store = DS.Store.extend({
  revision: 13,
  adapter: DS.FixtureAdapter.create({
    queryFixtures: function(fixtures, query, type) {
      return fixtures.filter(function(item) {
        for(prop in query) {
          if(item[prop] != query[prop]) {
            return false;
          }
        }
        return true;
      });
    }
  })
});

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

App.ApplicationRoute = Ember.Route.extend({
  events: {
    open: function(modal) {
      this.render(modal, {
        into: 'application',
        outlet: 'modal'
      });
      $('#' + modal).modal('show');
    },
    close: function(modal) {
      $('#' + modal).modal('hide');
      $('#' + modal).bind('hide', function(event) {
        //alert();
      });
      // this.render('empty', {
      //   into: 'application',
      //   outlet: 'modal'
      // });
    }
  }
})

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('sales');
  }
});

App.SalesIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Sale.find();
  }
});

App.SalesNewRoute = Ember.Route.extend({
  model: function() {
    return App.Sale.createRecord({
      sku: Math.uuid(),
      complete: false,
      taxRate: 0,
      payment: App.Payment.createRecord({
        storeCredit: 0,
        cash: 0,
        credit: 0,
        check: 0,
        giftCard: 0
      })
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('sale').set('model', model);
  },
  renderTemplate: function() {
    this.render('sale', { controller:'sale' });
  },
  deactivate: function() {
    if (this.currentModel.get('isNew') && !this.currentModel.get('isSaving')) {
      this.currentModel.deleteRecord();
      this.get('store').commit();
    }
  }
});

App.SalesIndexController = Ember.ArrayController.extend({
  delete: function(sale) {
    sale.deleteRecord();
    this.get('store').commit();
  },
  receipt: function(sale) {
    console.log(sale);
  },
  load: function(sale) {
    this.transitionToRoute('sale', sale);
  }
});

App.SaleRoute = Ember.Route.extend({
  deactivate: function() {
    if (this.currentModel.get('isDirty') && !this.currentModel.get('isSaving')) {
      this.currentModel.get('transaction').rollback();
      this.get('store').commit();
    }
  }
});

App.SaleLineRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({into: 'application', outlet: 'modal'});
  },
  model: function() {
    return App.Line.createRecord();
  }
});

App.SaleLineController = Ember.ObjectController.extend({
  needs: ['sale'],
  add: function() {
    var line = this.get('model');
    this.get('controllers.sale').get('model.lines').pushObject(line);
    this.send('close', 'line');
  }
});

App.SaleLineView = Ember.View.extend({
  templateName: 'line',
  didInsertElement: function(){
    $('#line').modal('show');
  }
});

App.SaleController = Ember.ObjectController.extend({
  add: function() {
    var query = this.get('query');
    var units = App.Unit.find({sku: query});
    var controller = this;
    this.set('query', null);
    units.on('didLoad', function() {
      this.forEach(function(unit) {
        controller.get('model.lines').pushObject(App.Line.createRecord({
          title: unit.get('name'),
          amount: unit.get('price'),
          quantity: 1,
          sku: unit.get('sku'),
          taxable: unit.get('taxable'),
        }));
      });
    });
  },
  search: function() {
    console.log(this.get('query'));
    this.set('query', null);
  },
  remove: function(line) {
    line.deleteRecord();
  },
  quantityPlus: function(line) {
    line.set('quantity', parseInt(line.get('quantity')) + 1);
  },
  quantityMinus: function(line) {
    var quantity = parseInt(line.get('quantity'));
    if (quantity > 0) {
      quantity = quantity - 1;
    }
    line.set('quantity', quantity);
  },
  save: function(sale) {
    sale.save();
    this.transitionToRoute('sales');
  },
  complete: function(sale) {
    sale.set('complete', true);
    sale.save();
    this.transitionToRoute('sales');
  },
  editTill: function() {
    this.send('open', 'till');
  },
  editUser: function() {
    this.send('open', 'user');
  },
  editCustomer: function() {
    this.send('open', 'customer');
  }
});

App.PurchasesIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Purchase.find();
  }
});

App.PurchasesNewRoute = Ember.Route.extend({
  model: function() {
    return App.Purchase.createRecord({
      sku: Math.uuid(),
      complete: false,
      taxRate: 0,
      pdfUrl: '',
      cash: 0,
      storeCredit: 0
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('purchase').set('model', model);
  },
  renderTemplate: function() {
    this.render('purchase', { controller:'purchase' });
  },
  deactivate: function() {
    if (this.currentModel.get('isNew') && !this.currentModel.get('isSaving')) {
      this.currentModel.deleteRecord();
      this.get('store').commit();
    }
  }
});

App.PurchasesIndexController = Ember.ArrayController.extend({
  delete: function(purchase) {
    purchase.deleteRecord();
    this.get('store').commit();
  },
  receipt: function(purchase) {
    console.log(purchase);
  }
});

App.PurchaseRoute = Ember.Route.extend({
  deactivate: function() {
    if (this.currentModel.get('isDirty') && !this.currentModel.get('isSaving')) {
      this.currentModel.get('transaction').rollback();
      this.get('store').commit();
    }
  }
});

App.PurchaseController = Ember.ObjectController.extend({
  add: function() {
    console.log(this.get('query'));
  },
  search: function() {
    console.log(this.get('query'));
  },
  remove: function(line) {
    line.deleteRecord();
  },
  addLine: function() {
    
  },
  quantityPlus: function(line) {
    line.set('quantity', parseInt(line.get('quantity')) + 1);
  },
  quantityMinus: function(line) {
    var quantity = parseInt(line.get('quantity'));
    if (quantity > 0) {
      quantity = quantity - 1;
    }
    line.set('quantity', quantity);
  },
  save: function(purchase) {
    purchase.save();
    this.transitionToRoute('purchases');
  },
  complete: function(purchase) {
    purchase.set('complete', true);
    purchase.save();
    this.transitionToRoute('purchases');
  },
  editTill: function() {
    
  },
  editUser: function() {
    
  },
  editCustomer: function() {
    
  }
});

App.TillController = Ember.ArrayController.extend({
  select: function() {
    this.send('close', 'till');
  },
});

App.TillView = Ember.View.extend({
  templateName: 'till',
  didInsertElement: function(){
    $('#till').modal('show');
  }
});

App.CustomerController = Ember.ArrayController.extend({
  select: function() {
    this.send('close', 'customer');
  },
});

App.CustomerView = Ember.View.extend({
  templateName: 'customer',
  didInsertElement: function(){
    $('#customer').modal('show');
  }
});

App.UserController = Ember.ArrayController.extend({
  select: function() {
    this.send('close', 'user');
  },
});

App.UserView = Ember.View.extend({
  templateName: 'user',
  didInsertElement: function(){
    $('#user').modal('show');
  }
});

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
