// 基本图文组件对象
function H5ComponentRadar(name,cfg) {
	var component = new H5ComponentBase(name,cfg);

   /*
    *绘制雷达图背景
    */
   var w = cfg.width;
   var h = cfg.height;
   // 加入画布 
	var canvas = document.createElement('canvas');
   canvas.width = w;
   canvas.height = h;
   var ctx = canvas.getContext('2d');
   component.append( canvas );

   var r = w/2,
       l = cfg.data.length;
   var color = false;
   //背景图
   for(var j = 8;j > 0;j--){
    
     ctx.beginPath();   
     for (var i = 0; i < l; i++) {
        var rad =(2*Math.PI/360)*(360/l)*i;
        var   x = r + r*Math.sin( rad )*(j/8);
        var  y = r + r*Math.cos( rad )*(j/8);
      ctx.lineTo(x,y);
     }
     ctx.closePath();
     ctx.fillStyle = (color = !color)?'#D9FDFC':'#F6FFFD';
     ctx.fill();
   }

   //伞骨线
   for(var s = 0;s < l;s++){
    var rad =(2*Math.PI/360)*(360/l)*s;
    var   x = r + r*Math.sin( rad );
    var  y = r + r*Math.cos( rad );
     ctx.beginPath();
     ctx.moveTo(r,r);
     ctx.lineTo(x,y);
     ctx.strokeStyle = '#FFFFFF';
     ctx.lineWidth = 3;
     ctx.stroke();
     //文本
     var txt = $('<div class="txt"></div>');
     txt.text( cfg.data[s][0] );
     component.append( txt );
     txt.css('color', '#F66D6D');
     //顺序展示
     txt.css('transition', 'all 0.5s '+s*0.1+'s');
     //left
     if(x>=r){
      txt.css('left',x/2+5);
     }else{
      txt.css('right', (w-x)/2+5);
     }
     //top
     if (y>=r) {
      txt.css('top',y/2+5);
      }
       else{
       txt.css('bottom',(h-y)/2+5);
     }
   }

   //绘制数据层
   var canvas = document.createElement('canvas');
   canvas.width = w;
   canvas.height = h;
   var ctx = canvas.getContext('2d');
   component.append( canvas );

   var r = w/2,
       l = cfg.data.length;

   var draw = function(per){
    ctx.beginPath();
    ctx.clearRect(0,0,w,h);
    for(var i = 0; i < l; i++){
        var rate = cfg.data[i][1];
        var rad =(2*Math.PI/360)*(360/l)*i;
        var   x = r + r*rate*per*Math.sin( rad );
        var  y = r + r*rate*per*Math.cos( rad );
    ctx.lineTo(x,y);
    }
     ctx.closePath();
     // ctx.lineWidth = 2;
     ctx.strokeStyle = '#F75F5F';
     ctx.stroke();
     // ctx.fillStyle = 'rgba(241,147,147,0.6)';
     // ctx.fill();
     //加载完成后出现文本

     if (per >= 1) {
      component.find('.txt').css('opacity', 1);
     }
     
   }

   component.on('onload', function() {
      var s = 0;
      for (var i = 0; i < 100; i++) {
        setTimeout(function(){
          s+=0.01;
          draw(s);
        },i*10);
      }
    });
    //折线退场动画
    component.on('onleave', function() {
      var s = 1;
      for (var i = 0; i < 100; i++) {
        setTimeout(function(){
          s-=0.01;
          draw(s);
        },i*10);
      }
      component.find('.txt').css('opacity', 0);
    });
   
return component;

  }