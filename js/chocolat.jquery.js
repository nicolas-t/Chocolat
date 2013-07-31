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
		loop           :  false,
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

	function Plugin(element, settings) {
		this.element   = element;
		this.settings  = settings;
		this._defaults = defaults;
		this._name     = pluginName;
		that           = this;
		this.init();
	}
	Plugin.prototype = {
		init: function() {
			this.markup();
			this.events();
			that.settings.elems.overlay.fadeTo(800, that.settings.overlayOpacity)
			that.settings.lastImage = that.settings.images.length - 1;
			this.load(that.settings.currentImage);
		}, 
		preload: function(i, callback) {
			callback         = this.tools.optFuncParam(callback);
			imgLoader        = new Image();
			imgLoader.onload = callback(i, imgLoader);
			imgLoader.src    = that.settings.images[i].src;
		},
		load: function(i) {
			that.settings.timer = setTimeout(function(){that.settings.elems.loader.fadeIn();},400);
			this.preload(i,this.place);
		},
		place: function(i, imgLoader) {
			that.settings.currentImage = i;
			that.description();
			that.pagination();
			that.settings.elems.img.fadeTo(200,0, function(){
				that.storeImgSize(imgLoader, i);
				fitting = that.fit(
					that.settings.images[i].height,
					that.settings.images[i].width,
					$(that.settings.container).height(),
					$(that.settings.container).width(),
					that.getOutMarginH(),
					that.getOutMarginW()
				);
				that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150, that.appear(i));
				that.arrows();
			});
		},
		appear:function(i){
			clearTimeout(that.settings.timer);
			that.settings.elems.loader.stop().fadeOut(300, function(){
				that.settings.elems.img.attr('src', that.settings.images[i].src).fadeTo(400,1);
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
			callback = this.tools.optFuncParam(callback);
			that.settings.elems.content.animate({
				'width'  :width,
				'height' :height,
				'left'   :left,
				'top'    :top
			},duration,callback()).css('overflow', 'visible');
		},
		change: function(signe) {
			var requestedImage = that.settings.currentImage + parseInt(signe);
			if(requestedImage > that.settings.lastImage){
				if(that.settings.loop){
					this.load(0);
				}
			}
			else if(requestedImage < 0){
				if(that.settings.loop){
					this.load(that.settings.lastImage);
				}
			}
			else{
				this.load(requestedImage);
			}
		},
		arrows: function() {
			if(that.settings.loop){
				$([that.settings.elems.left[0],that.settings.elems.right[0]]).css('display','block');
			}
			else if(that.settings.linkImages){
				/*right*/
				if(that.settings.currentImage == that.settings.lastImage){
					that.settings.elems.right.fadeOut(300);
				}
				else{
					that.settings.elems.right.fadeIn(300);
				}
				/*left*/
				if(that.settings.currentImage == 0){
					that.settings.elems.left.fadeOut(300);
				}
				else{
					that.settings.elems.left.fadeIn(300);
				}
			}
			else{
				$([that.settings.elems.left[0],that.settings.elems.right[0]]).css('display','none');
			}
		},
		description : function(){
			that.settings.elems.description.fadeTo(200, 0, function(){
				$(this).html(that.settings.images[that.settings.currentImage].title).fadeTo(400,1);
			});
		},
		pagination : function(){
			var last = that.settings.lastImage + 1;
			var position = that.settings.currentImage + 1;
			var separator = (that.settings.setTitle == '') ? '' : that.settings.separator1;
			that.settings.elems.pagination.fadeTo(200, 0, function(){
				$(this).html(that.settings.setTitle + ' ' + separator + ' ' + position + that.settings.separator2 + last).fadeTo(400,1);
			});
		},
		storeImgSize: function(img, i) {
			if(!that.settings.images[i].height || !that.settings.images[i].width){
				that.settings.images[i].height = img.height;
				that.settings.images[i].width  = img.width;
			}
		},
		close:function(){
			$([that.settings.elems.overlay[0],that.settings.elems.loader[0],that.settings.elems.content[0]]).fadeOut(200, function(){
				$(this).remove();
			});
		},
		getOutMarginW: function(el, options) {
			return (that.settings.elems.left.outerWidth() - that.settings.elems.left.width()) + (that.settings.elems.right.outerWidth() - that.settings.elems.right.width());
		},
		getOutMarginH: function(el, options) {
			return that.settings.elems.top.outerHeight() + that.settings.elems.bottom.outerHeight();
		},
		markup: function(){
			var container = ( typeof that.settings.container === 'object') ? 'body' : that.settings.container;

			that.settings.elems.overlay = $('<div/>',{
				'id' : 'chocolat-overlay'
			}).appendTo(container);

			that.settings.elems.loader = $('<div/>',{
				'id' : 'chocolat-loader'
			}).appendTo(container);

			that.settings.elems.content = $('<div/>',{
				'id' : 'chocolat-container'
			}).appendTo(container);

			that.settings.elems.img = $('<img/>',{
				'id' : 'chocolat-img',
				'src' : ''
			}).appendTo(that.settings.elems.content);

			that.settings.elems.top = $('<div/>',{
				'id' : 'chocolat-top'
			}).appendTo(that.settings.elems.content);

			that.settings.elems.left = $('<div/>',{
				'id' : 'chocolat-left'
			}).appendTo(that.settings.elems.content);

			that.settings.elems.right = $('<div/>',{
				'id' : 'chocolat-right'
			}).appendTo(that.settings.elems.content);

			that.settings.elems.bottom = $('<div/>',{
				'id' : 'chocolat-bottom'
			}).appendTo(that.settings.elems.content);

			that.settings.elems.description = $('<span/>',{
				'id' : 'chocolat-description'
			}).appendTo(that.settings.elems.bottom);

			that.settings.elems.pagination = $('<span/>',{
				'id' : 'chocolat-pagination'
			}).appendTo(that.settings.elems.bottom);

			that.settings.elems.close = $('<span/>',{
				'id' : 'chocolat-close'
			}).appendTo(that.settings.elems.top);

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

			if(that.settings.fullScreen){
				that.settings.elems.fullscreen = $('<span/>',{
					'id' : 'chocolat-fullscreen'
				})
				.off('click').on('click', function(){
					that.openFullScreen();	
				})
				.appendTo(that.settings.elems.top);
			}
			if(that.settings.container !== window){
				$([that.settings.elems.overlay[0], that.settings.elems.content[0]]).css('position','absolute');
			}
		},
		openFullScreen:function(){
			if(that.settings.fullScreen){
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
			$(that.settings.next).off('click').on('click', function(){
				that.change(+1);	
			});
			$(that.settings.prev).off('click').on('click', function(){
				that.change(-1);	
			});
			$([that.settings.elems.overlay[0], that.settings.elems.close[0]]).off('click').on('click', function(){
				that.close();	
			});
			$(window).off('resize').on('resize', function(){
				that.tools.debounce(100, function(){
					fitting = that.fit(	
						that.settings.images[that.settings.currentImage].height,
						that.settings.images[that.settings.currentImage].width,
						$(that.settings.container).height(),
						$(that.settings.container).width(),
						that.getOutMarginH(),
						that.getOutMarginW()
					);
					that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150);
				});
			});
		},
		tools : {
			debounce: function(duration, callback) {
				clearTimeout(that.settings.timerDebounce);
				that.settings.timerDebounce = setTimeout(function(){callback();},duration);
			},
			optFuncParam: function(f) {
				if(!$.isFunction(f)){return function(){};} 
				else{return f;}
			}
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
