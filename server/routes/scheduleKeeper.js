const schedule = require('node-schedule');
const mailer = require('./mailserver.js');
const scheduleKeeper = (time, username) => schedule.scheduleJob(`${time[1]} ${time[0]} * * *`, function () {
  console.log('The answer to life, the universe, and everything!');
  mailer(username).catch(console.error);
});

const scheduler = {
  scheduleKeeper: (time, username) => schedule.scheduleJob(`${time[1]} ${time[0]} * * *`, function () {
    console.log('The answer to life, the universe, and everything!');
    mailer(username).catch(console.error);
  })
}

module.exports = scheduler;