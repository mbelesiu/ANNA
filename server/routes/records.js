const db = require('../../postgres'); // postgres
const _ = require('underscore');


const postgresRecordMethods = {
  getRecords: (req, res) => {
    const email = req.params.username
    db.query(`SELECT records.record_id, users.email, records.date, users.prompts, records.entry FROM records, users WHERE users.email = records.email AND users.email = '${email}'`)
      .then((data) => {

        for(let i = 0; i < data.rows.length; i++){
          // console.log(data.rows[i])
          for ( let j = 0; j < data.rows[i].entry.length; j++){
            data.rows[i].entry[j] = decodeURIComponent(data.rows[i].entry[j])
            data.rows[i].entry[j] = _.unescape(data.rows[i].entry[j]);
            data.rows[i].prompts[j] = decodeURIComponent(data.rows[i].prompts[j])
            data.rows[i].prompts[j] = _.unescape(data.rows[i].prompts[j]);

            // console.log(data.rows[i].entry[j])
          }
        }
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
    // console.log(newEntry)
    // console.log('----------')
    for(let i = 0; i < newEntry.length; i++){
      newEntry[i] = _.escape(newEntry[i]);
      newEntry[i] = encodeURIComponent(newEntry[i]);
    }
    // console.log(newEntry)
    db.query(`INSERT INTO records (email, entry, date) VALUES ('${email}',  $$ {${newEntry}} $$ , '${date}')`)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })
  }
};



module.exports = postgresRecordMethods;
