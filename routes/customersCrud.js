module.exports = {
    getAddCustomerPage: (req, res) => {
        res.render('add-customer.ejs', {title: 'Add customer'});
    },

    addCustomerDb: (req, res) => {
       let id = "null";
       let fname = req.body.fname;
       let lname = req.body.lname;
       let age = req.body.age;

       let query = "INSERT INTO `customers` VALUES (?,?,?,?);"

       db.query(query, [id, fname, lname, age], (err, result) => {
           if (err) {
               console.log(err);
               return res.status(500).send(err);
           }
           console.log("Executed " + query)
           res.redirect('/');
       });
    },

    getEditCustomerPage: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `customers` WHERE id = ?;";
        db.query(query, [id], (err, result) => {
            console.log("Executed " + query)
            if (err) {
              res.redirect('/');
              console.log(err);
            }
            res.render('edit-customer.ejs', {customers: result[0]});
        });
    },

    editCustomerDb: (req, res) => {
        let id = req.params.id;
        let fname = req.body.fname;
        let lname = req.body.lname;
        let age = req.body.age;

        let query = "UPDATE `customers` SET fname = ?, lname = ?, age = ? WHERE id = ?;"

        db.query(query, [fname, lname, age, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("Executed " + query)
            res.redirect('/');
        });
    },

    deleteCustomerDb: (req, res) => {
        let id = req.params.id;

        let query = "DELETE FROM `customers` WHERE id = ?;"

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