const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Transfer = require('../models/transferModel');
const User = require('../models/userModel');


exports.getTransfers = catchAsync(async (req, res, next) => {
  const transfers = await Transfer.find();

  if (!transfers) {
    return next(new AppError('An error occurred while trying to request the data', 500));
  }

  res.status(200).json({
    status: 'success',
    results: transfers.length,
    data: transfers
  });
});

exports.createTransfer = catchAsync(async (req, res, next) => {
  const transfer = await Transfer.create(req.body);

  if (!transfer) {
    return next(new AppError('An error occurred while trying to request the data', 500));
  }

  res.status(201).json({
    status: 'success',
    data: {
      transfer
    }
  });
});