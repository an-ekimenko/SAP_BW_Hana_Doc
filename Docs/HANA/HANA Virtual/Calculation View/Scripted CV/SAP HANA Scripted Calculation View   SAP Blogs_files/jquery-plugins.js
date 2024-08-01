"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==l.return||l.return()}finally{if(o)throw a}}return r}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(e){_defineProperty(t,e,r[e])})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}!function(l){var e="collapse",o="dm.collapse",t=".".concat(o),r={SHOWN:"shown".concat(t),HIDDEN:"hidden".concat(t)},n=function(){function i(e,t){_classCallCheck(this,i),this.$element=l(e);var r=e.dataset,n=r.triggers,o=r.hideClass;if(n=n||t.triggers)if(o){var a=document.querySelectorAll(n);0!==a.length?1<a.length?console.error("fount more than 1 element specified by [data-triggers]"):(this.$triggers=l(a[0]),this.hideClass=o):console.error("can not find element specified by [data-triggers] selector")}else console.error('[data-toggle="collapse"] element should also specify [data-hide-class] selector');else console.error('[data-toggle="collapse"] element should also specify [data-triggers] selector, or triggers should be passed by js config')}return _createClass(i,[{key:"toggle",value:function(){this.$triggers.hasClass(this.hideClass)?this.show():this.hide()}},{key:"show",value:function(){this.$triggers.removeClass(this.hideClass).attr("aria-expanded",!0),this.$element.trigger(r.SHOWN)}},{key:"hide",value:function(){this.$triggers.addClass(this.hideClass).attr("aria-expanded",!1),this.$element.trigger(r.HIDDEN)}}],[{key:"_jQueryInterface",value:function(n){return this.each(function(){var e=l(this),t=e.data(o),r=_objectSpread({},e.data(),"object"===_typeof(n)&&n?n:{});if(t||(t=new i(this,r),e.data(o,t)),"string"==typeof n){if(void 0===t[n])throw new TypeError('No method named "'.concat(n,'"'));t[n]()}})}}]),i}();l(document).on("click",'[data-toggle="collapse"]',function(){n._jQueryInterface.call(l(this),"toggle")}),l.fn[e]=n._jQueryInterface,l.fn[e].Constructor=n,l.getUrlParams=function(e){var t=window.location.href,r=(-1===t.indexOf("?")?"":decodeURIComponent(t.slice(t.indexOf("?")+1))).split("&").filter(function(e){return e}).map(function(e){return e.match(/([\w\d]+)(?:\[.*\])*=(.+)/)}).map(function(e){var t=_slicedToArray(e,3);t[0];return{key:t[1],value:t[2]}}).reduce(function(e,t){var r=t.key,n=t.value;return e[r]=e[r]?[].concat(e[r]).concat(n):n,e},{});return e?r[e]:r}}(jQuery);