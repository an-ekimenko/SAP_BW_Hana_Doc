;(function(jQuery,$,window){'use strict';function detectIE(){var ua=window.navigator.userAgent;var msie=ua.indexOf('MSIE ');var trident=ua.indexOf('Trident/');if(msie>0||trident>0)
return true;return false;}
function supportsTransitions(){var b=document.body||document.documentElement,s=b.style,p='transition';if(typeof s[p]=='string'){$("html").addClass("csstransformspreserve3d");return true;}
var v=['Moz','webkit','Webkit','Khtml','O','ms'];p=p.charAt(0).toUpperCase()+p.substr(1);for(var i=0;i<v.length;i++){if(typeof s[v[i]+p]=='string'){$("html").addClass("csstransformspreserve3d");return true;}}
$("html").addClass("no-csstransformspreserve3d");return false;}
function getVendorPrefix(){var ua=navigator.userAgent.toLowerCase(),match=/opera/.exec(ua)||/msie/.exec(ua)||/firefox/.exec(ua)||/(chrome|safari)/.exec(ua),vendors={opera:'o',chrome:'webkit',safari:'webkit',firefox:'moz',msie:'ms'};if(match==null||typeof match[0]=="undefined"||typeof vendors[match[0]]=="undefined")
return"ms";return vendors[match[0]];}
var support={transitions:supportsTransitions(),preserve3d:!detectIE()},transEndEventNames={'webkit':'webkitTransitionEnd','moz':'transitionend','o':'oTransitionEnd','ms':'MSTransitionEnd','transition':'transitionend'},transEndEventName=transEndEventNames[getVendorPrefix()];function extend(a,b){for(var key in b){if(b.hasOwnProperty(key)){a[key]=b[key];}}
return a;}
function shuffleMArray(marray){if(typeof marray=="undefined"||typeof marray[0]=="undefined")
return false;var arr=[],marrlen=marray.length,inArrLen=marray[0].length;for(var i=0;i<marrlen;i++){arr=arr.concat(marray[i]);}
arr=shuffleArr(arr);var newmarr=[],pos=0;for(var j=0;j<marrlen;j++){var tmparr=[];for(var k=0;k<inArrLen;k++){tmparr.push(arr[pos]);pos++;}
newmarr.push(tmparr);}
return newmarr;}
function shuffleArr(array){var m=array.length,t,i;while(m){i=Math.floor(Math.random()*m--);t=array[m];array[m]=array[i];array[i]=t;}
return array;}
function Photostack(el,options){this.el=el;this.inner=this.el.querySelector('div');this.allItems=[].slice.call(this.inner.children);this.allItemsCount=this.allItems.length;if(!this.allItemsCount)return;this.items=[].slice.call(this.inner.querySelectorAll('figure:not([data-dummy])'));this.itemsCount=this.items.length;this.current=0;this.options=extend({},this.options);extend(this.options,options);this._init();}
Photostack.prototype.options={};Photostack.prototype._init=function(){this.currentItem=this.items[this.current];this._addNavigation();this._getSizes();this._initEvents();}
Photostack.prototype._addNavigation=function(){this.nav=document.createElement('nav')
var inner='';for(var i=0;i<this.itemsCount;++i){inner+='<span></span>';}
this.nav.innerHTML=inner;this.el.appendChild(this.nav);this.navDots=[].slice.call(this.nav.children);}
Photostack.prototype._initEvents=function(){var self=this,beforeStep=$(this.el).hasClass('photostack-start'),open=function(){var setTransition=function(){if(support.transitions){$(self.el).addClass('photostack-transition');}}
if(beforeStep){this.removeEventListener('click',open);$(self.el).removeClass('photostack-start');setTransition();}
else{self.openDefault=true;setTimeout(setTransition,25);}
self.started=true;self._showPhoto(self.current);};if(beforeStep){this._shuffle();this.el.addEventListener('click',open);}
else{open();}
this.navDots.forEach(function(dot,idx){dot.addEventListener('click',function(){if(idx===self.current){self._rotateItem();}
else{var callback=function(){self._showPhoto(idx);}
if(self.flipped){self._rotateItem(callback);}
else{callback();}}});});}
Photostack.prototype._resizeHandler=function(){var self=this;function delayed(){self._resize();self._resizeTimeout=null;}
if(this._resizeTimeout){clearTimeout(this._resizeTimeout);}
this._resizeTimeout=setTimeout(delayed,100);}
Photostack.prototype._resize=function(){var self=this,callback=function(){self._shuffle(true);}
this._getSizes();if(this.started&&this.flipped){this._rotateItem(callback);}
else{callback();}}
Photostack.prototype._showPhoto=function(pos){if(this.isShuffling){return false;}
this.isShuffling=true;if($(this.currentItem).hasClass('photostack-flip')){this._removeItemPerspective();$(this.navDots[this.current]).removeClass('flippable');}
$(this.navDots[this.current]).removeClass('current');$(this.currentItem).removeClass('photostack-current');this.current=pos;this.currentItem=this.items[this.current];$(this.navDots[this.current]).addClass('current');if(this.currentItem.querySelector('.photostack-back')){$(this.navDots[pos]).addClass('flippable');}
this._shuffle();}
Photostack.prototype._shuffle=function(resize){var iter=resize?1:this.currentItem.getAttribute('data-shuffle-iteration')||1;if(iter<=0||!this.started||this.openDefault){iter=1;}
if(this.openDefault){$(this.currentItem).addClass('photostack-flip');this.openDefault=false;this.isShuffling=false;}
var overlapFactor=.5,lines=Math.ceil(this.sizes.inner.width/(this.sizes.item.width*overlapFactor)),columns=Math.ceil(this.sizes.inner.height/(this.sizes.item.height*overlapFactor)),addX=lines*this.sizes.item.width*overlapFactor+this.sizes.item.width/2-this.sizes.inner.width,addY=columns*this.sizes.item.height*overlapFactor+this.sizes.item.height/2-this.sizes.inner.height,extraX=addX/2,extraY=addY/2,maxrot=35,minrot=-35,self=this,moveItems=function(){--iter;var grid=[];for(var i=0;i<columns;++i){var col=grid[i]=[];for(var j=0;j<lines;++j){var xVal=j*(self.sizes.item.width*overlapFactor)-extraX,yVal=i*(self.sizes.item.height*overlapFactor)-extraY,olx=0,oly=0;if(self.started&&iter===0){var ol=self._isOverlapping({x:xVal,y:yVal});if(ol.overlapping){olx=ol.noOverlap.x;oly=ol.noOverlap.y;var r=Math.floor(Math.random()*3);switch(r){case 0:olx=0;break;case 1:oly=0;break;}}}
col[j]={x:xVal+olx,y:yVal+oly};}}
grid=shuffleMArray(grid);var l=0,c=0,cntItemsAnim=0;self.allItems.forEach(function(item,i){if(l===lines-1){c=c===columns-1?0:c+1;l=1;}
else{++l}
var randXPos=Math.floor(Math.random()*lines),randYPos=Math.floor(Math.random()*columns),gridVal=grid[c][l-1],translation={x:gridVal.x,y:gridVal.y},onEndTransitionFn=function(){++cntItemsAnim;if(support.transitions){this.removeEventListener(transEndEventName,onEndTransitionFn);}
if(cntItemsAnim===self.allItemsCount){if(iter>0){moveItems.call();}
else{$(self.currentItem).addClass('photostack-flip');self.isShuffling=false;if(typeof self.options.callback==='function'){self.options.callback(self.currentItem);}}}};if(self.items.indexOf(item)===self.current&&self.started&&iter===0){self.currentItem.style.WebkitTransform='translate('+self.centerItem.x+'px,'+self.centerItem.y+'px) rotate(0deg)';self.currentItem.style.msTransform='translate('+self.centerItem.x+'px,'+self.centerItem.y+'px) rotate(0deg)';self.currentItem.style.transform='translate('+self.centerItem.x+'px,'+self.centerItem.y+'px) rotate(0deg)';if(self.currentItem.querySelector('.photostack-back')){self._addItemPerspective();}
$(self.currentItem).addClass('photostack-current');}
else{item.style.WebkitTransform='translate('+translation.x+'px,'+translation.y+'px) rotate('+Math.floor(Math.random()*(maxrot-minrot+1)+minrot)+'deg)';item.style.msTransform='translate('+translation.x+'px,'+translation.y+'px) rotate('+Math.floor(Math.random()*(maxrot-minrot+1)+minrot)+'deg)';item.style.transform='translate('+translation.x+'px,'+translation.y+'px) rotate('+Math.floor(Math.random()*(maxrot-minrot+1)+minrot)+'deg)';}
if(self.started){if(support.transitions){item.addEventListener(transEndEventName,onEndTransitionFn);}
else{onEndTransitionFn();}}});};moveItems.call();}
Photostack.prototype._getSizes=function(){this.sizes={inner:{width:this.inner.offsetWidth,height:this.inner.offsetHeight},item:{width:this.currentItem.offsetWidth,height:this.currentItem.offsetHeight}};this.centerItem={x:this.sizes.inner.width/2-this.sizes.item.width/2,y:this.sizes.inner.height/2-this.sizes.item.height/2};}
Photostack.prototype._isOverlapping=function(itemVal){var dxArea=this.sizes.item.width+this.sizes.item.width/3,dyArea=this.sizes.item.height+this.sizes.item.height/3,areaVal={x:this.sizes.inner.width/2-dxArea/2,y:this.sizes.inner.height/2-dyArea/2},dxItem=this.sizes.item.width,dyItem=this.sizes.item.height;if(!((itemVal.x+dxItem)<areaVal.x||itemVal.x>(areaVal.x+dxArea)||(itemVal.y+dyItem)<areaVal.y||itemVal.y>(areaVal.y+dyArea))){var left=Math.random()<0.5,randExtraX=Math.floor(Math.random()*(dxItem/4+1)),randExtraY=Math.floor(Math.random()*(dyItem/4+1)),noOverlapX=left?(itemVal.x-areaVal.x+dxItem)*-1-randExtraX:(areaVal.x+dxArea)-(itemVal.x+dxItem)+dxItem+randExtraX,noOverlapY=left?(itemVal.y-areaVal.y+dyItem)*-1-randExtraY:(areaVal.y+dyArea)-(itemVal.y+dyItem)+dyItem+randExtraY;return{overlapping:true,noOverlap:{x:noOverlapX,y:noOverlapY}}}
return{overlapping:false}}
Photostack.prototype._addItemPerspective=function(){$(this.el).addClass('photostack-perspective');}
Photostack.prototype._removeItemPerspective=function(){$(this.el).removeClass('photostack-perspective');$(this.currentItem).removeClass('photostack-flip');}
Photostack.prototype._rotateItem=function(callback){if($(this.el).hasClass('photostack-perspective')&&!this.isRotating&&!this.isShuffling){this.isRotating=true;var self=this,onEndTransitionFn=function(){if(support.transitions&&support.preserve3d){this.removeEventListener(transEndEventName,onEndTransitionFn);}
self.isRotating=false;if(typeof callback==='function'){callback();}};if(this.flipped){$(this.navDots[this.current]).removeClass('flip');if(support.preserve3d){this.currentItem.style.WebkitTransform='translate('+this.centerItem.x+'px,'+this.centerItem.y+'px) rotateY(0deg)';this.currentItem.style.transform='translate('+this.centerItem.x+'px,'+this.centerItem.y+'px) rotateY(0deg)';}
else{$(this.currentItem).removeClass('photostack-showback');}}
else{$(this.navDots[this.current]).addClass('flip');if(support.preserve3d){this.currentItem.style.WebkitTransform='translate('+this.centerItem.x+'px,'+this.centerItem.y+'px) translate('+this.sizes.item.width+'px) rotateY(-179.9deg)';this.currentItem.style.transform='translate('+this.centerItem.x+'px,'+this.centerItem.y+'px) translate('+this.sizes.item.width+'px) rotateY(-179.9deg)';}
else{$(this.currentItem).addClass('photostack-showback');}}
this.flipped=!this.flipped;if(support.transitions&&support.preserve3d){this.currentItem.addEventListener(transEndEventName,onEndTransitionFn);}
else{onEndTransitionFn();}}}
window.Photostack=Photostack;})(jQuery,jQuery,window);