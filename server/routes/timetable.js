const db = require('../../database/postgres'); // postgres
const scheduleKeeper = require('./scheduleKeeper.js')


const postgressTimeTable = {
  userTimeTable: {},
  startTimeTable: () => {
    const tempTable = {}
    db.query('SELECT email, eod FROM users')
      .then((data) => {
        data.rows.forEach((savedUser) => {
          if (!savedUser.eod) {
            db.query(`DELETE FROM users WHERE email = '${savedUser.email}'`)
              .then(() => {
                db.query(`DELETE FROM records WHERE email = '${savedUser.email}'`)
                  .then(() => console.log('delete incomplete data from Records'))
              })
              .then(() => console.log('delete incomplete data from User'))
          } else {
            const time = savedUser.eod.split(':');
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

module.exports = postgressTimeTable;
