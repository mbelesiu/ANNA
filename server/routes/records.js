// const db = require('../../database'); // arangodb
// const aqlQuery = require('arangojs').aqlQuery;
const db = require('../../postgres'); // postgres


const postgresRecordMethods = {
  getRecords: (req, res) => {
    const email = req.params.username
    // db.query(`SELECT * FROM records WHERE records.email = '${email}'`)
    db.query(`SELECT records.record_id, users.email, records.date, users.prompts, records.entry FROM records, users WHERE users.email = records.email AND users.email = '${email}'`)
      .then((data) => {
        // console.log(data.rows[0].entry[0])
        res.send(data.rows)
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404)
      })
  },
  createRecords: (req, res) => {
    const email = req.params.username;
    const date = req.body.date;
    const newEntry = req.body.entry;

    db.query(`INSERT INTO records (email, entry, date) VALUES ('${email}', '{${newEntry}}', '${date}')`)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })
  }
};



module.exports = postgresRecordMethods;

// const recordMethods = {
//   getRecords: (req, res) => {
//     const username = req.params.username
//     db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} RETURN u`)
//       .then(({ _result }) => res.send(_result))
//       .catch((err) => {
//         console.log(err);
//         res.sendStatus(404)
//       })
//   },
//   createRecords: (req, res) => {
//     const username = req.params.username;
//     const newEntry = req.body;

//     db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} RETURN u`)
//       .then(({ _result }) => {
//         const currentEntries = _result[0].entry
//         console.log(currentEntries);
//         newEntry['id'] = currentEntries.length + 1;
//         currentEntries.push(newEntry);
//         db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} UPDATE u WITH {entry: ${currentEntries}} IN Records RETURN u`)
//           .then(() => res.sendStatus(200))
//       })
//       .catch((err) => {
//         console.log(err)
//         res.sendStatus(404);
//       })
//   }
// };