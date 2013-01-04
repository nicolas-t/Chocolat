;(function ( $, window, document, undefined ) {
	var pluginName = 'Chocolat';
	var calls = 0;
	var defaults = {
			container:  	 'body',
			next: 			 '#right',
			prev: 			 '#left',
			setIndex:		 0,
			setTitle:		 '',
			timeOut:		 false,
			fullWindow:      false,
			fullScreen:      false,
			linkImages:		 true,
			currentImage:	 0,
			overlayOpacity : 0.5,
			timer: 			 false,
			lastImage: 		 false,
			images :		 []
		};
		
	function Plugin( element, settings ) {
		that = this;
		this.element = element;
		this.settings = $.extend( {}, defaults, settings) ;
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	Plugin.prototype = {
		init: function() {
			this.markup();
			this.events();
			$('#overlay').fadeTo(800, this.settings.overlayOpacity)
			this.settings.lastImage = this.settings.images.length - 1;
			this.load(this.settings.currentImage);
		}, 
		preload: function(i, callback) {
			callback = this.tool_optFuncParam(callback);
			imgLoader = new Image();
			imgLoader.onload = callback(i, imgLoader);
			imgLoader.src = this.settings.images[i].src;
		},
		load: function(i) {
			this.settings.timer = setTimeout(function(){$('#loader').fadeIn();},400);
			this.preload(i,this.place);
		},
		place: function(i, imgLoader) {
			$('#img').fadeTo(200,0, function(){
				that.storeImgSize(imgLoader, i);
				fitting = that.fit(that.settings.images[i].height, that.settings.images[i].width, $(window).height(), $(window).width(), that.getOutMarginH(), that.getOutMarginW());
				that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150, that.appear(i));
				that.arrows();
			});
		},
		appear:function(i){
			clearTimeout(that.settings.timer);
			that.settings.currentImage = i;
			$('#loader').stop().fadeOut(300, function(){
				$('#img').attr('src', that.settings.images[i].src).fadeTo(400,1);
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
			if(!this.settings.fullWindow && (width>=imgWidth || height>=imgHeight)){
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
			}else{
				$('#left, #right').css('display','none');
			}
		},
		storeImgSize: function(img, i) {
			if(!this.settings.images[i].height || !this.settings.images[i].width){
				this.settings.images[i].height = img.height;
				this.settings.images[i].width = img.width;
			}
		},
		close:function(){
			$('#overlay, #loader, #container').fadeOut(200, function(){
				$(this).remove();
			});
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
		openFullScreen:function(){
			if(this.settings.fullScreen){
				var docElm = document.documentElement;
				if (docElm.requestFullscreen) {
					docElm.requestFullscreen();
				}
				else if (docElm.mozRequestFullScreen) {
					docElm.mozRequestFullScreen();
				}
				else if (docElm.webkitRequestFullScreen) {
					docElm.webkitRequestFullScreen();
				}
			}
		},
		events : function(){
			$(document).off('keydown').on('keydown', function(e){
				switch(e.keyCode){
					case 37:
					that.change(-1);
					break;
					case 39:
					that.change(1);
					break;
					case 27:
					that.close();
					break;
				};
			});
			$(this.settings.next).off('click').on('click', function(){
				that.change(+1);	
			});
			$(this.settings.prev).off('click').on('click', function(){
				that.change(-1);	
			});
			$('#overlay').off('click').on('click', function(){
				that.close();	
			});
			$(window).off('resize').on('resize', function(){
				that.tool_debounce(100, function(){
					fitting = that.fit(that.settings.images[that.settings.currentImage].height, that.settings.images[that.settings.currentImage].width, $(window).height(), $(window).width(), that.getOutMarginH(), that.getOutMarginW());
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
		calls++;
		img = [];
		// store images of the set
		this.each(function () {
			img.push({
				title : $(this).attr('title'),
				src : $(this).attr('href'),
				height : false,
				width : false
			})
		});
		options = $.extend(options, {setIndex:calls, images : img, setTitle : ''});

		//attach init event
		this.each(function (i) {
			$(this).off('click').on('click', function(event){
				event.preventDefault();
				$.data(this, 'plugin_' + pluginName, new Plugin( this, $.extend(options, {currentImage : i})));
			});
		});
		
		return this;
	}
})( jQuery, window, document );
