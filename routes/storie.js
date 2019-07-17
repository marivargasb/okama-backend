const Storie = require('../models/storieModel'); // Import User Model Schema/const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
//const hbs = require('nodemailer-express-handlebars');
//const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Culture = require('../models/cultureModel');
const CultureStorie = require('../models/tables/culture-storieModel');


module.exports = (router) => {


    /* ========
    Register ROUTE
    ======== */
    router.post('/addStorie/:culture', (req, res) => {

        if ((req.body.name || req.body.description || req.body.type || req.body.categorie || req.params.culture) === '') {
            res.json({ success: false, message: "todos los datos deben estar completos" });
            console.log("no estan completos"); // Return error
        }
        else {

         var storie = new Storie();
           var cs = new CultureStorie();
            req.param.id
            storie.name = req.body.name;
            storie.description = req.body.description;
            storie.type = req.body.type;
            storie.categorie = req.body.categorie;

            storie.save(function (err, result) {
                if (err) {
                    res.json({ success: false, message: err }); // Return error
                    console.log("error registrando");
                }
                else {   
    
                cs.stories = result._id;
                cs.cultures = req.params.culture;
                cs.save(function (error) {
                        if (error) {
                            res.json({ success: false, message: error }); // Return error
                            console.log(" Error registrando tabla intermedia");
                        }
                        else {
                            res.json({ success: true, message: "Registrado Exitosamente la historia" }); // Return success and token to frontend
                            console.log(" registrando en tabla intermedia de historias");
                        }

                    });
                 



                }
            });
        }


    });



    /* ========
  edit ROUTE
  ======== */

    router.put('/editStorie/:id', (req, res) => {
        var storie = new Storie();

        if ((req.params.id) == null) {
            //   res.status(422);
            res.json({ success: false, message: 'vacio' });
        }
        var ma = {

            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            categorie: req.body.categorie,

        };
        Storie.findByIdAndUpdate(req.params.id, { $set: ma }, { new: true }, (err, storie) => {

            if (err) {
                res.json({ success: false, message: err }); // Return error
                console.log("error");
            }
            else {

                res.json({ success: true, storie }); // Return success and token to frontend
                console.log("storiessss" + storie);
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