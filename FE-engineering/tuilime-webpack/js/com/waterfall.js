define(['jquery'],function($){
    function water(){
      var allImages = [],
          wrap = $('.wrap'),
          column1 = $('.column1'),
          column2 = $('.column2'),
          column3 = $('.column3'),
          pageImg = 0;

      for (var i=0;i<10000;i++){
        var random = parseInt(Math.random()*400+0,10)
        allImages.push('https://uploadbeta.com/api/pictures/random/?key=推女郎&sort='+random)
      }

      function getImages(page,func){
        setTimeout(function(){
          var prePage = 20
          pageImg += 1
          func(allImages.splice(pageImg,prePage))
        },500)
      }

      var columnHeights = [0,0,0]
      var countWidth = Math.floor($('.wrap').width()/$('.column').width())
      for(var i=0;i<countWidth;i++){
        columnHeights[i] = 0;
      }

      var count = 0;

      start()

      $(window).on('scroll',function(){
        if(isVisible($('.load-more'))){
          start()
        }
      })

      function start(){
        getImages(pageImg,function(images){
            var image = new Image()
                image.src = './images/load.gif'
                column1.append(image)
                image.onload = function(){
                  image.src = images[0]
                  columnHeights[0] += image.height
                  count ++
                  loadNext(count+1)
                }
            var image2 = new Image()
                image2.src = './images/load.gif'
                column2.append(image2)
                image2.onload = function(){
                  image2.src = images[1]
                  columnHeights[1] += image2.height
                  count ++
                  loadNext(count+1)
                }
            var image3 = new Image()
                image3.src = './images/load.gif'
                column3.append(image3)
                image3.onload = function(){
                  image3.src = images[2]
                  columnHeights[2] += image3.height
                  count ++
                  loadNext(count+1)
                }
          
          function loadNext(n){
            if(n>3&&images[n]){
              var short = getShortest()
              var col = $('.column'+(short+1))
              var imageN = new Image()
                  imageN.src = './images/load.gif'
                col.append(imageN)
                imageN.onload = function(){
                  imageN.src = images[n-1]
                  columnHeights[short] += imageN.height
                  count += 1
                  loadNext(count+1)
              }
            }
          }

          function getShortest(){
            var min = 0
            for(var i=0;i<columnHeights.length;i++){
              if(columnHeights[i]<columnHeights[min]){
                  min = i
              }
            }
            return min
          }
        })                
      }

      function isVisible($node){
        var windowH = $(window).height(),
            scrollH = $(window).scrollTop(),
            offsetTop = $node.offset().top,
            nodeH = $node.outerHeight(true)
        if(windowH+scrollH>=offsetTop&&scrollH<offsetTop+nodeH){
          return true
        }else{
          return false
        }
      }        
    }

    return water
})