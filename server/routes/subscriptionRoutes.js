// This file defines the route to handle the subscription requests and delegate the logic to the controller..

const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/subscriptionController');

// POST endpoint for subscribing
router.post('/subscribe', subscribe);

module.exports = router;

