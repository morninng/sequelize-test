const express = require('express')
const controller = require('../controllers/matter');


const router = express.Router()


router.get('/matterCreate', controller.create)
router.get('/matterUpdate', controller.update)
router.get('/matterGet', controller.get)
router.get('/matterSearchByKeyword', controller.searchByKeyword)

module.exports = router;
