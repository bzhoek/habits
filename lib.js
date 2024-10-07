const pug = require("pug");
const path = require("path");
const page = pug.compileFile('month.pug');

const monthlyTracker = (first, goals) => {
  let daynames = ['月', '火', '水', '木', '金', '土', '日']
  let weekdays = Array()

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

  let months = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '一十', '二十'];
  let title = `${months[first.month]}月`;
  let month = first.toLocaleString({month: 'long'});

  return page({
    title: title,
    month: month,
    weekdays: weekdays,
    prefix: prefix,
    days: days,
    goals: goals
  });
}

const expandTilde = filepath => {
  if (filepath[0] === '~') {
    return path.join(process.env.HOME, filepath.slice(1));
  }
  return filepath;
};

module.exports = {expandTilde, monthlyTracker}