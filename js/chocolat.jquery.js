;(function ( $, window, document, undefined ) {
	var pluginName = 'Chocolat';
	var calls = 0;
	var defaults = {
			container:  	 window,
			next: 			 '#right',
			prev: 			 '#left',
			displayAsALink:  true,
			linksContainer:	 '#links',
			setIndex:		 0,
			setTitle:		 '',
			fullWindow:      true,
			fullScreen:      true,
			linkImages:		 true,
			currentImage:	 0,
			overlayOpacity : 0.5,
			separator1    : '|',
			separator2    : '/',
			timer: 			 false,
			timerDebounce:		 false,
			lastImage: 		 false,
			images :		 []
		};
		
	function Plugin( element, settings ) {
		that = this;
		this.element = element;
		this.settings = settings;
		stg = this.settings;
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	Plugin.prototype = {
		init: function() {
			this.markup();
			this.events();
			$('#overlay, #close').fadeTo(800, stg.overlayOpacity)
			stg.lastImage = stg.images.length - 1;
			this.load(stg.currentImage);
		}, 
		preload: function(i, callback) {
			callback = this.tool_optFuncParam(callback);
			imgLoader = new Image();
			imgLoader.onload = callback(i, imgLoader);
			imgLoader.src = stg.images[i].src;
		},
		load: function(i) {
			stg.timer = setTimeout(function(){$('#loader').fadeIn();},400);
			this.preload(i,this.place);
		},
		place: function(i, imgLoader) {
			stg.currentImage = i;
			that.description();
			that.pagination();
			$('#img').fadeTo(200,0, function(){
				that.storeImgSize(imgLoader, i);
				fitting = that.fit(stg.images[i].height, stg.images[i].width, $(stg.container).height(), $(stg.container).width(), that.getOutMarginH(), that.getOutMarginW());
				that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150, that.appear(i));
				that.arrows();
			});
		},
		appear:function(i){
			clearTimeout(stg.timer);
			$('#loader').stop().fadeOut(300, function(){
				$('#img').attr('src', stg.images[i].src).fadeTo(400,1);
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
			console.log(holderHeight);			
			console.log(holderWidth);			

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
			if(stg.linkImages && ((this.settings.currentImage !== 0 && signe == -1) || (stg.currentImage !== stg.lastImage && signe == 1))) {
				this.load(stg.currentImage + parseInt(signe));
			}
		},
		arrows: function() {
			if(stg.linkImages){
				if(stg.currentImage == stg.lastImage){
					$('#right').fadeOut(300);
				}
				else{
					$('#right').fadeIn(300);
				}
				if(stg.currentImage == 0){
					$('#left').fadeOut(300);
				}
				else{
					$('#left').fadeIn(300);
				}
			}else{
				$('#left, #right').css('display','none');
			}
		},
		description : function(){
			$('#description').fadeTo(200, 0, function(){
				$(this).html(stg.images[stg.currentImage].title).fadeTo(400,1);
			});
		},
		pagination : function(){
			var last = stg.lastImage + 1;
			var position = stg.currentImage + 1;
			var separator = (stg.setTitle == '') ? '' : stg.separator1;
			$('#pagination').fadeTo(200, 0, function(){
				$(this).html(stg.setTitle + ' ' + separator + ' ' + position + stg.separator2 + last).fadeTo(400,1);
			});
		},
		storeImgSize: function(img, i) {
			if(!stg.images[i].height || !stg.images[i].width){
				stg.images[i].height = img.height;
				stg.images[i].width = img.width;
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
			var container = ( typeof stg.container === 'object') ? 'body' : stg.container;
			$(container).append('\
			<div id="overlay"></div>\
			<div id="loader"></div>\
			<div id="container">\
				<img src="" id="img" alt=""/>\
				<div id="top">\
					<span id="close">close</span>\
				</div>\
				<div id="left"></div>\
				<div id="right"></div>\
				<div id="bottom">\
					<span id="description"></span>\
					<span id="pagination"></span>\
				</div>\
			</div>');
			if(this.settings.fullScreen){
				$('#top').prepend('<span id="fullscreen">fullscreen</span>');
			}
			if(this.settings.fullScreen !== window){
				$('#overlay, #container').css('position','absolute');
			}
		},
		openFullScreen:function(){
			if(stg.fullScreen){
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
			$(stg.next).off('click').on('click', function(){
				that.change(+1);	
			});
			$(stg.prev).off('click').on('click', function(){
				that.change(-1);	
			});
			$('#overlay, #close').off('click').on('click', function(){
				that.close();	
			});
			$('#fullscreen').off('click').on('click', function(){
				that.openFullScreen();	
			});
			$(window).off('resize').on('resize', function(){
				that.tool_debounce(100, function(){
					fitting = that.fit(stg.images[stg.currentImage].height, stg.images[stg.currentImage].width, $(stg.container).height(), $(stg.container).width(), that.getOutMarginH(), that.getOutMarginW());
					that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150);
				});
			});
		},
		tool_debounce: function(duration, callback) {
			clearTimeout(stg.timerDebounce);
			stg.timerDebounce = setTimeout(function(){callback();},duration);
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
		settings = $.extend({}, defaults, options, {setIndex:calls, images : img} );
		
		//attach init event, not the best code written so far
		if(settings.displayAsALink){
			$(settings.linksContainer).append('<li><a href="#" id="Choco_numsetIndex_'+settings.setIndex+'" class="Choco_link">'+settings.setTitle+'</a></li>');
			$(this).remove();
			$('#Choco_numsetIndex_'+settings.setIndex).off('click').on('click', function(event){
				event.preventDefault();
				$.data(this, 'plugin_' + pluginName, new Plugin( this, $.extend(settings, {currentImage : 0})));
			});
		}else{
			this.each(function (i) {
				$(this).off('click').on('click', function(event){
					event.preventDefault();
					$.data(this, 'plugin_' + pluginName, new Plugin( this, $.extend(settings, {currentImage : i})));
				});
			});
		}
		return this;
	}
})( jQuery, window, document );
