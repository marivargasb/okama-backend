const Expression = require('../models/expressionModel'); // Import User Model Schema/const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
//const hbs = require('nodemailer-express-handlebars');
//const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Question = require('../models/questionModel');
//const EspressionQuestion = require('../models/tables/expression-questionModel');


module.exports = (router) => {


    /* ========
    Register ROUTE
    ======== */
    router.post('/addQuestion/:expression', (req, res) => {

        if ((req.body.ask || req.body.answer || req.params.expression  ) === '') {
            res.json({ success: false, message: "todos los datos deben estar completos" });
            console.log("no estan completos"); // Return error

        }
        else {

         var question = new Question();
       //    var eq = new EspressionQuestion();
            req.param.id
            question.ask = req.body.ask;
            question.answer = req.body.answer;
            question.expressions = req.params.expression;


            question.save(function (err, result) {
                if (err) {
                    res.json({ success: false, message: err }); // Return error
                    console.log("error registrando");
                }
                else {   
    /*
                eq.expressions = req.params.expression;
                eq.questions = result._id ;
                eq.save(function (error) {
                        if (error) {
                            res.json({ success: false, message: error }); // Return error
                            console.log(" Error registrando tabla intermedia");
                        }
                        else {
                            res.json({ success: true, message: "Registrado Exitosamente la historia" }); // Return success and token to frontend
                            console.log(" registrando en tabla intermedia de historias");
                        }

                    });
                 
*/
             res.json({ success: true, message: "Rpregunta registrada" });
                }
            });
        }


    });



    /* ========
  edit ROUTE
  ======== 

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

*/
    return router;

}