const express = require('express');
const transferController = require('../controllers/transferController');

const router = express.Router();


router.get('/', transferController.getTransfers);

router.post('/', transferController.createTransfer);


module.exports = router;