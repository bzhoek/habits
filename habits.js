const fs = require("fs");
const clap = require('clap');
const {DateTime} = require("luxon");
const {monthlyTracker} = require("./lib");

let cli = clap.command('habits <year> <month>')
  .description('Generate monthly tracker')
  .action(({_, args}) => {
    let today = DateTime.local(parseInt(args[0]), parseInt(args[1]), 1, 0, 0)
    console.log(args, today.toISODate());

    let habits = JSON.parse(fs.readFileSync('habits.json'));
    let html = monthlyTracker(today, habits)

    fs.writeFileSync('month.html', html)
    // console.log(html);
  })
cli.run()

