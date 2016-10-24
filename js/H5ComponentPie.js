// 基本饼图组件对象
function H5ComponentPie(name,cfg) {
	var component = new H5ComponentBase(name,cfg);

   var w = cfg.width;
   var h = cfg.height;
   // 背景层 
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
   ctx.fillStyle = '#E9E5E5';
   ctx.fill();

  // 颜色层
 var canvas = document.createElement('canvas');
   canvas.width = w;
   canvas.height = h;
   var ctx = canvas.getContext('2d');
   component.append( canvas ); 
   $(canvas).css('zIndex', 2);
   var r = w/2,
       l = cfg.data.length;
   var sAngle = Math.PI*1.5;
   var eAngle = Math.PI*2;

   for(var i = 0; i<l; i++){
    var angle = 2*Math.PI*cfg.data[i][1];
    var x = r+Math.sin( angle );
    var y = r+Math.cos( angle );
     
     ctx.beginPath();
     ctx.moveTo(r,r);
     ctx.arc(x,y,r,sAngle,sAngle+angle);
     ctx.fillStyle = cfg.data[i][2];
     ctx.fill();
     sAngle =sAngle+angle;
     //项目名
     var txt = $('<div class="text"></div>');
     txt.text( cfg.data[i][0] );
    
     var per = $('<div class="per"></div>');
     per.text((cfg.data[i][1]*100)+"%");
     txt.append(per);
     component.append(txt);
     txt.css('opacity', 0);
    
     var m = r+r*Math.sin( 0.5*Math.PI-sAngle );
     var n = r+r*Math.cos( 0.5*Math.PI-sAngle );

    if(m>=r){
      txt.css('left',m/2+5);
     }else{
      txt.css('right', (w-m)/2+5);
     }
     //top
     if (n>=r) {
      txt.css('top',n/2+5);
      }
       else{
       txt.css('bottom',(h-n)/2+5);
     }

   
      txt.css('color', '#ff7676');
     
   }
     
//图层动画
var canvas = document.createElement('canvas');
   canvas.width = w;
   canvas.height = h;
   var ctx = canvas.getContext('2d');
   component.append( canvas );
   $(canvas).css('zIndex', 3);

   var r = w/2; 
   ctx.fillStyle = '#E9E5E5';
    
  function draw(per){
 
   ctx.clearRect(0,0,w,h);

   ctx.beginPath();

   ctx.moveTo(r,r);
   if (per <= 0) {
   ctx.arc(r,r,r,0,2*Math.PI);
   }
   else{
     ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI*per,true);
   }
   if (per>=1) {
    component.find('.text').css('opacity', 1);
   }
   if (per<=0) {
    component.find('.text').css('opacity', 0);
   }
  
   ctx.fill();
  }
  //入场动画
  component.on('onload', function() {
      var s = 0;
      for (var i = 0; i < 100; i++) {
        setTimeout(function(){
          s+=0.01;
          draw(s);
        },i*10);
      }
    })
  component.on('onleave', function() {
      var s = 1;
      for (var i = 0; i < 100; i++) {
        setTimeout(function(){
          s-=0.01;
          draw(s);
        },i*10);
      }
    })
  
return component;

  }