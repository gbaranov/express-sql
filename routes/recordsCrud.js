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
        res.render('edit-record.js', {} , {title: 'Edit record'});
    },

    editRecordDb: (req, res) => {
        let id = req.body.id;
        let title = req.body.title;
        let description = req.body.description;
        let price = req.body.price;
        let stock = req.body.stock;

        let query = "UPDATE `RECORDS` SET title = ?, description = ?, price = ?, stock = ? WHERE id = ?;"

        db.query(query, [title, description, price, stock, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("Executed " + query)
            res.redirect('/');
        });
    } 

};