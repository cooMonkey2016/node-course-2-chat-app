var moment = require('moment');

// var date = new Date();
// var months = ['Jan','Feb'];
// console.log(date.getMonth());
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 1234;
var date = moment(createdAt);
// date.add(1,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm A, MMM Do, YYYY'));