const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Provide a name'],
    maxlength: [15, 'A User name must have less or equal then 15 characters'],
    minlength: [3, 'A Tour name must have more or equal then 3 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Provide an email'],
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email'],
    trim: true,
  },
  rut: {
    type: String,
    required: [true, 'Provide a R.U.T.'],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, 'Provide a phone number'],
  },
  account: {
    type: String,
    required: [true, 'Provide a type account'],
    trim: true,
  },
  numberAccount: {
    type: Number,
    required: [true, 'Provide a number account'],
  },
});


userSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
})

const User = model('User', userSchema);

module.exports = User;