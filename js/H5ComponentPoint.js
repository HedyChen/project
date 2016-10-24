// 基本图文组件对象
function H5ComponentPoint(name,cfg) {
	var component = new H5ComponentBase(name,cfg);
	var base = cfg.data[0][1];
	$.each(cfg.data,function(ind,item){
		var point=$("<div class='point' id='point_"+ind+"'>");
		component.append(point);
		var per = (item[1]/base*100)+'%';
        point.width(per).height(per);

        point.css('transition', "all 1s "+ind+"s");
       if (item[2]) {
       	 point.css('backgroundColor',item[2]);
       }
       if (item[3] !== undefined &&item[4] !== undefined) {
       	point.css({
       		left: item[3],
       		top: item[4]
       	});
       	var name = $('<div class="name">'+item[0]+'</div>');
       	var pre = $('<div class="pre">'+item[1]*100+'%</div>');
       	point.append(name);
       	name.append(pre);

       }
		
        
	});
	return component;

}