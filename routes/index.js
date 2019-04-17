module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `records` ORDER BY id ASC";
    db.query(query, (err, result) => {
        console.log("Executed - SELECT * FROM `records` ORDER BY id ASC")
        if (err) {
          res.redirect('/');
          console.log(err);
        }
        res.render('index.ejs', {records: result});
    });
  }
};
