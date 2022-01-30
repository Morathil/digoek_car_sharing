var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
  doors: {
    type: Number,
    required: true
  },
  seats:{
    type: Number,
    required:true
  },
  pricePerDay:{
    type: Number,
    required:true
  },  
  availability:{
    type: Boolean,
    required:true
  },
  manufacturer:{
    type: String,
    required:true
  },
  owner:{
    type: String,
    required:true
  },
  location: {
    type: String,
    required:true
  }
});

var Model = mongoose.model('Car', CarSchema);

module.exports = Model