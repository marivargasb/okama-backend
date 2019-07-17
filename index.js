const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//const Manager = require('./models/managerModel');
const config = require('./config/database');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const Manager = require('./routes/manager')(router);
const Culture = require('./routes/culture')(router);
const Expression = require('./routes/expression')(router);
const Middle = require('./routes/middle')(router);
const Storie = require('./routes/storie')(router);
const Question = require('./routes/question')(router);


// Database Connection
mongoose.connect(config.uri,{ useNewUrlParser: true } ,(err) => {
    if (err) {
      console.log('Could NOT connect to database: ', err);
    } else {
      console.log('Connected to database: ' + config.db);
    }
  });

// Middleware
  
 // app.use(app.router);
 app.use(cors({ origin: 'http://localhost:4200' }));
 app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
 app.use(bodyParser.json()); // parse application/json
//app.use(express.static(__dirname + '/../frontend/')); // Provide static directory for frontend
 app.use('/manager', Manager); 
 app.use('/culture', Culture);
 app.use('/expression', Expression);
 app.use('/middle', Middle);
 app.use('/storie', Storie);
 app.use('/question', Question);




// Connect server to Angular 2 Index.html
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname + '../frontend/tubekids/dist/index.html'));
//  });


app.listen(8000, () => 
console.log('TODO API is listening on port 8000!'));