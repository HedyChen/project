// 基本图文组件对象
function H5ComponentBar(name,cfg) {
	var component = new H5ComponentBase(name,cfg);

      $.each(cfg.data,function(index, el) {
         var line = $("<div class='line'>");
         var name = $("<div class='name'>");
         var rate = $("<div class='rate'>");
         var pre = $("<div class='pre'>");
          

         name.text(el[0]);
         var width = el[1]*100+'%';
         rate.css('width', width);

         var bg=$("<div class='bg'></div>");
         
         rate.append( bg );
         if ( el[2] ) {
          bg.css('backgroundColor', el[2]);
         }
         pre.text(width);

         line.append(name).append(rate).append(pre);
         component.append(line);


      });

	
	return component;

}