#!/usr/bin/env node
const fs = require("fs");
const clap = require('clap');
const {DateTime} = require("luxon");
const {monthlyTracker} = require("./lib");

let cli = clap.command('habits <goals> <year> <month>')
  .description('Generate monthly habit tracker')
  .action(({_, args}) => {
    let year = args[1]
    let month = args[2]
    let today = DateTime.local(parseInt(year), parseInt(month), 1, 0, 0)

    let goals = JSON.parse(fs.readFileSync(args[0]));
    let html = monthlyTracker(today, goals)
    let outfile = `month-${year}.${month}.html`
    fs.writeFileSync(outfile, html)
    console.log(`Wrote ${outfile}`)
  })
cli.run()

