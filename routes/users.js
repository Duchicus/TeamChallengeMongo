const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController.js')


router.post('/', UserController.create)
router.post('/login', UserController.login)

module.exports = router