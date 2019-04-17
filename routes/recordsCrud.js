module.exports = {
    getAddRecordPage: (req, res) => {
        res.render('add-record.ejs', {message: ''});
    },
    addRecordToDb: (req, res) => {
        console.log(req.body);
        let id = "null";
        let title = req.body.title;
        let description = req.body.description;
        let price = req.body.price;
        let stock = req.body.stock;

        let query = "INSERT INTO `records` VALUES (?,?,?,?,?);"

        db.query(query, [id, title, description, price, stock], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("Executed " + query)
            res.redirect('/');
        });
    }
};