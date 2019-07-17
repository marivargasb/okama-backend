
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');
const cultures = mongoose.model('cultures');
const storie = mongoose.model('stories');


const cultureStorie = new Schema({
   stories:{ type: Schema.ObjectId, ref: "stories" } ,
   cultures: { type: Schema.ObjectId, ref: "cultures" } 

});

module.exports = mongoose.model('cultureStorie', cultureStorie);

