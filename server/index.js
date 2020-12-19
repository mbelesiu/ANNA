const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let { userTimeTable, startTimeTable } = require('./routes/timetable.js');
const { login } = require('./routes/login.js');
const { getPrompts, updatePrompt } = require('./routes/prompts.js');
const { getRecords, createRecords } = require('./routes/records.js');
const  {getItems, addTo}  = require('./routes/postgresPrompts.js')

const app = express();
const aqlQuery = require('arangojs').aqlQuery;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

userTimeTable = startTimeTable()


/** Login Routes **/
app.get('/api/login/:username', login);

/** Prompts Routes **/
app.get('/api/prompts/:username', getPrompts);
app.post('/api/prompts/create/:username', updatePrompt);
app.put('/api/prompts/update/:username', updatePrompt)


/** Records Routes **/
app.get('/api/records/:username', getRecords);
app.post('/api/records/create/:username', createRecords);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});


