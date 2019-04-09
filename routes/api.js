var express = require('express')
var router = express.Router()
var Note = require('../models/note')

router.get('/notes', function(req, res, next) {
  Note.findAll({raw: true}).then(notes => {
    res.send({status: 0, data: notes})
  })
})

router.post('/notes/add', function(req, res, next) {
  console.log('/notes/add')
})

router.post('/notes/edit', function(req, res, next) {
  console.log('/notes/edit')
})

router.post('/notes/delete', function(req, res, next) {
  console.log('/notes/delete')
})


module.exports = router
