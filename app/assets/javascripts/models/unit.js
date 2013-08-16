App.Unit = DS.Model.extend({
  name: DS.attr('string'),
  sku: DS.attr('string'),
  price: DS.attr('number'),
  taxable: DS.attr('boolean')
});

App.Unit.FIXTURES = [
  {
    id: 0,
    sku: '1234',
    price: 1234,
    name: 'Unit 1',
    taxable: true,
  },
  {
    id: 1,
    sku: '2345',
    price: 2345,
    name: 'Unit 2',
    taxable: false
  }
];