const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController.js')

router.post('/create',TaskController.create)
router.get('/',TaskController.getAll)
router.get('/id/:id',TaskController.getById)
router.get('/title/:id',TaskController.getByTitle)
router.put('/id/:id',TaskController.update)
router.delete('/id/:id',TaskController.delete)

module.exports = router