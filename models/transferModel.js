const { Schema, model } = require('mongoose');

const transferSchema = new Schema({
  amount: {
    type: Number,
    required: [true, 'Provide an amount'],
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});


transferSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
})

const Transfer = model('Transfer', transferSchema);

module.exports = Transfer;
