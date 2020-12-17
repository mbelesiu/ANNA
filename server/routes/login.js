// const db = require('../../database'); // arangodb
// const aqlQuery = require('arangojs').aqlQuery;
const db = require('../../postgres'); // postgres

const postgressLoginMethods =
{
  login : (req, res) => {
  const email = req.params.username;
  db.query(`SELECT * FROM users WHERE users.email = '${email}'`)
    .then(( data ) => {
      if (data.rows.length === 0) {
        db.query(`INSERT INTO users (email) VALUES ('${email}')`)
          // .then(() => db.query(`INSERT INTO records (email) VALUES ('${email}')`))
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


// arango methods
// const loginMethods =
// {
//   login : (req, res) => {
//   const username = req.params.username;
//   db.query(aqlQuery`FOR u IN Users FILTER u.email == ${username} RETURN u`)
//     .then(({ _result }) => {
//       if (_result.length === 0) {
//         db.query(aqlQuery`INSERT { email: ${username}, prompts: {} } INTO Users`)
//           .then(() => db.query(aqlQuery`INSERT { email: ${username}, entry: [] } INTO Records`))
//           .then(() => {
//              res.sendStatus(200)
//           })
//           .catch((err) => {
//             console.log(err)
//             res.sendStatus(404)
//           })
//       } else {
//         res.send(_result)
//       }

//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(404)
//     })
// }}