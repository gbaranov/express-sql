module.exports = {
  getHomePage: (req, res) => {

    let queries = ["SELECT * FROM `records`", "SELECT * FROM `customers`"];

    function mergeData(result) {
      res.render('index.ejs', {records: result});
    };

    db.query(queries.join(';'), (err, result) => {
      console.log("Executed " + queries)
      if (err) {
        res.redirect('/');
        console.log(err);
      }
      res.render('index.ejs', {records: result[0], customers: result[1]});
    });  

  }
};
