const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Provide a name'],
    maxlength: [15, 'A User name must have less or equal then 15 characters'],
    minlength: [3, 'A Tour name must have more or equal then 3 characters'],
    trim: true,
    unique: [true, 'Name already registered'],
    lowercase: true
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
    unique: [true, 'Email already registered']
  },
  phone: {
    type: Number,
    required: [true, 'Provide a phone number'],
  },
  bank: {
    type: String,
    required: [true, 'Provide a bank'],
  },
  account: {
    type: String,
    required: [true, 'Provide a type account'],
    trim: true,
    lowercase: true
  },
  numberAccount: {
    type: Number,
    required: [true, 'Provide a number account'],
    unique: [true, 'Account already registered']
  },
});


userSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
})

const User = model('User', userSchema);

module.exports = User;