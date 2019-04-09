import Toast from './toast.js'
import Note from './note.js'
import Event from './event.js'

let NoteManager = (function(){
  function load(){
    $.get('/api/notes')
      .done(function(ret){
        if(ret.status == 0){
          $.each(ret.data, function(idx, article) {
              new Note({
                id: article.id,
                context: article.text,
                username: article.username
              })
          })

          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg)
        }
      })
      .fail(function(){
        Toast('网络异常')
      })
  }

  function add(){
    new Note()
  }

  return {load, add}
})()

export default NoteManager