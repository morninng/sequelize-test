const express = require('express')
const controller = require('../controllers/matter');


const router = express.Router()


router.get('/matterCreate', controller.create)
router.get('/matterUpdate', controller.update)
router.get('/matterGet', controller.get)

module.exports = router;
