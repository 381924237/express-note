var express = require('express')
var router = express.Router()
var Note = require('../models/note')

router.get('/notes', function(req, res, next) {
  let opts = {raw: true}
  if(req.session && req.session.user){
    opts.where = {username: req.session.user.username}
  }
  Note.findAll(opts).then(notes => {
    res.send({status: 0, data: notes})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库异常'})
  })
})

router.post('/notes/add', function(req, res, next) {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }

  let note = req.body.note
  let username = req.session.user.username
  Note.create({text: note, username: username}).then(() => {
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库异常或者你没有权限'})
  })
})

router.post('/notes/edit', function(req, res, next) {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }

  let noteId = req.body.id
  let note = req.body.note
  let username = req.session.user.username
  Note.update({text: note}, {where: {id: noteId, username: username}}).then(lists => {
    if(lists[0] === 0){
      return res.send({ status: 1,errorMsg: '你没有权限'})
    }
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库异常或者你没有权限'})
  })
})

router.post('/notes/delete', function(req, res, next) {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }

  let noteId = req.body.id
  let username = req.session.user.username
  Note.destroy({where: {id: noteId, username: username}}).then(deleteLen => {
    if(deleteLen === 0){
      return res.send({ status: 1, errorMsg: '你没有权限'});
    }
    res.send({status: 0})
  }).catch(() => {
    res.send({status: 1, errorMsg: '数据库异常或者你没有权限'})
  })
})


module.exports = router
