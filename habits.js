#!/usr/bin/env node
const fs = require("fs");
const clap = require('clap');
const {DateTime} = require("luxon");
const {monthlyTracker} = require("./lib");

let cli = clap.command('habits <goals> <year> <month>')
  .description('Generate monthly tracker')
  .action(({_, args}) => {
    let today = DateTime.local(parseInt(args[1]), parseInt(args[2]), 1, 0, 0)
    console.log('args', args, today.toISODate());

    let goals = JSON.parse(fs.readFileSync(args[0]));
    let html = monthlyTracker(today, goals)

    fs.writeFileSync('month.html', html)
    // console.log(html);
  })
cli.run()

