const express = require('express')
const controller = require('../controllers/matterType');


const router = express.Router()


router.get('/matterTypeCreate', controller.create)
router.get('/matterTypeUpdate', controller.update)

module.exports = router;
