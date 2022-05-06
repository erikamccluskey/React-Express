// Import express
const express = require('express')

// Import users controller
const usersController = require('./../controllers/users-controller.js')

// Create express router
const router = express.Router()

// Create rout between usersController and '/all' endpoint
router.get('/all', usersController.usersGetAll)

// Export router
module.exports = router