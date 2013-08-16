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
});