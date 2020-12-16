const db = require('../../postgres/index.js');

const postGresRoutes = {
   getItems: (req, res) => {
    // const { product_id } = req.params;

    db.query(`SELECT * FROM users`)
      .then((data) => { res.send(data.rows) })
      .catch((err) => console.log(err));
  },

   addTo: (req, res) => {
    const {email, prompts} = req.body;
    console.log(email);

    db.query(`INSERT INTO users (email, prompts) VALUES ('${email}', '{${prompts}}')`)
    .then(()=>res.sendStatus(200))
    .catch((err)=>{
      console.log(err);
      res.sendStatus(500);
    })
  }
}


module.exports = postGresRoutes;