const pug = require("pug");
const page = pug.compileFile('month.pug');

const monthlyTracker = (first, habits) => {
  let daynames = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
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
  let html = page({
    title: title,
    month: month,
    weekdays: weekdays,
    prefix: prefix,
    days: days,
    habits: habits
  });

  return html
}

module.exports = {monthlyTracker}