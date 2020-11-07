const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
const path = require('path');
const schedule = require('node-schedule');
const mailer = require('./mailserver.js');

const app = express();
const aqlQuery = require('arangojs').aqlQuery;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));


const userTimeTable = {}
const scheduleKeeper = (time, username) => schedule.scheduleJob(`${time[1]} ${time[0]} * * *`, function () {
  console.log('The answer to life, the universe, and everything!');
  mailer(username).catch(console.error);
});

//initlization of timetables

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
    //console.log(userTimeTable)
  })
  .catch((err) => console.log(err))

app.post('/api/prompts/create/:username', (req, res) => {
  const username = req.params.username
  const prompts = req.body;
  //  console.log(prompts)
  db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} UPDATE u WITH {prompts: ${prompts}} IN Users RETURN u`)
    .then(() => {
      const time = prompts.EOD.split(':')
      //  console.log(time);
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

});

//a not so great login, but suitable for MVP
app.get('/api/login/:username', (req, res) => {
  const username = req.params.username
  db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} RETURN u`)
    .then(({ _result }) => {
      if (_result.length === 0) {
        db.query(aqlQuery`INSERT { email: ${username}, prompts: {} } INTO Users`)
          .then(() => db.query(aqlQuery`INSERT { email: ${username}, entry: [] } INTO Records`))
          .then(() => res.sendStatus(200))
          .catch((err) => {
            console.log(err)
            res.sendStatus(404)
          })
      } else {
        res.send(_result)
      }

    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    })

});

app.get('/api/prompts/:username', (req, res) => {
  const username = req.params.username
  db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} RETURN u`)
    .then(({ _result }) => {
      res.send(_result);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    })
})

/**Records API **/
app.get('/api/records/:username', (req, res) => {
  const username = req.params.username
  db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} RETURN u`)
    .then(({ _result }) => res.send(_result))
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    })
});


app.post('/api/records/create/:username', (req, res) => {
  const username = req.params.username;
  const newEntry = req.body;

  db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} RETURN u`)
    .then(({ _result }) => {
      const currentEntries = _result[0].entry
      console.log(currentEntries);
      newEntry['id'] = currentEntries.length + 1;
      currentEntries.push(newEntry);
      db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} UPDATE u WITH {entry: ${currentEntries}} IN Records RETURN u`)
        .then(() => res.sendStatus(200))
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(404);
    })
});

// app.post('/api/login/create', (req, res) => {
//   console.log(req.body);
//   res.sendStatus(200);
// })

// signup/login routes - Not MVP
//TO DO LATER
// app.get('/signup',(req, res)=>{
//   res.render('signup');
// });
// app.post('/signup',(req, res)=>{

// });

// // app.get('/login',(req, res)=>{

// // });
// app.post('/login',(req, res)=>{

// });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});