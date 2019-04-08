import 'less/note.less'
import Toast from './toast.js'
import Event from './event.js'

class Note {
  constructor(){
    this.defaultOpts = {
      id: '',
      $ct: $('#content').length > 0 ? $('#content') : $('body'),
      context: 'input here'
    }
  }

  initOpts(opts){
    this.opts = $.extend({}, this.defaultOpts, opts || {})
    if(this.opts.id){
      this.id = this.opts.id
    }
  }

  createNote(){
    let tpl = `
      <div class="note">
        <div class="note-head">
          <span class="username"></span>
          <span class="delete">&times;</span>
        </div>
        <div class="note-ct" contenteditable="true">
        </div>
      </div>
    `
    this.$note = $(tpl)
    this.$note.find('.note-ct').text(this.opts.context)
    this.$note.find('.username').text(this.opts.username)
    this.opts.$ct.append(this.$note)
    if(!this.id){
      this.$note.css('bottom', '10px')
    }
  }

  setLayout(){
    if(this.clk){
      clearTimeout(this.clk)
    }
    this.clk = setTimeout(() => {
      Event.fire('waterfall')
    },100)
  }

  bindEvent(){
    let $note = this.$note,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete')

    $delete.on('click', () => {
      this.delete()
    })

    $noteCt.on('focus', function(){
      if($noteCt.html() == 'input here'){
        $noteCt.html('')
      }
      $noteCt.data('before', $noteCt.html())
    }).on('blur paste', () => {
      if($noteCt.data('before') != $noteCt.html()){
        $noteCt.data('before', $noteCt.html())
        this.setLayout()
        if(this.id){
          this.edit($noteCt.html())
        }else{
          this.add($noteCt.html())
        }
      }
    })

    
  }
}
