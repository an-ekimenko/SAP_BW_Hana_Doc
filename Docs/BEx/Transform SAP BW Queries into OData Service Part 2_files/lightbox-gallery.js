"use strict";for(var targetDataId,targetModal,activeClass="dm-lightbox--active",imageIdx="data-index",lightboxDataId="data-id",modalSelector=".dm-lightbox",clickableImgSelector="img.dm-lightbox__img",closeIconSelector=".lightbox__header .dm-icon-encoded--close",prevButtonSelector=".lightbox-gallery-button--prev",nextButtonSelector=".lightbox-gallery-button--next",zoomInButtonSelector=".lightbox-zoom-in",zoomOutButtonSelector=".lightbox-zoom-out",slideNextVal=1,slidePrevVal=-1,maxMobileWindowWidth=980,modals=document.querySelectorAll(modalSelector),closeIcon=document.querySelectorAll(closeIconSelector),clickableImg=document.querySelectorAll(clickableImgSelector),lightboxPrevButtons=document.querySelectorAll(prevButtonSelector),lightboxNextButtons=document.querySelectorAll(nextButtonSelector),zoomInButtons=document.querySelectorAll(zoomInButtonSelector),zoomOutButtons=document.querySelectorAll(zoomOutButtonSelector),slideIndex=1,windowWidth=window.innerWidth,scrollbarWid=getScrollbarWidth(),clickableImgsGroupped=groupClickableImgsByLightboxDataId(clickableImg),_i=0,_Object$keys=Object.keys(clickableImgsGroupped);_i<_Object$keys.length;_i++){var key=_Object$keys[_i];removeImgsForLinksFromLightbox(clickableImgsGroupped[key],key)}document.addEventListener("keydown",function(t){t||(t=window.event),"Escape"!==t.key&&"Esc"!==t.key||targetModal&&targetModal.classList.contains(activeClass)&&(targetModal.classList.remove(activeClass),enableBackgroundScroll())}),window.addEventListener("click",function(t){t||(t=window.event),closeClickOutsideLightbox(t)}),window.addEventListener("resize",updateWindowSize);for(var i=0;i<zoomInButtons.length;i++)zoomInButtons[i].addEventListener("click",zoomin);for(var _i2=0;_i2<zoomOutButtons.length;_i2++)zoomOutButtons[_i2].addEventListener("click",zoomout);for(var _i3=0;_i3<closeIcon.length;_i3++)closeIcon[_i3].addEventListener("click",function(t){t||(t=window.event),toggleLightbox(t)});for(var _i4=0;_i4<lightboxPrevButtons.length;_i4++)lightboxPrevButtons[_i4].addEventListener("click",function(t){t||(t=window.event);var e=t.target.closest(modalSelector).getAttribute(lightboxDataId);plusSlides(slidePrevVal,""+e)});for(var _i5=0;_i5<lightboxNextButtons.length;_i5++)lightboxNextButtons[_i5].addEventListener("click",function(t){t||(t=window.event);var e=t.target.closest(modalSelector).getAttribute(lightboxDataId);plusSlides(slideNextVal,""+e)});function groupClickableImgsByLightboxDataId(t){var o={};return t.forEach(function(t,e){o[t.getAttribute(lightboxDataId)]=o[t.getAttribute(lightboxDataId)]||[],o[t.getAttribute(lightboxDataId)].push(t)}),o}function removeImgsForLinksFromLightbox(d,n){for(var a=0,t=function(t){var e=jQuery(d[t]).parents("a[href]"),o=parseInt(d[t].getAttribute(imageIdx))-a;if(0<a&&d[t].setAttribute(imageIdx,o),0!==e.length){var l=document.querySelector('.dm-lightbox[data-id="'+n+'"] .dm-lightbox__content'),i=l.querySelectorAll(".dm-lightbox__slide");l.removeChild(i[o-1]),d[t].removeAttribute(imageIdx),d[t].removeAttribute(lightboxDataId),d[t].classList.remove("dm-lightbox__img"),a++}else d[t].addEventListener("click",function(t){t||(t=window.event),toggleLightbox(t,o)})},e=0;e<d.length;e++)t(e)}function updateWindowSize(){windowWidth=window.innerWidth,scrollbarWid=getScrollbarWidth(),windowWidth<maxMobileWindowWidth&&targetModal&&targetModal.classList.contains(activeClass)&&(targetModal.classList.remove(activeClass),enableBackgroundScroll())}function closeClickOutsideLightbox(t){t.target==targetModal&&(targetModal.classList.remove(activeClass),enableBackgroundScroll())}function enableBackgroundScroll(){document.body.style.overflow="",document.body.style.paddingRight=""}function getScrollbarWidth(){return window.innerWidth-document.documentElement.clientWidth}function toggleLightbox(t,e){maxMobileWindowWidth<=windowWidth&&(targetDataId="I"===t.target.tagName?t.target.closest(modalSelector).getAttribute(lightboxDataId):t.target.getAttribute(lightboxDataId),modals.forEach(function(t,e){t.getAttribute(lightboxDataId)===targetDataId&&(targetModal=t)}),targetModal?targetModal.classList.contains(activeClass)?(targetModal.classList.remove(activeClass),enableBackgroundScroll()):(targetModal.classList.add(activeClass),document.body.style.overflow="hidden",document.body.style.paddingRight=scrollbarWid+"px",void 0!==e&&currentSlide(e,targetDataId)):console.error('No target modal found, Please check "data-id" attributes!'))}function plusSlides(t,e){showSlides(slideIndex+=t,e)}function currentSlide(t,e){showSlides(slideIndex=t,e)}function updateSlideNum(t,e,o){var l=document.querySelector('.dm-lightbox[data-id="'+o+'"] .dm-lightbox__slideNumber');l.querySelector("span.dm-lightbox__slideNumber--current").innerHTML=t,l.querySelector("span.dm-lightbox__slideNumber--total").innerHTML=e}function showSlides(t,e){var o=document.querySelectorAll('.dm-lightbox[data-id="'+e+'"] .dm-lightbox__slide');t>o.length&&(slideIndex=1),t<1&&(slideIndex=o.length);for(var l=0;l<o.length;l++)o[l].style.display="none";updateSlideNum(slideIndex,o.length,e),o[slideIndex-1].style.display="flex"}function zoomin(){var t=targetModal.querySelectorAll(".dm-lightbox__slide")[slideIndex-1].querySelector("img.dm-lightbox__slide--img"),e=t.clientWidth;t.style.width=e+100+"px"}function zoomout(){var t=targetModal.querySelectorAll(".dm-lightbox__slide")[slideIndex-1].querySelector("img.dm-lightbox__slide--img"),e=t.clientWidth;if(100==e)return!1;t.style.width=e-100+"px"}