// const dotenv = require('dotenv');
const express = require('express');
// const { auth } = require('express-openid-connect');
// const { requiresAuth } = require('express-openid-connect');
// const configAuthO = require('./configs/configAuthO.js')
const bodyParser = require('body-parser');
const path = require('path');

let { userTimeTable, startTimeTable } = require('./routes/timetable.js');
const { login } = require('./routes/login.js');
const { getPrompts, updatePrompt } = require('./routes/prompts.js');
const { getRecords, createRecords } = require('./routes/records.js');
const  {getItems, addTo}  = require('./routes/postgresPrompts.js')


// dotenv.load();

const app = express();
const aqlQuery = require('arangojs').aqlQuery;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));
// app.use(auth(configAuthO));
// Middleware to make the `user` object available for all views
// app.use(function (req, res, next) {
//   res.locals.user = req.oidc.user;
//   // console.log(res.locals.user)
//   next();
// });


userTimeTable = startTimeTable()

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   console.log('yo2')
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/profile', requiresAuth(), (req, res) => {
//   // console.log('yo3')
//   res.send(JSON.stringify(req.oidc.user));
// });

//postgres api test route
app.get('/api/test', getItems);
app.post('/api/test', addTo);

//a not so great login, but suitable for MVP
app.get('/api/login/:username', login);

/*Prompts Routes */
app.get('/api/prompts/:username', getPrompts);
app.post('/api/prompts/create/:username', updatePrompt);
app.put('/api/prompts/update/:username', updatePrompt)


/**Records Routes **/
app.get('/api/records/:username', getRecords);
app.post('/api/records/create/:username', createRecords);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});


