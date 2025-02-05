/*
 * @name DoubleScroll
 * @desc displays scroll bar on top and on the bottom of the div
 * @requires jQuery
 *
 * @author Pawel Suwala - http://suwala.eu/
 * @author Antoine Vianey - http://www.astek.fr/
 * @version 0.5 (11-11-2015)
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Usage:
 * https://github.com/avianey/jqDoubleScroll
 */
!function(l){jQuery.fn.doubleScroll=function(e){var o={contentElement:void 0,scrollCss:{"overflow-x":"auto","overflow-y":"hidden"},contentCss:{"overflow-x":"auto","overflow-y":"hidden"},onlyIfScroll:!0,resetOnWindowResize:!1,timeToWaitForResize:30}
l.extend(!0,o,e),l.extend(o,{topScrollBarMarkup:'<div class="doubleScroll-scroll-wrapper" style="height: 17px;"><div class="doubleScroll-scroll" style="height: 17px;"></div></div>',topScrollBarWrapperSelector:".doubleScroll-scroll-wrapper",topScrollBarInnerSelector:".doubleScroll-scroll"})
var r=function(e,o){if(o.onlyIfScroll&&e.get(0).scrollWidth<=e.width())return void e.prev(o.topScrollBarWrapperSelector).remove()
var r=e.prev(o.topScrollBarWrapperSelector)
if(0==r.length){r=l(o.topScrollBarMarkup),e.before(r),r.css(o.scrollCss),e.css(o.contentCss),r.bind("scroll.doubleScroll",function(){e.scrollLeft(r.scrollLeft())})
var t=function(){r.scrollLeft(e.scrollLeft())}
e.bind("scroll.doubleScroll",t)}var c
c=void 0!==o.contentElement&&0!==e.find(o.contentElement).length?e.find(o.contentElement):e.find(">:first-child"),l(o.topScrollBarInnerSelector,r).width(c.outerWidth()),r.width(e.width()),r.scrollLeft(e.scrollLeft())}
return this.each(function(){var e=l(this)
if(r(e,o),o.resetOnWindowResize){var t,c=function(l){r(e,o)}
l(window).bind("resize.doubleScroll",function(){clearTimeout(t),t=setTimeout(c,o.timeToWaitForResize)})}})}}(jQuery)
