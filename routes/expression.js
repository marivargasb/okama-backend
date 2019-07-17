const Expression = require('../models/expressionModel'); // Import User Model Schema/const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
//const hbs = require('nodemailer-express-handlebars');
//const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Culture = require('../models/cultureModel');
const CultureExpression = require('../models/tables/culture-expressionModel');


module.exports = (router) => {


    /* ========
    Register ROUTE
    ======== */
    router.post('/addExpression/:culture', (req, res) => {

        if ((req.body.name || req.body.description || req.body.link || req.body.categorie || req.params.idCulture) === '') {
            res.json({ success: false, message: "todos los datos deben estar completos" });
            console.log("no estan completos"); // Return error
        }
        else {

            var expression = new Expression();
            var ce = new CultureExpression();
            req.param.id
            expression.name = req.body.name;
            expression.description = req.body.description;
            expression.link = req.body.link;
            expression.categorie = req.body.categorie;

            expression.save(function (err, result) {
                if (err) {
                    res.json({ success: false, message: err }); // Return error
                    console.log("error registrando");
                }
                else {
                        ce.expressions = result._id;
                    ce.cultures = req.params.culture;
                    ce.save(function (error) {
                        if (error) {
                            res.json({ success: false, message: error }); // Return error
                            console.log(" Error registrando tabla intermedia");
                        }
                        else {
                            res.json({ success: true, message: "Registrado Exitosamente" }); // Return success and token to frontend
                            console.log(" registrando en tabla intermedia");
                        }

                    

                    });
      

                }
            });
        }


    });



    /* ========
  edit ROUTE
  ======== */

    router.put('/editExpression/:id', (req, res) => {
        var expression = new Expression();

        if ((req.params.id) == null) {
            //   res.status(422);
            res.json({ success: false, message: 'vacio' });
        }
        var ma = {

            name: req.body.name,
            description: req.body.description,
            link: req.body.link,
            categorie: req.body.categorie,

        };
        Expression.findByIdAndUpdate(req.params.id, { $set: ma }, { new: true }, (err, expression) => {

            if (err) {
                res.json({ success: false, message: err }); // Return error
                console.log("error");
            }
            else {

                res.json({ success: true, expression }); // Return success and token to frontend
                console.log("expressionssss" + expression);
            }


        });
    });

    router.get('/fineExpression/:id', (req, res) => {
        var expression = new Expression();
        var culture = new Culture();
        if ((req.params.id) == null) {
            //   res.status(422);
            res.json({ success: false, message: 'empy' });
        }

        Expression.findOne({ _id: req.params.id.toLowerCase() }, (err, expression) => {

            if (err) {
                // res.status(422);
                // res.json({success: false, message: 'no encontrado' } );
                res.json({ success: false, message: err }); // Return error
                console.log("error");
            }

            //res.json({ success: true, message: 'Success!'});
            res.json({ success: true, expression }); // Return success and token to frontend
            console.log(expression);

        })

    });

    router.delete('/deleteExpression/:id', (req, res) => {

        var expression = new Expression();
        console.log("eliminando");
        Expression.findByIdAndRemove(req.params.id, (err, expression) => {
            if (err) {
                res.json({ success: false, message: err }); // Return error
                console.log("error al eliminar su cuenta");
            }
            else {
                console.log("DELETE EXPRESSION");
                res.json({ success: true }); // Return success and token to frontend

            }
        });
    });

    /*
    router.get('/finesExpression',(request, response) => {
       var expression = new Expression();
     //   var culture = new Culture();
   
        Expression.find({ function (err, expression) {

            if (err) {
                // res.status(422);
                // res.json({success: false, message: 'no encontrado' } );
                res.json({ success: false, message: err }); // Return error
                console.log("error");
            }

            //res.json({ success: true, message: 'Success!'});
            response.json({ success: true, expression }); // Return success and token to frontend
            console.log(expression);

        });

    });
*/
    router.get('/finesExpression', function (req, res) {


        Expression.find({}, function (err, expression) {
            Culture.populate(expression, { path: "cultures" }, function (err, expression) {
                res.status(200).send(expression);
            });
        });
    });

    router.get('/finesOneExpression/:id/:cultures', function (req, res) {

        if ((req.params.id) == null) {
            //   res.status(422);
            res.json({ success: false, message: 'vasio' });
        }
        Expression.findOne({ _id: req.params.id.toLowerCase(), cultures: req.params.cultures.toLowerCase() }, function (err, expression) {
            Culture.populate(expression, { path: "cultures" }, function (err, expression) {
                res.status(200).send(expression);
            });
        });
    });


    return router;

}