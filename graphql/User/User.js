var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName:{
    type: String,
    required:true
  },
  lastName:{
    type: String,
    required:true
  },
  email:{
    type: String,
    unique: true,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  token: {
    type: String
  }
});

var Model = mongoose.model('User', UserSchema);

module.exports = Model