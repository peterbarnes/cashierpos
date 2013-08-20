// App.Store = DS.Store.extend({
//   revision: 13,
//   adapter: DS.FixtureAdapter.create({
//     queryFixtures: function(fixtures, query, type) {
//       return fixtures.filter(function(item) {
//         for(prop in query) {
//           if(item[prop] != query[prop]) {
//             return false;
//           }
//         }
//         return true;
//       });
//     }
//   })
// });