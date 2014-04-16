##Contribute
-----------  
You are viewing the version 0.4.x of chocolat.  
Feel free to contribute by forking then making a pull request.  

##Chocolat
-----------
Chocolat is a simple `jQuery` lightbox plugin

#### Dependencies

Except jQuery : https://github.com/jquery/jquery

#### Compatibility
recent browsers such as :
IE 7+, Safari, Firefox & Chrome.

##Demo
-----------
Dev version, clone it to see a demo  

##Markup
-----------
```html
<div id="example1">
    <a class="chocolat-image" href="img/a.jpg" title="image title a">
        A
    </a>
    <a class="chocolat-image" href="img/b.jpg" title="image title b">
        B
    </a>
</div>
```

```js
$(document).ready(function(){
    $('#example1').Chocolat();
});
```

##Documentation
-----------

### Parameters
**container:** `default:window`  
Sets whether viewer will open and fill the whole page (`default`)  , or whether it should open in a particular block of the page. For example ` #container2`  in this case the height and width of the block must be defined.  

**linkImages :**   `default : true `  
Sets whether we can switch from one image to another, within the same call, without closing the viewer (`true`) , or if the images remain independent (`false`).
Warning: if `LinkImage`: is `false` then `displayAsALink` must be worth `false` too. Otherwise we can only view the first image in the set.   
  
**imageSelector :** `default : .chocolat-image`  
Selector to find images in the parent element (on which chocolat is called) 
  
**displayAsALink :** `default:false`  
Used to group images, from the same call, in a single link that replaces the html code links to the images (`true`). Otherwise (`false`) the html code is not changed and the images of the series may be called individually. In this case the links can be thumbnails or text.  
  
**linksContainer :**  `default : .chocolat-links`  
This parameter must be the selector of an element `ul` . When `displayAsALink`: is set to `true` this parameter define in which element the link calling the series will be created. If not set the link will be created before the element on which chocolat is called.  
  
**setTitle :**  `default : ""`  
title of the set.  
  
**fullWindow :**  `default : false`  
Can be `false`, `'contain'`, or `'cover'`.  
`false` : if the image is bigger than the window it's resized to fit, else if the image is smaller than the window it's not streched, only displayed at native dimensions  
`'contain'` :  if the image is bigger than the window it's resized to fit, else if the image is smaller than the window it's streched, to fit the window  
`'cover'` :  the image cover the window, no white space are displayed. (only if container == window)  
more informations & exemple about contain/cover : http://www.w3schools.com/cssref/css3_pr_background-size.asp   
  
**fullScreen :**  `default : false`  
HTML5 new feature. Hides the browser. 
  
**loop :**  `default : false`  
Last image + 1 leads to first image & first image - 1 leads to last image.  
  
**mobileBreakpoint :**  `default : 480`  
pixels. width of the container when activating the compact view.   
  
**firstImage  :**  `default : 0`  
Index of the image that you want to start the series.  
  
**lastImage  :**  `default : 0`  
Index of the image that you want to end the series.  
  
**separator1 :**  `default : "|"`  
Text between the title of the set and its position within the set, does not matter.
  
**separator2 :**  `default : "/"`  
Text between the number of the image and the number of images in the set, does not matter. 
  
**image  :**  `default : 0`  
Array of object representing the set images `[{title, src, height, width}, {}, ...]`  
   
**setIndex  :**  `default : 0`   
Set index. yes.
   
### API

###### Syntax
Call chocolat like this :  
```js
$(document).ready(function(){
    var instance = $('#example1').Chocolat().data('api-chocolat');
});
```

Then API calls can be made like this (open for exemple):  
```js
instance.open();
```
  
###### Methods
**open  :**  `param (optionnal) : i`   
Open the lightbox on the image whose index is `i`.  
By default on the first image (i=0).  

**close  :**    
Close the lightbox.  

**prev  :**    
Change image backward.  
  
**next  :**    
Change image forward.  
  
**goto  :**  `param : i`   
(Alias of open)  go to image whose index is `i` on an already opened ligthbox.  

**current  :**  
Returns the index of the current image.  
 
### CSS Classes

**.chocolat-open  :**  
Set to the container when the lightbox is open.  

**.chocolat-mobile  :**  
Set to the container when its width is inferior to `480px` (or `mobileBreakpoint`)  

**.chocolat-in-container  :**  
Set to the container when chocolat is open in a block (`container != window`)  
  
**.chocolat-cover  :**  
Set to the container when chocolat `fullWindow` is set to `'cover'`