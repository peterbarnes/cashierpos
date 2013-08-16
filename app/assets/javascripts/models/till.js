App.Till = DS.Model.extend({
  name: DS.attr('string'),
  minimum: DS.attr('number'),
  business: DS.belongsTo('App.Business'),
  sales: DS.hasMany('App.Sale'),
  purchases: DS.hasMany('App.Purchase')
});

App.Till.FIXTURES = [
  {
    id: 0,
    business: 0,
    name: 'Till 1',
    minimum: 0,
    sales: [0,1],
    purchases: [0]
  },
  {
    id: 1,
    business: 1,
    name: 'Till 2',
    minimum: 0,
    sales: [],
    purchases: []
  }
];