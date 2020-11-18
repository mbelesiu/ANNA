const db = require('../../database');
const aqlQuery = require('arangojs').aqlQuery;
const scheduleKeeper = require('./scheduleKeeper.js');
let { userTimeTable } = require('./timetable.js');

const promptMethods = {
  createPrompts: (req, res) => {
    const username = req.params.username
    const prompts = req.body;
    db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} UPDATE u WITH {prompts: ${prompts}} IN Users RETURN u`)
      .then((u) => {
        const time = prompts.EOD.split(':')
        if (userTimeTable[username]) {
          userTimeTable[username].cancel();
        }
        userTimeTable[username] = scheduleKeeper(time, username);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })

  },
  getPrompts: (req, res) => {
    const username = req.params.username
    db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} RETURN u`)
      .then(({ _result }) => {
        res.send(_result);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404)
      })
  },
  updatePrompt: (req, res) => {
    const username = req.params.username
    const prompts = req.body;
    db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} UPDATE u WITH {prompts: ${prompts}} IN Users RETURN u`)
      .then((u) => {
        const time = prompts.EOD.split(':')
        if (userTimeTable[username]) {
          userTimeTable[username].cancel();
        }
        userTimeTable[username] = scheduleKeeper(time, username);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })

  }
}




module.exports = promptMethods