;(function ( $, window, document, undefined ) {
	var pluginName = 'Chocolat';
	var calls = 0;
	var defaults = {
		container      :  window,
		next           :  '#chocolat-right',
		prev           :  '#chocolat-left',
		displayAsALink :  false,
		linksContainer :  '#links',
		setIndex       :  0,
		setTitle       :  '',
		fullWindow     :  false,
		fullScreen     :  false,
		linkImages     :  true,
		currentImage   :  0,
		overlayOpacity :  0.5,
		separator1     :  '|',
		separator2     :  '/',
		timer          :  false,
		timerDebounce  :  false,
		lastImage      :  false,
		elems          :  {},
		images         :  []
	};

	function Plugin( element, settings ) {
		that           = this;
		this.element   = element;
		this.settings  = settings;
		stg            = this.settings;
		this._defaults = defaults;
		this._name     = pluginName;
		this.init();
	}
	Plugin.prototype = {
		init: function() {
			this.markup();
			this.events();
			stg.elems.overlay.fadeTo(800, stg.overlayOpacity)
			stg.lastImage = stg.images.length - 1;
			this.load(stg.currentImage);
		}, 
		preload: function(i, callback) {
			callback         = this.tool_optFuncParam(callback);
			imgLoader        = new Image();
			imgLoader.onload = callback(i, imgLoader);
			imgLoader.src    = stg.images[i].src;
		},
		load: function(i) {
			stg.timer = setTimeout(function(){stg.elems.loader.fadeIn();},400);
			this.preload(i,this.place);
		},
		place: function(i, imgLoader) {
			stg.currentImage = i;
			that.description();
			that.pagination();
			stg.elems.img.fadeTo(200,0, function(){
				that.storeImgSize(imgLoader, i);
				fitting = that.fit(
					stg.images[i].height,
					stg.images[i].width,
					$(stg.container).height(),
					$(stg.container).width(),
					that.getOutMarginH(),
					that.getOutMarginW()
				);
				that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150, that.appear(i));
				that.arrows();
			});
		},
		appear:function(i){
			clearTimeout(stg.timer);
			stg.elems.loader.stop().fadeOut(300, function(){
				stg.elems.img.attr('src', stg.images[i].src).fadeTo(400,1);
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
			if(!this.settings.fullWindow && (width >= imgWidth || height >= imgHeight)){
				width=imgWidth;
				height=imgHeight;
			}
			return {
				'height' : height,
				'width'  : width,
				'top'    : (holderHeight - height)/2,
				'left'   : (holderWidth - width)/2
			}
		},
		center: function(width, height, left, top, duration, callback) {
			callback = this.tool_optFuncParam(callback);
			stg.elems.content.animate({
				'width'  :width,
				'height' :height,
				'left'   :left,
				'top'    :top
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
					stg.elems.right.fadeOut(300);
				}
				else{
					stg.elems.right.fadeIn(300);
				}
				if(stg.currentImage == 0){
					stg.elems.left.fadeOut(300);
				}
				else{
					stg.elems.left.fadeIn(300);
				}
			}else{
				$([stg.elems.left[0],stg.elems.right[0]]).css('display','none');
			}
		},
		description : function(){
			stg.elems.description.fadeTo(200, 0, function(){
				$(this).html(stg.images[stg.currentImage].title).fadeTo(400,1);
			});
		},
		pagination : function(){
			var last = stg.lastImage + 1;
			var position = stg.currentImage + 1;
			var separator = (stg.setTitle == '') ? '' : stg.separator1;
			stg.elems.pagination.fadeTo(200, 0, function(){
				$(this).html(stg.setTitle + ' ' + separator + ' ' + position + stg.separator2 + last).fadeTo(400,1);
			});
		},
		storeImgSize: function(img, i) {
			if(!stg.images[i].height || !stg.images[i].width){
				stg.images[i].height = img.height;
				stg.images[i].width  = img.width;
			}
		},
		close:function(){
			$([stg.elems.overlay[0],stg.elems.loader[0],stg.elems.content[0]]).fadeOut(200, function(){
				$(this).remove();
			});
		},
		getOutMarginW: function(el, options) {
			return (stg.elems.left.outerWidth() - stg.elems.left.width()) + (stg.elems.right.outerWidth() - stg.elems.right.width());
		},
		getOutMarginH: function(el, options) {
			return stg.elems.top.outerHeight() + stg.elems.bottom.outerHeight();
		},
		markup: function(){
			var container = ( typeof stg.container === 'object') ? 'body' : stg.container;
			stg.elems.overlay = $('<div/>',{
				'id' : 'chocolat-overlay'
			}).appendTo(container);

			stg.elems.loader = $('<div/>',{
				'id' : 'chocolat-loader'
			}).appendTo(container);

			stg.elems.content = $('<div/>',{
				'id' : 'chocolat-container'
			}).appendTo(container);

			stg.elems.img = $('<img/>',{
				'id' : 'chocolat-img',
				'src' : ''
			}).appendTo(stg.elems.content);

			stg.elems.top = $('<div/>',{
				'id' : 'chocolat-top'
			}).appendTo(stg.elems.content);

			stg.elems.left = $('<div/>',{
				'id' : 'chocolat-left'
			}).appendTo(stg.elems.content);

			stg.elems.right = $('<div/>',{
				'id' : 'chocolat-right'
			}).appendTo(stg.elems.content);

			stg.elems.bottom = $('<div/>',{
				'id' : 'chocolat-bottom'
			}).appendTo(stg.elems.content);

			stg.elems.description = $('<span/>',{
				'id' : 'chocolat-description'
			}).appendTo(stg.elems.bottom);

			stg.elems.pagination = $('<span/>',{
				'id' : 'chocolat-pagination'
			}).appendTo(stg.elems.bottom);

			stg.elems.close = $('<span/>',{
				'id' : 'chocolat-close'
			}).appendTo(stg.elems.top);

			/* HTML MARKUP MEMO
			<div id="chocolat-overlay"></div>
			<div id="chocolat-loader"></div>
			<div id="chocolat-container">
				<img src="" id="chocolat-img" alt=""/>
				<div id="chocolat-top">
					<span id="chocolat-close"></span>
				</div>
				<div id="chocolat-left"></div>
				<div id="chocolat-right"></div>
				<div id="chocolat-bottom">
					<span id="chocolat-description"></span>
					<span id="chocolat-pagination"></span>
				</div>
			</div>
			*/

			if(stg.fullScreen){
				stg.elems.fullscreen = $('<span/>',{
					'id' : 'chocolat-fullscreen'
				})
				.off('click').on('click', function(){
					that.openFullScreen();	
				})
				.appendTo(stg.elems.top);
			}
			if(stg.container !== window){
				$([stg.elems.overlay[0], stg.elems.content[0]]).css('position','absolute');
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
			$([stg.elems.overlay[0], stg.elems.close[0]]).off('click').on('click', function(){
				that.close();	
			});
			$(window).off('resize').on('resize', function(){
				that.tool_debounce(100, function(){
					fitting = that.fit(	
						stg.images[stg.currentImage].height,
						stg.images[stg.currentImage].width,
						$(stg.container).height(),
						$(stg.container).width(),
						that.getOutMarginH(),
						that.getOutMarginW()
					);
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
				title  : $(this).attr('title'),
				src    : $(this).attr('href'),
				height : false,
				width  : false
			})
		});
		settings = $.extend({}, defaults, options, {setIndex:calls, images : img} );
		
		if(settings.displayAsALink){
			var li = $('<li/>',{
				'id' : 'chocolat-overlay'
			}).appendTo(settings.linksContainer);

			var link = $('<a/>',{
				'id'    : 'chocolat-numsetIndex_'+settings.setIndex,
				'href'  : '#',
				'class' : 'chocolat-link'
			})
			.html(settings.setTitle)
			.off('click')
			.on('click', function(event){
				event.preventDefault();
				$.data(this, 'plugin_' + pluginName, new Plugin( this, $.extend(settings, {currentImage : 0})));
			})
			.appendTo(li);

			$(this).remove();

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
