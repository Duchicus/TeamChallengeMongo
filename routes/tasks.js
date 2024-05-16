const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController.js')
const {authentication} = require("../middleware/authentication.js")

router.post('/create',authentication,TaskController.create)
router.get('/',TaskController.getAll)
router.get('/id/:id',TaskController.getById)
router.get('/title/:title',TaskController.getByTitle)
router.put('/id/:id',authentication,TaskController.update)
router.delete('/id/:id',authentication,TaskController.delete)

module.exports = router