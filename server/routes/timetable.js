// const db = require('../../database');
// const aqlQuery = require('arangojs').aqlQuery;
const db = require('../../postgres'); // postgres
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


// const timeTable = {
//   userTimeTable: {},
//   startTimeTable: () => {
//     const tempTable = {}
//     db.query('FOR u IN Users RETURN { email: u.email, EOD: u.prompts.EOD }')
//       .then(({ _result }) => {
//         _result.forEach((savedUser) => {
//           if (!savedUser.EOD) {
//             db.query(aqlQuery`FOR u in Users FILTER u.email == ${savedUser.email} REMOVE u IN Users`)
//               .then(() => {
//                 db.query(aqlQuery`FOR u in Records FILTER u.email == ${savedUser.email} REMOVE u IN Records`)
//                   .then(() => console.log('delete incomplete data from Records'))
//               })
//               .then(() => console.log('delete incomplete data from User'))
//           } else {
//             const time = savedUser.EOD.split(':');
//             tempTable[savedUser.email] = scheduleKeeper(time, savedUser.email);
//           }
//           return tempTable;
//         });
//       })
//       .catch((err) => console.log(err))
//   },
//   updateTimeTable: (time, username)=>{
//     userTimeTable[username] = scheduleKeeper(time, username);
//   }
// }