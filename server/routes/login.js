const db = require('../../database');
const aqlQuery = require('arangojs').aqlQuery;

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
             res.sendStatus(200)
          })
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
}}





module.exports = loginMethods;