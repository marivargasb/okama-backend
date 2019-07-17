const Culture = require('../models/cultureModel'); // Import User Model Schema/const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
//const hbs = require('nodemailer-express-handlebars');
//const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


module.exports = (router) => {


    /* ========
    Register ROUTE
    ======== */
    router.post('/addCulture', (req, res) => {
  console.log("entro en cultura");
    

        if ((req.body.name || req.body.description || req.body.territory) === '') {
            res.json({ success: false, message: "todos los datos deben estar completos" });
            console.log("no estan completos"); // Return error
        }
        else {

            var culture = new Culture();
            req.param.id
            culture.name = req.body.name;
            culture.description = req.body.description;
            culture.territory = req.body.territory;
            console.log(req.body);
            culture.save(function (err) {
                if (err) {
                    res.json({ success: false, message: err }); // Return error
                    console.log("error registrando");
                }
                else {
                    console.log("ADD NEW culture");
                    res.json({ success: true, message: "Registrado Exitosamente" }); // Return success and token to frontend
                }
            });
        }


    });



    /* ========
  edit ROUTE
  ======== */

    router.put('/editCulture/:id', (req, res) => {
        var culture = new Culture();

        if ((req.params.id) == null) {
            //   res.status(422);
            res.json({ success: false, message: 'vacio' });
        }
        var ma = {

            name: req.body.name,
            description: req.body.description,
            territory: req.body.territory,

        };
        Culture.findByIdAndUpdate(req.params.id, { $set: ma }, { new: true }, (err, culture) => {

            if (err) {
                res.json({ success: false, message: err }); // Return error
                console.log("error");
            }
            else {

                res.json({ success: true, culture }); // Return success and token to frontend
                console.log("culturessss" + culture);
            }


        });
    });

    router.get('/fineCulture/:id', (req, res) => {
        var culture = new Culture();
        if ((req.params.id) == null) {
            //   res.status(422);
            res.json({ success: false, message: 'empy' });
        }

        Culture.findOne({ _id: req.params.id.toLowerCase() }, (err, culture) => {

            if (err) {
                // res.status(422);
                // res.json({success: false, message: 'no encontrado' } );
                res.json({ success: false, message: err }); // Return error
                console.log("error");
            }

            //res.json({ success: true, message: 'Success!'});
            res.json({ success: true, culture }); // Return success and token to frontend
            console.log(culture);

        })

    });

    router.get('/fineCulture', (req, res) => {
  
        Culture.find({}, function (err, culture)  {

            if (err) {
                // res.status(422);
                // res.json({success: false, message: 'no encontrado' } );
                res.json({ success: false, message: err }); // Return error
                console.log("error");
            }

            //res.json({ success: true, message: 'Success!'});
            res.json({ success: true, culture }); // Return success and token to frontend
            console.log(culture);

        })

    });

    router.delete('/deleteCulture/:id', (req, res) => {

        var culture = new Culture();
         console.log("eliminando");
        Culture.findByIdAndRemove(req.params.id, (err, culture) => {
          if (err) {  res.json({ success: false, message: err }); // Return error
          console.log("error al eliminar su cuenta");
         }
      else { 
           console.log("DELETE CULTURE");  
            res.json({ success: true }); // Return success and token to frontend
          
           }
        });
    });
    

 
    return router;

}