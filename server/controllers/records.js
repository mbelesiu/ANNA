const db = require('../../database');
const aqlQuery = require('arangojs').aqlQuery;

const recordMethods = {
  getRecords : (req, res) => {
    const username = req.params.username
    db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} RETURN u`)
      .then(({ _result }) => res.send(_result))
      .catch((err) => {
        console.log(err);
        res.sendStatus(404)
      })
  },
  createRecords : (req, res) => {
    const username = req.params.username;
    const newEntry = req.body;

    db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} RETURN u`)
      .then(({ _result }) => {
        const currentEntries = _result[0].entry
        console.log(currentEntries);
        newEntry['id'] = currentEntries.length + 1;
        currentEntries.push(newEntry);
        db.query(aqlQuery`FOR u IN Records FILTER u.email == ${username} UPDATE u WITH {entry: ${currentEntries}} IN Records RETURN u`)
          .then(() => res.sendStatus(200))
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })
  }
}



module.exports = recordMethods;