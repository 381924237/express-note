import 'less/note.less'
import Toast from './toast.js'
import Event from './event.js'

class Note {
  constructor(opts){
    this.defaultOpts = {
      id: '',
      $ct: $('#content').length > 0 ? $('#content') : $('body'),
      context: 'input here'
    }
    this.initOpts(opts)
    this.createNote()
    this.bindEvent()
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

    $noteHead.on('mousedown', function(e){
      let evtX = e.pageX - $note.offset().left,   
          evtY = e.pageY - $note.offset().top
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY})
    }).on('mouseup', function(){
       $note.removeClass('draggable').removeData('evtPos')
    })

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY - $('.draggable').data('evtPos').y,    
        left: e.pageX - $('.draggable').data('evtPos').x
      })
    })
  }

  edit(msg){
    $.post('/api/notes/edit',{
      id: this.id,
      note: msg
    }).done(ret => {
      if(ret.status === 0){
        Toast('update success')
      }else{
        Toast(ret.errorMsg)
      }
    })
  }

  add(msg){
    $.post('/api/notes/add', {note: msg})
      .done(ret => {
        if(ret.status === 0){
          Toast('add success')
        }else{
          this.$note.remove()
          Event.fire('waterfall')
          Toast(ret.errorMsg)
        }
      })
  }

  delete(){
    $.post('/api/notes/delete', {id: this.id})
      .done(ret => {
        if(ret.status === 0){
          Toast('delete success');
          this.$note.remove();
          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg);
        }
    })
  }
}

export default Note