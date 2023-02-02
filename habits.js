const fs = require("fs");
const clap = require('clap');
const {DateTime} = require("luxon");
const {monthlyTracker} = require("./lib");

let cli = clap.command('habits <year> <month>')
  .description('Generate monthly tracker')
  .action(({_, args}) => {
    let today = DateTime.local(parseInt(args[0]), parseInt(args[1]), 1, 0, 0)
    console.log('args', args, today.toISODate());

    let goals = JSON.parse(fs.readFileSync('goals.json'));
    let html = monthlyTracker(today, goals)

    fs.writeFileSync('month.html', html)
    // console.log(html);
  })
cli.run()

