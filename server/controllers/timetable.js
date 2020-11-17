const db = require('../../database');
const aqlQuery = require('arangojs').aqlQuery;
const schedule = require('node-schedule');
const mailer = require('./mailserver.js');
const userTimeTable = {}

const scheduleKeeper = (time, username) => schedule.scheduleJob(`${time[1]} ${time[0]} * * *`, function () {
  console.log('The answer to life, the universe, and everything!');
  mailer(username).catch(console.error);
});


const startTimeTable = () => {
  db.query('FOR u IN Users RETURN { email: u.email, EOD: u.prompts.EOD }')
  .then(({ _result }) => {
    _result.forEach((savedUser) => {
      if (!savedUser.EOD) {
        db.query(aqlQuery`FOR u in Users FILTER u.email == ${savedUser.email} REMOVE u IN Users`)
          .then(() => {
            db.query(aqlQuery`FOR u in Records FILTER u.email == ${savedUser.email} REMOVE u IN Records`)
              .then(() => console.log('delete incomplete data from Records'))
          })
          .then(() => console.log('delete incomplete data from User'))
      } else {
        const time = savedUser.EOD.split(':');
        userTimeTable[savedUser.email] = scheduleKeeper(time, savedUser.email);
      }

    });
    return userTimeTable;
  })
  .catch((err) => console.log(err))
};

module.exports = startTimeTable;