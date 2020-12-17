const db = require('../../postgres'); // postgres
const scheduleKeeper = require('./scheduleKeeper.js');
let { userTimeTable } = require('./timetable.js');

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
    const prompts = req.body.prompts;
    const eod= req.body.eod;

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




module.exports = postgresPromptMethods;
