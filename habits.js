const pug = require('pug');
const fs = require("fs");
const {DateTime} = require("luxon");

const page = pug.compileFile('month.pug');

let today = DateTime.now()
let first = DateTime.now().minus({days: today.day - 1})

let daynames = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
let weekdays = Array()

console.log(first.toISODate(), first.weekday)
let prefix = Array()
for (let i = 0; i < first.weekday - 1; i++) {
  prefix.push(-i)
  weekdays.push(daynames[i])
}

let days = Array()
for (let i = 0; i < first.daysInMonth; i++) {
  days.push(i + 1)
  weekdays.push(daynames[(first.weekday - 1 + i) % 7])
}

let habits = ['Pushups', 'Kanji'];

let html = page({
  weekdays: weekdays,
  prefix: prefix,
  days: days,
  habits: habits
});

fs.writeFileSync('month.html', html)
console.log(html);
