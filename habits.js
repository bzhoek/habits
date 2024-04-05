#!/usr/bin/env node
const fs = require("fs");
const {DateTime} = require("luxon");
const {monthlyTracker} = require("./lib");
const {Command} = require('commander');

let cmd = new Command()
  .description('Generate monthly habit tracker')
  .argument('<goals>', 'path to JSON file with goals')
  .argument('<year>', 'year for month')
  .argument('<month>', 'month in year')
  .action((json, year, month) => {
      let today = DateTime.local(parseInt(year), parseInt(month), 1, 0, 0)

      let goals = JSON.parse(fs.readFileSync(json));
      let html = monthlyTracker(today, goals)
      let outfile = `month-${year}.${month}.html`
      fs.writeFileSync(outfile, html)
      console.log(`Wrote ${outfile}`)
  });
cmd.parse();
