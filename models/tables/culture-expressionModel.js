const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');
const cultures = mongoose.model('cultures');
const expressions = mongoose.model('expressions');


const cultureExpression = new Schema({
   expressions:{ type: Schema.ObjectId, ref: "expressions" } ,
   cultures: { type: Schema.ObjectId, ref: "cultures" } 

});

module.exports = mongoose.model('cultureExpression', cultureExpression);