const db = require('../../postgres'); // postgres

const postgresRecordMethods = {
  getRecords: (req, res) => {
    const email = req.params.username
    db.query(`SELECT records.record_id, users.email, records.date, users.prompts, records.entry FROM records, users WHERE users.email = records.email AND users.email = '${email}'`)
      .then((data) => {
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
