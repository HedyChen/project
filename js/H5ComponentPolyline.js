// 基本图文组件对象
function H5ComponentPolyline(name,cfg) {
	var component = new H5ComponentBase(name,cfg);

   /*
    *绘制网格线--作为背景
    */
   var w = cfg.width;
   var h = cfg.height;
   // 加入画布 
	var canvas = document.createElement('canvas');
   canvas.width = w;
   canvas.height = h;
   var ctx = canvas.getContext('2d');
   component.append( canvas );

   ctx.strokeStyle = '#878787';
   ctx.lineWidth = 1;
   ctx.beginPath();
   
   //绘制水平网格线
   var step = 10;
   for(var i=0; i<step+1 ; i++){
      var y =(h/step)*i;
      
      ctx.moveTo(0,y);
      ctx.lineTo(w,y);
   }
   //绘制垂直网格线
   var step = cfg.data.length+1;
   for (var j = 0; j <step+1 ; j++) {
      var x =(w/step)*j;
      
      ctx.moveTo(x,0);
      ctx.lineTo(x,h);
    
      
   }
   ctx.stroke();

   /*
    *绘制折线
    */
   var canvas = document.createElement('canvas');
   canvas.width = w;
   canvas.height = h;
   var ctx = canvas.getContext('2d');
   component.append( canvas );
   
   var draw = function(per){
   ctx.clearRect(0,0,w,h);
   ctx.strokeStyle = '#F19393';
   ctx.lineWidth = 3;
   ctx.beginPath(); 
   var x = 0,
       y = 0;
   
   //绘制小圆点
   var text_wid = w/(2*(cfg.data.length+1))>>0; 
   for (var i = 0; i < cfg.data.length; i++) {
      var item=cfg.data[i];
      x = ( w/(cfg.data.length+1))*(i+1);
      y = h*(1-cfg.data[i][1]*per)
      ctx.moveTo(x,y);
      ctx.arc(x,y,5,0,2*Math.PI);

      //在小圆点上添加文本
      ctx.fillStyle = '#444343';
      ctx.font = '12px';
      ctx.fillText((cfg.data[i][1]*100)+'%',x-8,y-12);


      //添加标题文本
     var txt = $('<div class="canvas_text"></div>');
     txt.text( cfg.data[i][0] );
     txt.css('width', text_wid)
        .css('left', x/2-text_wid/2)
        .css('top', h/2);
     component.append(txt);

   }
   
   //连接小圆点

   ctx.moveTo(w/(cfg.data.length+1),h*(1-cfg.data[0][1]*per));
   for (var i = 0; i < cfg.data.length; i++) {
      var item=cfg.data[i];
      x = ( w/(cfg.data.length+1))*(i+1);
      y = h*(1-cfg.data[i][1]*per);
     ctx.lineTo(x,y);
   }
   ctx.stroke();
   ctx.strokeStyle = 'rgba(241,147,147,0)';
   ctx.lineTo(x,h);
   ctx.lineTo(w/(cfg.data.length+1),h);
   ctx.lineTo(w/(cfg.data.length+1),h*(1-cfg.data[0][1]));
   ctx.fillStyle = 'rgba(241,147,147,0.47)';
   ctx.fill();
    }
    //折线生长动画
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
      for (var i = 0; i < 10; i++) {
        setTimeout(function(){
          s-=0.1;
          draw(s);
        },i*10);
      }
    });
  
	return component;

}