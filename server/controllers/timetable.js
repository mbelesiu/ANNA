const db = require('../../database');
const aqlQuery = require('arangojs').aqlQuery;
const scheduleKeeper = require('./scheduleKeeper.js')


const timeTable = {
  userTimeTable: {},
  startTimeTable: () => {
    const tempTable = {}
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
            tempTable[savedUser.email] = scheduleKeeper(time, savedUser.email);
          }
          return tempTable;
        });
      })
      .catch((err) => console.log(err))
  },
  updateTimeTable: (time, username)=>{
    userTimeTable[username] = scheduleKeeper(time, username);
  }
}

module.exports = timeTable;