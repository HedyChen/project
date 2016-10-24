// 环图组件
var H5ComponentRing =function ( name, cfg ) {
    var component =  new H5ComponentBase( name ,cfg );
    var canvas = document.createElement('canvas');

      var w = cfg.width;
      var h = cfg.height;

     canvas.width = w;
     canvas.height = h;

     var canvas = document.createElement('canvas');
     canvas.width = w;
     canvas.height = h;
     var ctx = canvas.getContext('2d');
     component.append( canvas );
     $(canvas).css('zIndex', 1);

     var r = w/2,
         l = cfg.data.length;
     ctx.beginPath();
     ctx.arc(r,r,r,0,2*Math.PI);
     ctx.fillStyle = '#CFCCCC';
     ctx.fill();

     

    //蒙板层
     var canvas = document.createElement('canvas');
     canvas.width = w;
     canvas.height = h;
     var ctx = canvas.getContext('2d');
     component.append( canvas );
     $(canvas).css('zIndex', 3);

     var r = w/2,
         l = cfg.data.length;
     ctx.beginPath();
     ctx.moveTo(r,r);
     ctx.arc(r,r,r*0.75,0,2*Math.PI);
     ctx.closePath();
     ctx.fillStyle = '#FFFFFF';
     ctx.fill();


     //动画层
         var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
         var ctx = canvas.getContext('2d');
         component.append( canvas ); 
         $(canvas).css('zIndex', 2);
         var r = w/2;
         var sAngle = Math.PI*1.5;

         var angle =2*Math.PI*cfg.data[0][1];

          var  txt = $('<div class="text"></div>');
               txt.text( cfg.data[0][0] );
              
               var per = $('<div class="per"></div>');
               per.text((cfg.data[0][1]*100)+"%");
               txt.append(per);
               component.append(txt);
          txt.css('color', cfg.data[0][2]).css('zIndex', 999);
        
      function draw(per){

         ctx.clearRect(0,0,w,h);
         ctx.beginPath();
         ctx.moveTo(r,r);
         ctx.arc(r,r,r,sAngle+angle*per,sAngle+2*Math.PI,true);
         ctx.fillStyle = cfg.data[0][2];
         ctx.fill();
        
         if (per>=1) {
          component.find('.text').css('opacity', 1);
         }
         if (per<=0) {
          component.find('.text').css('opacity', 0);
         }
        
      }
  //入场动画
     component.on('onload', function(){
        var s = 0
        for(var i = 0;i < 100;i++){
          setTimeout(function(){
          s+=0.01;
          draw(s);
        },i*10);
      }
        
     })

  

  return component;
}