// 基本图文组件对象
function H5ComponentBase(name,cfg) {
	var cfg=cfg||{};
	var id=('h5_c_'+Math.random()).replace('.','_');
	var cls='h5_component'+' h5_component_'+name;
	var component=$('<div class="'+cls+'" id="'+id+'">');

	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.text && component.text(cfg.text);
    cfg.css && component.css(cfg.css);
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
	if (cfg.center===true) {
		component.css({
			marginLeft:(cfg.width/4*-1)+'px',
			left:'50%',
		});
	}

 	
     if ( typeof cfg.onclick == 'function' ){
     	component.on('click',cfg.onclick);
     }
 
	component.on('onload',function() {
		component.addClass('componet_load').removeClass('component_leave');
		cfg.animateIn && component.animate(cfg.animateIn);
		return false;
	});

	component.on('onleave',function() {
		component.addClass('component_leave').removeClass('componet_load');
		cfg.animateOut && component.animate(cfg.animateOut);
		return false;
	});

	return component;
}