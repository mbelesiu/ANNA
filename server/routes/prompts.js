// const db = require('../../database'); // arangodb
// const aqlQuery = require('arangojs').aqlQuery;
const db = require('../../postgres'); // postgres
const scheduleKeeper = require('./scheduleKeeper.js');
let { userTimeTable } = require('./timetable.js');

// const promptMethods = {
//   createPrompts: (req, res) => {
//     const username = req.params.username
//     const prompts = req.body;
//     db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} UPDATE u WITH {prompts: ${prompts}} IN Users RETURN u`)
//       .then((u) => {
//         const time = prompts.EOD.split(':')
//         if (userTimeTable[username]) {
//           userTimeTable[username].cancel();
//         }
//         userTimeTable[username] = scheduleKeeper(time, username);
//         res.sendStatus(200);
//       })
//       .catch((err) => {
//         console.log(err)
//         res.sendStatus(404);
//       })

//   },
//   getPrompts: (req, res) => {
//     const username = req.params.username
//     db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} RETURN u`)
//       .then(({ _result }) => {
//         res.send(_result);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.sendStatus(404)
//       })
//   },
//   updatePrompt: (req, res) => {
//     const username = req.params.username
//     const prompts = req.body;
//     db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} UPDATE u WITH {prompts: ${prompts}} IN Users RETURN u`)
//       .then((u) => {
//         const time = prompts.EOD.split(':')
//         if (userTimeTable[username]) {
//           userTimeTable[username].cancel();
//         }
//         userTimeTable[username] = scheduleKeeper(time, username);
//         res.sendStatus(200);
//       })
//       .catch((err) => {
//         console.log(err)
//         res.sendStatus(404);
//       })

//   }
// }

const postgresPromptMethods = {

  getPrompts: (req, res) => {
    const email = req.params.username
    db.query(`SELECT * FROM users WHERE users.email = '${email}'`)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404)
      })
  },
  updatePrompt: (req, res) => {
    const email = req.params.username
    const prompts = [];
    let eod;
    for (i in req.body) {
      if (i === 'EOD') {
        eod = req.body[i]
      } else {
        prompts.push(req.body[i])
      }
    }

    db.query(`UPDATE users SET prompts = '{${prompts}}', eod = '${eod}' WHERE users.email = '${email}'`)
      .then(() => {
        const time = eod.split(':')
        if (userTimeTable[email]) {
          userTimeTable[email].cancel();
        }
        userTimeTable[email] = scheduleKeeper(time, email);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })

  }
}




module.exports = postgresPromptMethods