const fs = require("fs");
const {DateTime} = require("luxon");
const {monthlyTracker} = require("./lib");

let habits = JSON.parse(fs.readFileSync('habits.json'));
let today = DateTime.now()
let html = monthlyTracker(today, habits)

fs.writeFileSync('month.html', html)
console.log(html);
