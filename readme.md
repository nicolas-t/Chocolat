The new version is finished, you can test it here : 
-----------
https://github.com/nicolas-t/Chocolat/
-----------

##Chocolat
-----------
Chocolat is a simple `jQuery` lightbox plugin

#### Dependencies

Except jQuery. https://github.com/jquery/jquery

#### Compatibility
recent browsers such as :
IE 7+, Safari, Firefox & Chrome.

##Demo
-----------
http://chocolat.insipi.de/en/Demonstration/

##Markup
-----------
```html
<p id="example1">
	<a href="1.jpg" title="Rose" rel="title1">
		<img width="100" src="thumb/1.jpg" />
	</a>
	<a href="2.jpg" title="Black">
		<img width="100" src="thumb/2.jpg" />
	</a>
	<a href="3.jpg" title="Orange">
		<img width="100" src="thumb/3.jpg"/>
	</a>
</p>
```

```js
$(document).ready(function(){
	$('#example1 a').Chocolat();
});
```

##Documentation
-----------
http://chocolat.insipi.de/en/Documentation/

###### General
**container:** `default:$('body')`  
Sets whether viewer will open and fill the whole page (`default`)  , or whether it should open in a particular block of the page. For example ` $('# container')`  in this case the height and width of the block must be defined.

**displayAsALink :** `default:false`  
Used to group images, from the same call, in a single link that replaces the html code links to the images (`true`). Otherwise (`false`) the html code is not changed and the images of the series may be called individually. In this case the links can be thumbnails or text.

**linkImages :**   `default : true `  
Sets whether we can switch from one image to another, within the same call, without closing the viewer (`true`) , or if the images remain independent (`false`).
Warning: if `LinkImage`: is `false` then `displayAsALink` must be worth `false` too. Otherwise we can only view the first image in the set.

**linksContainer :**  `default : Choco_links_container`  
This parameter must be the id of an element `ul` . When `displayAsALink`: is set to `true` this parameter define in which element the link calling the series will be created. If not set the link will be created before the element on which chocolat is called.

###### Appearance
**overlayOpacity :**  `default : 0.9`  
 Opacity of the background that covers the surface of the `container` (the whole page in most cases).

**overlayColor :**  `default : #fff`  
Css value of the background color, ( `rgb ()` , `hexadecimal` , or `name` ).

**fadeInOverlayduration :**  `default : 500`  
Background fade in duration, in `milliseconds`, or `slow` , `fast`.
 
**fadeInImageduration :**  `default : 500`  
Background fade in duration, in `milliseconds`, or `slow` , `fast`.

**fadeInImageduration :**  `default : 500`  
Image fade in duration, in `milliseconds`, or `slow` , `fast`.

**fadeOutImageduration :**  `default : 500`  
Image fade out duration, in `milliseconds`, or `slow` , `fast`.

**vache :**  `default : true`  
Sets whether a click on the background closes (`true`) or not (`false`) the viewer.

**separator1 :**  `default : "|"`  
Text between the title of the set and its position within the set, does not matter.

**separator2 :**  `default : "/"`  
Text between the number of the image and the number of images in the set, does not matter. 

###### Images
**leftImg  :**  `default : "images/left.gif"`  
 Path to image: left arrow. 

**rightImg  :**  `default : "images/right.gif"`  
 Path to image: right arrow. 

**closeImg  :**  `default : "images/close.gif"`  
 Path to image: close cross. 

**loadingImg  :**  `default : "images/loading.gif"`   
 Path to image: loading indicator. 

###### parameters
**currentImage  :**  `default : 0`  
Rank of the image that you want to start the series.
 
**setIndex  :**  `default : 0`   
Set index. yes.
 
**setTitle  :**  `default : ""`  
 Sets the title of the set. The default title is the value of the `rel` attribute of the first image of the set. 


 
 
 