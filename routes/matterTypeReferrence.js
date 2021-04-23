const express = require('express')
const controller = require('../controllers/matterTypeReferrence');


const router = express.Router()


router.get('/matterTypeReferrenceCreate', controller.create)
router.get('/matterTypeReferrenceUpdate', controller.update)

module.exports = router;
