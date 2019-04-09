let WaterFall = (function(){
  let $ct, $items

  function render($c){
    $ct = $c
    $items = $ct.children()

    let nodeWidth = $items.outerWidth(true),
        colNum = parseInt($ct.width()/nodeWidth),
        colSumHeight = []

    for(let i = 0; i < colNum; i++){
      colSumHeight.push(0)
    }
    
    $items.each(function() {
      let $cur = $(this)
      let minIndex = 0
      let minSumHeight = colSumHeight[0]

      colSumHeight.forEach((height,i) => {
        if(height < minSumHeight){
          minIndex = i
          minSumHeight = height
        }
      })

      let ctPaddingLeft =  ($ct.innerWidth() - $ct.width()) / 2
      $cur.css({
        left: nodeWidth * minIndex + ctPaddingLeft,
        top: minSumHeight
      })
      
      colSumHeight[minIndex] += $cur.outerHeight(true)
    })
  }

  $(window).on('resize',function(){
    render($ct)
  })    

  return {
    init: render
  }
})()

export default WaterFall