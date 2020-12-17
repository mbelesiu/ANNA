const db = require('../../postgres'); // postgres

const postgressLoginMethods =
{
  login : (req, res) => {
  const email = req.params.username;
  db.query(`SELECT * FROM users WHERE users.email = '${email}'`)
    .then(( data ) => {
      if (data.rows.length === 0) {
        db.query(`INSERT INTO users (email) VALUES ('${email}')`)
          .then(() => {
             res.sendStatus(200)
          })
          .catch((err) => {
            console.log(err)
            res.sendStatus(404)
          })
      } else {
        res.send(data.rows)
      }

    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    })
}}



module.exports = postgressLoginMethods;
