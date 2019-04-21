module.exports = {
    getAddRecordPage: (req, res) => {
        res.render('add-record.ejs', {title: 'Add record'});
    },

    addRecordDb: (req, res) => {
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
    },

    getEditRecordPage: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `records` WHERE id = ?;";
        db.query(query, [id], (err, result) => {
            console.log("Executed " + query)
            if (err) {
              res.redirect('/');
              console.log(err);
            }
            res.render('edit-record.ejs', {records: result[0]});
        });
    },

    editRecordDb: (req, res) => {
        let id = req.params.id;
        let title = req.body.title;
        let description = req.body.description;
        let price = req.body.price;
        let stock = req.body.stock;

        let query = "UPDATE `records` SET title = ?, description = ?, price = ?, stock = ? WHERE id = ?;"

        db.query(query, [title, description, price, stock, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("Executed " + query)
            res.redirect('/');
        });
    },

    deleteRecordDb: (req, res) => {
        let id = req.params.id;

        let query = "DELETE FROM `records` WHERE id = ?;"

        db.query(query, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("Executed " + query)
            res.redirect('/');
        });
    }

};