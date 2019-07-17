const Expression = require('../models/expressionModel'); // Import User Model Schema/const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const Stories = require('../models/storieModel'); // Import User Model Schema/const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
//const hbs = require('nodemailer-express-handlebars');
//const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Culture = require('../models/cultureModel');
const CultureExpression = require('../models/tables/culture-expressionModel');
const CultureStorie = require('../models/tables/culture-storieModel');
const ExpressionQuestion = require('../models/tables/expression-questionModel');

module.exports = (router) => {

/*           EXPRESSIONS                   */

    router.get('/fineCultureExpression', function (req, res) {
        CultureExpression.find().
            populate({ path: "cultures" }).
            populate({ path: "expressions" })
            .exec(function (err, ce) {
                res.status(200).send(ce);
            });
    });

    router.get('/finesOneCE/:expressions/:cultures', function (req, res) {

        if ((req.params.expressions) == null & (req.params.cultures) == null) {
            //   res.status(422);
            res.json({ success: false, message: 'vasio' });
            console.log("los parametros estaan vacios");
        }
        CultureExpression.findOne({ expressions: req.params.expressions.toLowerCase(), cultures: req.params.cultures.toLowerCase() }).
            populate({ path: "cultures" }).
            populate({ path: "expressions" })
            .exec(function (err, ce) {
                res.status(200).send(ce);
            });

    });

    router.get('/finesOneCES/:cultures', function (req, res) {

        if ((req.params.expressions) == null & (req.params.cultures) == null) {
            //   res.status(422);
            res.json({ success: false, message: 'vasio' });
            console.log("los parametros estaan vacios");
        }
        CultureExpression.find({  cultures: req.params.cultures.toLowerCase() }).
            populate({ path: "cultures" }).
            populate({ path: "expressions" })
            .exec(function (err, ce) {
                res.status(200).send(ce);
            });

    });


    /*          STORIES               */

    router.get('/fineCultureStories', function (req, res) {
        CultureStorie.find().
            populate({ path: "cultures" }).
            populate({ path: "stories" })
            .exec(function (err, ce) {
                res.status(200).send(ce);
            });
    });


    
    /*          QUESTION              

    router.get('/fineExpressionQuestion', function (req, res) {
        ExpressionQuestion.find().
            populate({ path: "expresions" }).
            populate({ path: "questions" })
            .exec(function (err, ce) {
                res.status(200).send(ce);
            });
    });

*/
    return router;

    
}