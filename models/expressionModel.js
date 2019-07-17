const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');
const cultures = mongoose.model('cultures');

const expression = new Schema({
   name : { type: String , required:true },
   description: { type: String , required:true },
   link: { type: String , required:true },
   categorie: { type: String , required:true }

});

module.exports = mongoose.model('expressions', expression);