;(function ( $, window, document, undefined ) {
	var pluginName = 'Chocolat';
	var defaults = {
			container:  	 'body',
			next: 			 '#right',
			prev: 			 '#left',
			timeOut:		 false,
			imgOrigHeight:	 false,
			imgOrigWidth:	 false,
			fullScreen:      false,
			linkImages:		 true,
			currentImage:	 0,
			overlayOpacity : 0.5,
			timer: 			 false,
			lastImage: 		 false,
			images :		 ['img/1.jpg','img/2.jpg','img/1.jpg']
		};
		
	function Plugin( element, settings ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, settings) ;
		this._defaults = defaults;
		this._name = pluginName;
		that = this;
		
		this.init();
	}
	Plugin.prototype = {
		init: function() {
			this.markup();
			this.events();
			$('#overlay').fadeTo(800, this.settings.overlayOpacity)
			this.settings.lastImage = this.settings.images.length - 1;
			this.load(0);
		}, 
		preload: function(i, callback) {
			callback = this.tool_optFuncParam(callback);
			imgLoader = new Image();
			imgLoader.onload = callback(i, imgLoader);
			imgLoader.src = this.settings.images[i];
		},
		load: function(i) {
			this.settings.timer = setTimeout(function(){$('#loader').fadeIn();},400);
			this.preload(i,this.appear);
		},
		appear: function(i, imgLoader) {
			$('#img').fadeTo(200,0, function(){
				that.settings.currentImage = i;
				that.storeImgSize(imgLoader);
				fitting = that.fit(that.settings.imgOrigHeight, that.settings.imgOrigWidth, $(window).height(), $(window).width(), that.getOutMarginH(), that.getOutMarginW());
				that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150, function(){
					clearTimeout(that.settings.timer);
					$('#loader').stop().fadeOut(300, function(){
						$('#img').attr('src', that.settings.images[i]).fadeTo(400,1);
					});
				});
				that.arrows();
			});
		},
		fit: function(imgHeight, imgWidth, holderHeight, holderWidth, holderOutMarginH, holderOutMarginW){ 
			var holderGlobalWidth = holderWidth-holderOutMarginW; 
			var holderGlobalHeight = holderHeight-holderOutMarginH; 
			var holderRatio = (holderGlobalHeight / holderGlobalWidth ); 
			var imgRatio = (imgHeight / imgWidth); 
			
			if(imgRatio>holderRatio) { 
				height = holderGlobalHeight;
				width = height / imgRatio;
			} 
			else { 
				width = holderGlobalWidth;
				height = width * imgRatio;
			}

			if(!fullScreen && (width>=imgWidth || height>=imgHeight)){
				width=imgWidth;
				height=imgHeight;
			}
			
			return {
				'height' :height,
				'width' : width,
				'top' : (holderHeight - height)/2,
				'left' : (holderWidth - width)/2
			}
		},
		center: function(width, height, left, top, duration, callback) {
			callback = this.tool_optFuncParam(callback);		
			$('#container').animate({
				'width':width,
				'height':height,
				'left':left,
				'top':top
			},duration,callback()).css('overflow', 'visible');
		},
		change: function(signe) {
			if(this.settings.linkImages && ((this.settings.currentImage !== 0 && signe == -1) || (this.settings.currentImage !== this.settings.lastImage && signe == 1))) {
				this.load(this.settings.currentImage + parseInt(signe));
			}
		},
		arrows: function() {
			if(this.settings.linkImages){
				if(this.settings.currentImage == this.settings.lastImage){
					$('#right').fadeOut(300);
				}
				else{
					$('#right').fadeIn(300);
				}
				if(this.settings.currentImage == 0){
					$('#left').fadeOut(300);
				}
				else{
					$('#left').fadeIn(300);
				}
			}
		},
		storeImgSize: function(img) {
			this.settings.imgOrigHeight = img.height;
			this.settings.imgOrigWidth = img.width;
		},
		getOutMarginW: function(el, options) {
			return ($('#left').outerWidth() - $('#left').width()) + ($('#right').outerWidth() - $('#right').width());
		},
		getOutMarginH: function(el, options) {
			return $('#top').outerHeight() + $('#bottom').outerHeight();
		},
		markup: function(){
			$(this.settings.container).append('\
			<div id="overlay"></div>\
			<div id="loader"></div>\
			<div id="container">\
				<img src="" id="img" alt=""/>\
				<div id="top"></div>\
				<div id="left"></div>\
				<div id="right"></div>\
				<div id="bottom"></div>\
			</div>');
		},
		events : function(){
			$(this.settings.next).off('click').on('click', function(){
				that.change(+1);	
			});
			$(this.settings.prev).off('click').on('click', function(){
				that.change(-1);	
			});
			$(window).off('resize').on('resize', function(){
				that.tool_debounce(100, function(){
					fitting = that.fit(that.settings.imgOrigHeight, that.settings.imgOrigWidth, $(window).height(), $(window).width(), that.getOutMarginH(), that.getOutMarginW());
					that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150);
				});
			});
		},
		tool_debounce: function(duration, callback) {
			clearTimeout(this.timeOut);
			this.timeOut = setTimeout(function(){callback();},duration);
		},
		tool_optFuncParam: function(f) {
			if(!$.isFunction(f)){return function(){};} 
			else{return f;}
		}
	};
	
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	}
})( jQuery, window, document );
