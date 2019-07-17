const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');

const storie = new Schema({
   name : { type: String , required:true },
   description: { type: String , required:true },
   type: { type: String , required:true },
   categorie: { type: String , required:true }
});

module.exports = mongoose.model('stories', storie);