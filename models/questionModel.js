
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');
const expressions = mongoose.model('expressions');

const question = new Schema({
   ask: { type: String , required:true },
   answer: { type: String , required:true },
   expressions:{ type: Schema.ObjectId, ref: "expressions" } 
});

module.exports = mongoose.model('questions', question);

