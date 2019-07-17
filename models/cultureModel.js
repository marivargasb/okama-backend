const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');



const culture = new Schema({
   name : { type: String , required:true },
   description: { type: String , required:true },
   territory: { type: String , required:true },


});

module.exports = mongoose.model('cultures', culture);