const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

app.post('/api/prompts/create', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
})

//a not so great login, but suitable for MVP
app.get('/api/login/:username', (req, res) => {
  console.log(req.params.username);
  res.sendStatus(200);
})

app.post('/api/login/create', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
})

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