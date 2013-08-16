App.Business = DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  taxRate: DS.attr('number'),
  imageUrl: DS.attr('string'),
  tills: DS.hasMany('App.Till')
});

App.Business.FIXTURES = [
  {
    id: 0,
    name: 'Business 1',
    description: 'Lorem Ipsum...',
    taxRate: 0.07,
    imageUrl: '',
    tills: [0]
  },
  {
    id: 1,
    name: 'Business 2',
    description: 'Lorem Ipsum...',
    taxRate: 0.06,
    imageUrl: '',
    tills: [1]
  }
];