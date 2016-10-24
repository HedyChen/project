function H5(){
    this.id=('h5_page_'+Math.random()).replace('.','_');
    this.el=$('<div class="h5" id="'+this.id+'">').hide();
    this.page=[];
    $('body').append(this.el);
   //添加页面
    this.addpage=function(name,text){
       var page=$('<div class="h5_page section">');
       if(name != undefined ){
       	page.addClass('h5_page_'+name);
       }
       if(text != undefined ){
       	page.text(text);	
       }
       this.el.append(page);
       this.page.push(page);

      if(typeof this.whenAddPage == 'function'){
          this.whenAddPage();
      }


       return this;
    }
    //向页面内添加组件
    this.addcomponent=function(name,cfg){
    	var cfg=cfg||{}
    	cfg=$.extend({
    		type:'base',
    	},cfg);
      var page=this.page.slice(-1)[0];

       switch( cfg.type ){
            case 'base' :
                component = new H5ComponentBase(name,cfg);
                break;

            case 'polyline' :
                component = new H5ComponentPolyline(name,cfg);
                break;

            case 'pie' :
                component = new H5ComponentPie(name,cfg);
                break;
            case 'bar' :
                component = new H5ComponentBar(name,cfg);
                break;
            
            case 'radar' :
                component = new H5ComponentRadar(name,cfg);
                break;

            case 'pie' :
                component = new H5ComponentPie(name,cfg);
                break;
            case 'ring' :
                component = new H5ComponentRing(name,cfg);
                break;
           case 'point' :
                component = new H5ComponentPoint(name,cfg);
                break;
            default:
        }

        page.append(component);
        return this;

    }
    //将隐藏的页面呈现
    this.loader=function(page){
    	this.el.show();
    	this.el.fullpage({
        onLeave:function(index, nextIndex, direction){
          $(this).find('.h5_component').trigger('onleave');
        },
         afterLoad:function(anchorLink, index){
          $(this).find('.h5_component').trigger('onload');
        }
        })
       this.page[0].find('.h5_component').trigger('onLoad');

       if ( page != undefined) {
         $.fn.fullpage.moveTo( page );
       }

    }
    return this;
}