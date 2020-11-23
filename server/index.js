const express = require('express');
const session = require('express-session');
// const https = require('https')

const bodyParser = require('body-parser');
const path = require('path');
let { userTimeTable, startTimeTable } = require('./controllers/timetable.js')
const { login } = require('./controllers/login.js')
const { createPrompts, getPrompts, updatePrompt } = require('./controllers/prompts.js')
const { getRecords, createRecords } = require('./controllers/records.js')


const app = express();
const aqlQuery = require('arangojs').aqlQuery;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(session({ secret: "Shh, its a secret!" }));

userTimeTable = startTimeTable()




//a not so great login, but suitable for MVP
app.get('/api/login/:username', login);

/*Prompts Routes */
app.get('/api/prompts/:username', getPrompts);
app.post('/api/prompts/create/:username', createPrompts);
app.put('/api/prompts/update/:username', updatePrompt)


/**Records Routes **/
app.get('/api/records/:username', getRecords);
app.post('/api/records/create/:username', createRecords);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
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