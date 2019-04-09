import Event from 'mod/event.js'
import WaterFall from 'mod/waterfall.js'
import NoteManager from 'mod/note-manager.js'
import 'less/index.less'

NoteManager.load()

$('.add-note').on('click', function() {
  NoteManager.add()
})

Event.on('waterfall', function(){
  WaterFall.init($('#content'))
})