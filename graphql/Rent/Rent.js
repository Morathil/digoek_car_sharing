var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentSchema = new Schema({
  days:{
    type: Number,
    required:true
  },
  carId:{
    type: String,
    required:true
  },
  accountId:{
    type: String,
    required:true
  },
  price:{
    type: Number,
    required:true
  },
  startedAt: {
    type: String,
    required:true
  },
  finishedAt: {
    type: String,
    required:false
  },
  canceled: {
    type: Boolean,
    required:false
  }
});

var Model = mongoose.model('Rent', RentSchema);

module.exports = Model
