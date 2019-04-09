var express = require('express')
var router = express.Router()
var Note = require('../models/note')

router.get('/notes', function(req, res, next) {
  Note.findAll({raw: true}).then(notes => {
    res.send({status: 0, data: notes})
  })
})

router.post('/notes/add', function(req, res, next) {
  let note = req.body.note
  Note.create({text: note}).then(() => {
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})

router.post('/notes/edit', function(req, res, next) {
  let noteId = req.body.id
  let note = req.body.note
  Note.update({text: note}, {where: {id: noteId}}).then(() => {
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库异常或者你没有权限'})
  })
})

router.post('/notes/delete', function(req, res, next) {
  let noteId = req.body.id
  Note.destroy({where: {id: noteId}}).then(() => {
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库异常或者你没有权限'})
  })
})


module.exports = router
