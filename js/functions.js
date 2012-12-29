$(document).ready(function(){
	var timeOut = false;
	var imgOrigHeight = false;
	var imgOrigWidth = false;
	var fullScreen = false;
	images = ['images/1.jpg','images/2.jpg'];
	settings = {};
	settings.linkImages = true;
	settings.currentImage = false;
	settings.lastImage = images.length - 1;

	load(0);

	function preload(i, callback){
		callback = tool_optFuncParam(callback);
		imgLoader = new Image();
		imgLoader.onload = callback(i, imgLoader);
		imgLoader.src = images[i];
	}
	function load(i){
		preload(i, appear);
	}
	function appear(i, imgLoader){
		$('#img').fadeTo(400,0, function(){
			settings.currentImage = i;
			storeImgSize(imgLoader);
			fitting = fit(imgOrigHeight, imgOrigWidth, $(window).height(), $(window).width(), getOutMarginH(), getOutMarginW());
			center(fitting.width, fitting.height, fitting.left, fitting.top, 150, function(){ $('#img').attr('src', images[i]).fadeTo(400,1);});
			arrows();
		});
	}
	function fit(imgHeight, imgWidth, holderHeight, holderWidth, holderOutMarginH, holderOutMarginW)
	{ 
		var holderGlobalWidth = holderWidth-holderOutMarginW; 
		var holderGlobalHeight = holderHeight-holderOutMarginH; 
		var holderRatio = (holderGlobalHeight / holderGlobalWidth ); 
		var imgRatio = (imgHeight / imgWidth); 
		if(imgRatio>holderRatio) 
		{ 
			height = holderGlobalHeight;
			width = height / imgRatio;
		} 
		else 
		{ 
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
	}
	function center(width, height, left, top, duration, callback){
		callback = tool_optFuncParam(callback);		
		$('#container').animate({
			'width':width,
			'height':height,
			'left':left,
			'top':top
		},duration,callback()).css('overflow', 'visible');
	}
	function change(signe){
		if(settings.linkImages && (settings.currentImage == 0 && signe !== -1) || (settings.currentImage == settings.lastImage && signe !== 1))
		{
			load(settings.currentImage + parseInt(signe));
		}
	}
	function arrows(){
		if(settings.linkImages){
			var what = ['right','left'];
			for(var i=0; i < what.length; i++){
				hide = false;
				if(what[i] == 'right' && settings.currentImage == settings.lastImage){
					hide = true;
					$('#'+what[i]).fadeOut(300);
				}
				else if(what[i] == 'left' && settings.currentImage == 0){
					hide = true;
					$('#'+what[i]).fadeOut(300);
				}
				if(!hide){
					$('#'+what[i]).fadeIn(settings.fadeOutImageduration);
				}
			}
		}
	}
	function storeImgSize(img){
		imgOrigHeight = img.height;
		imgOrigWidth = img.width;
	}
	function getOutMarginW(){
		return ($('#left').outerWidth() - $('#left').width()) + ($('#right').outerWidth() - $('#right').width());
	}
	function getOutMarginH(){
		return $('#top').outerHeight() + $('#bottom').outerHeight();
	}
	function tool_debounce(duration, callback){
		clearTimeout(timeOut);
		timeOut = setTimeout(function(){callback();},duration);
	}
	function tool_optFuncParam(f){
		if(!$.isFunction(f)){return function(){};} 
		else{return f;}
	}
	
	/*events*/
	$('#right').on('click', function(){
		change(+1);	
	});
	$('#left').on('click', function(){
		change(-1);	
	});
	$(window).on('resize', function(){
		tool_debounce(100, function(){
			fitting = fit(imgOrigHeight, imgOrigWidth, $(window).height(), $(window).width(), getOutMarginH(), getOutMarginW());
			center(fitting.width, fitting.height, fitting.left, fitting.top, 150);
		});
	});
});