var plancheAuto,plancheAutoHide,planche={elements:{},options:{showTime:2000,startDelay:4000,numberOfViews:1,closeButtonClosesShow:!0},showTimeout:0,restartAnimTimeout:0,autoShowTimeout:0,flags:{shown:!1,displayCounter:0,active:!0},onComplete:null,noImage:!1,showItTimeout:0,initPlanche:function(options){o=planche.options;o=$.extend(o,options);if(o.boardAggressive){o.showTime=2500;o.startDelay=0;o.numberOfViews=-1;o.plancheInterval=undefined;o.closeButtonClosesShow=!1}
e=planche.elements;planche.cachePlancheElem();planche.bindPlancheUIActions();planche.plancheAnim.hidden();e.plancheClose.css('user-select','none');e.planche.css('user-select','none');if(o.startDelay>0){planche.enabled=planche.flags.active=!1;setTimeout(function(){planche.enabled=planche.flags.active=!0;o.startDelay=0;initAnim()},o.startDelay)}else{planche.enabled=!0;initAnim()}
function initAnim(){if(!o.enlargerAnimEnabled||o.enlargeHover)planche.autoShow()}},cachePlancheElem:function(){e.planche=$('#banner-planche'),e.plancheClose=$('.planche-close')},bindPlancheUIActions:function(){e.planche.on('mouseover, mouseenter',function(ev){if(planche.flags.shown){clearTimeout(planche.showTimeout)}
ev.preventDefault()});e.banner.on('mouseleave',function(ev){if(o.enlargerAnimEnabled&&!o.enlargeHover){planche.enabled=!1}
if(planche.flags.shown)planche.plancheAnim.hide();if(!planche.flags.active)return;planche.restartAnimTimeout=setTimeout(function(){planche.enabled=planche.flags.active;if((!o.enlargerAnimEnabled||o.enlargeHover)&&!banner.flags.theEnd){planche.autoShow()}},6000)});e.banner.on('mouseenter',function(ev){if(!planche.flags.active)return;clearTimeout(planche.restartAnimTimeout);if((!o.enlargerAnimEnabled||o.enlargeHover)&&!banner.flags.theEnd){clearTimeout(planche.autoShowTimeout)}});e.plancheClose.on('click',function(ev){planche.plancheAnim.hide();if(o.closeButtonClosesShow)planche.enabled=planche.flags.active=!1})},showIt:function(el,ok,t,onComplete){t=t||300;if(ok){el.css('opacity','0').css('display','block').css('transform','translateX(-20px)').css('left','0')}
el.css('transition-property','transform, opacity').css('transition-duration',((t-16)/1000)+'s')
setTimeout(function(){el.css('opacity',ok?'1':'0').css('transform',ok?'translateX(0px)':'translateX(20px)')},16);clearTimeout(planche.showItTimeout)
planche.showItTimeout=setTimeout(function()
{el.css('transition-property','none').css('transform','none');if(onComplete)onComplete()},t)},plancheAnim:{show:function(){planche.flags.shown=!0;planche.flags.displayCounter++;if(planche.flags.displayCounter===o.numberOfViews){planche.enabled=planche.flags.active=!1}
if(supportTransition){planche.showIt(e.planche,!0)}else{e.planche.css('display','block').anim({left:0,opacity:1})}},hide:function(){planche.flags.shown=!1;clearTimeout(planche.showTimeout);if(supportTransition){planche.showIt(e.planche,!1,300,planche.plancheAnim.hidden)}else{e.planche.anim({left:20,opacity:0},{duration:300,complete:planche.plancheAnim.hidden})}},hidden:function(){if(!supportTransition)e.planche.css('left','-20px');e.planche.css('opacity','0').css('display','none')}},autoShow:function(){if(!planche.flags.active)return;planche.makeShow();if(planche.autoShowTimeout)clearTimeout(planche.autoShowTimeout);planche.autoShowTimeout=setTimeout(planche.autoShow,o.boardInterval?o.boardInterval+o.showTime:o.showTime*3)},makeShow:function(onComplete,shown){if(o.startDelay>0)return;if(!planche.flags.shown){if(onComplete)planche.onComplete=onComplete;planche.plancheAnim.show()}
planche.showTimeout=setTimeout(function(){planche.plancheAnim.hide();if(onComplete)onComplete()},o.showTime)}}