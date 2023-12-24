const express = require('express')
const router = express.Router()
const { createCitizen, getCitizen, deleteCitizen } = require('../controllers/citizenController.js')

router.route('/')
        .post(createCitizen)
        .get(getCitizen)
        .delete(deleteCitizen)

module.exports = router 