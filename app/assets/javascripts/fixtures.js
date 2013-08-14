// Fixtures

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

App.Purchase.FIXTURES = [
  {
    id: 0,
    sku: "BFC94FA0-D0BC-0130-AD33-109ADD6B83AAA",
    complete: false,
    pdfUrl: "http://www.example.com/example.pdf",
    cash: 10,
    storeCredit: 0,
    customer: 0,
    till: 0,
    user: 0,
    lines: [4]
  }
];

App.Line.FIXTURES = [
  {
    id: 0,
    sale: 0,
    amount: 1000,
    quantity: 2,
    note: "",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    id: 1,
    sale: 0,
    amount: 100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    id: 2,
    sale: 1,
    amount: 1000,
    quantity: 2,
    note: "Lorem Ipsum...",
    sku: "EWET3235",
    taxable: true,
    title: "Line 1"
  },
  {
    id: 3,
    sale: 1,
    amount: 100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: true,
    title: "Line 2"
  },
  {
    id: 4,
    purchase: 0,
    amount: -100,
    quantity: 1,
    note: "Lorem Ipsum...",
    sku: "EWE34235",
    taxable: false,
    title: "Line 2"
  }
];

App.Payment.FIXTURES = [
  {
    id: 0,
    sale: 0,
    cash: 1000,
    credit: 400,
    check: 10,
    giftCard: 100,
    storeCredit: 200
  },
  {
    id: 1,
    sale: 1,
    cash: 1000,
    credit: 400,
    check: 10,
    giftCard: 100,
    storeCredit: 200
  }
];

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

App.Customer.FIXTURES = [
  {
    id: 0,
    firstName: "Joe",
    lastName: "Customer",
    email: 'example@example.com',
    organization: 'Acme Inc.',
    sku: 'BFC94FA0',
    notes: 'Lorem Ipsum...',
    credit: 10000,
    dateOfBirth: '',
    imageUrl: '',
    purchases: [0],
    sales: [0,1]
  },
  {
    id: 1,
    firstName: "Joe 2",
    lastName: "Customer 2",
    email: 'example2@example.com',
    organization: 'Acme Inc.',
    sku: 'BFC94RE0',
    notes: 'Lorem Ipsum...',
    credit: 7655,
    dateOfBirth: '',
    imageUrl: '',
    purchases: [],
    sales: []
  }
];

App.User.FIXTURES = [
  {
    id: 0,
    active: true,
    administrator: true,
    firstName: 'Bob',
    lastName: 'User',
    email: 'example@example.com',
    username: 'example',
    pin: '0000',
    sales: [0,1],
    purchases: [0]
  },
  {
    id: 1,
    active: true,
    administrator: false,
    firstName: 'Bob2',
    lastName: 'User2',
    email: 'example2@example.com',
    username: 'example2',
    pin: '1111',
    sales: [],
    purchases: []
  }
];

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