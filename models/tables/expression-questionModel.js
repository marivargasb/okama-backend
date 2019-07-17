
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 
const bcrypt = require('bcrypt-nodejs');
const questions = mongoose.model('managers');
const expressions = mongoose.model('expressions');


const expressionQuestion = new Schema({
   expressions:{ type: Schema.ObjectId, ref: "expressions" } ,
   questions: { type: Schema.ObjectId, ref: "questions" } 


});

module.exports = mongoose.model('expressionQuestions', expressionQuestion);

