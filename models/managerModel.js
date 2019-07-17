const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');


const manager = new Schema({
   email : { type: String , required:true , unique: true, },
   password: { type: String , required:true },
   username : { type: String , required:true , unique: true, },
   name: { type: String , required:true },
   surnames: { type: String , required:true },
   state: { type: String , required:true },
});

module.exports = mongoose.model('managers', manager);