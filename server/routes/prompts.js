const db = require('../../database/postgres'); // postgres
const _ = require('underscore');
const scheduleKeeper = require('./scheduleKeeper.js');
let { userTimeTable } = require('./timetable.js');

const postgresPromptMethods = {

  getPrompts: (req, res) => {
    const email = req.params.username
    db.query(`SELECT * FROM users WHERE users.email = '${email}'`)
      .then((data) => {
        for(let i = 0; i < data.rows.length; i++){
          for ( let j = 0; j < data.rows[i].prompts.length; j++){
            data.rows[i].prompts[j] = _.unescape(data.rows[i].prompts[j]);
          }
        }

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

    for(let i = 0; i < prompts.length; i++){
      prompts[i] = _.escape(prompts[i]);
    }

    db.query(`UPDATE users SET prompts =  '{${prompts}}' , eod = '${eod}' WHERE users.email = '${email}'`)
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
