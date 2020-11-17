const db = require('../../database');
const aqlQuery = require('arangojs').aqlQuery;
const session = require('express-session');
const https = require('https')

const loginMethods =
{
  login : (req, res) => {
  const username = req.params.username;
  db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} RETURN u`)
    .then(({ _result }) => {
      if (_result.length === 0) {
        db.query(aqlQuery`INSERT { email: ${username}, prompts: {} } INTO Users`)
          .then(() => db.query(aqlQuery`INSERT { email: ${username}, entry: [] } INTO Records`))
          .then(() => {
            if (req.session.page_views) {
              req.session.page_views++;
              console.log("You visited this page " + req.session.page_views + " times");
            } else {
              req.session.page_views = 1;
              console.log("Welcome to this page for the first time!");
            }
             res.sendStatus(200)
          })
          .catch((err) => {
            console.log(err)
            res.sendStatus(404)
          })
      } else {
        if (req.session.page_views) {
          req.session.page_views++;
          console.log("You visited this page " + req.session.page_views + " times");
        } else {
          req.session.page_views = 1;
          console.log("Welcome to this page for the first time!");
        }
        res.send(_result)
      }

    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    })
}}





module.exports = loginMethods;