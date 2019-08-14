const mongoose = require('mongoose');

const{Schema} = mongoose;

const exerciseModel = new Schema({
    name: {type:String},
    muscle: {type:String},
    level: {type:Number},
    description: {type:String},
});

module.exports = mongoose.model('Exercise', exerciseModel);