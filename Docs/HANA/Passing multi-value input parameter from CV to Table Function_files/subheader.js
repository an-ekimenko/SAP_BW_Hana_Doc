!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"d",function(){return r}),n.d(e,"c",function(){return s}),n.d(e,"b",function(){return o}),n.d(e,"e",function(){return u});var i=function(t,e){t.classList?t.classList.add(e):s(t,e)||(t.className+=" "+e)},r=function(t,e){t.classList?t.classList.remove(e):s(t,e)&&(t.className=t.className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)")," "))},s=function(t,e){return t.classList?t.classList.contains(e):t.className&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(t.className)},o=function(t){var e=!1,n=function(){e||(e=!0,t())};"complete"===document.readyState?window.setTimeout(n,1):(document.addEventListener("DOMContentLoaded",n),window.addEventListener("load",n))},a=(function(){var t=[];window.addEventListener("resize",function(){return t.forEach(function(t){return t(a())})})}(),window.innerWidth,window.innerHeight,function(){return Math.max(document.documentElement.clientWidth,window.innerWidth||0)}),u=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild}},function(t,e,n){t.exports=n(2)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=n(3);Object(i.b)(function(){return Object(r.a)()})},function(t,e,n){"use strict";var i,r,s=n(4),o=n(5),a=function(){var t=function(){return window.headerInitArgs?window.headerInitArgs:window.header_init_args},e=t(),n=e.system,a=e.breadcrumbItems,u=void 0===a?[]:a,c=e.subheaderOptionalActions,d=e.subnavigation,l=SCN_HEADER_CONF.landscape,h=l.defaultBreadcrumb,f=void 0===h?[]:h,m=l.subHeaderActions,p=document.querySelector(".dm-breadcrumb"),v=document.querySelector(".dm-breadcrumb-actions");p&&(i=new s.a(p,{breadcrumbItems:u,defaultBreadcrumb:f})),v&&(r=new o.a(v,{getUser:function(){return t().user},system:n,actions:m,optionalActions:c,optionalSubnavigation:d})),r.rePopulateSubNavigation(),r.renderActions(),window.addEventListener("message",function(t){try{"universalHeaderUserAuthenticated"===JSON.parse(t.data).message&&(i.markUserAsAuthenticated(),r.renderActions())}catch(t){}})};e.a=a},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n.d(e,"a",function(){return a});var o=n(0),a=function(){function t(e,n){var r=n.breadcrumbItems,s=void 0===r?[]:r,o=n.defaultBreadcrumb,a=void 0===o?[]:o;i(this,t),this.$breadcrumb=e,this.$navList=this.$breadcrumb.querySelector(".dm-breadcrumb-nav"),this.items=s,this.defaultItems=a,this.populateDefaultBreadcrumbItems(),this.populateBreadcrumb()}return s(t,[{key:"populateBreadcrumb",value:function(){var t=this,e=this.items.sort(function(t,e){return t.position&&e.position?t.position-e.position:0}).map(function(e){var n=e.text,i=e.href;return t.renderItem(n,i)}).reduce(function(t,e){return t.appendChild(e),t},document.createDocumentFragment());this.$navList.appendChild(e)}},{key:"populateDefaultBreadcrumbItems",value:function(){this.defaultItems.length&&this.defaultItems.map(function(t){return{id:t.id,href:t.url,text:t.name,link:document.getElementById(t.id)}}).filter(function(t){return t.link}).forEach(function(t){t.link.href=t.href,t.link.text=t.text,t.link.title=t.text})}},{key:"renderItem",value:function(t,e){var n=e?'<a href="'.concat(e,'" title="').concat(t,'">').concat(t,"</a>"):t;return Object(o.e)("<li>".concat(n,"</li>"))}},{key:"markUserAsAuthenticated",value:function(){Object(o.d)(this.$breadcrumb,"dm-user--unauthenticated"),Object(o.c)(this.$breadcrumb,"dm-user--authenticated")||Object(o.a)(this.$breadcrumb,"dm-user--authenticated")}}]),t}()},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n.d(e,"a",function(){return a});var o=n(0),a=function(){function t(e,n){var r=n.optionalSubnavigation,s=n.getUser,o=n.system,a=n.actions,u=n.optionalActions,c=void 0===u?[]:u;i(this,t),this.$actionsList=e,this.$userActionsDropdown=this.$actionsList.querySelector(".dm-breadcrumb-actions__dropdown"),this.$userActionsList=this.$actionsList.querySelector(".dm-breadcrumb-actions__dropdown-menu"),this.$userActionsOpener=this.$actionsList.querySelector(".dm-breadcrumb-actions__dropdown-toggle"),this.$createQuestionItem=this.$actionsList.querySelector("#comm-shdr-AskQuestion"),this.$createBlogpostItem=this.$actionsList.querySelector("#comm-shdr-WriteBlogPost"),this.optionalSubnavigation=r,this.getCurrentUser=s,this.subheaderOptionalActions=c,this.system=o,this.subheaderActions=a,this._onClickOutside=this._onClickOutside.bind(this),this._onEscape=this._onEscape.bind(this),this._onOpenerClick=this._onOpenerClick.bind(this),this.initEventListeners()}return s(t,[{key:"renderActions",value:function(){var t=[].concat(this._getStandardActions()).concat(this._getUserActions()).map(function(t){var e=t.url,n=t.id,i=t.name;return Object(o.e)('<li id="'.concat(n,'"><a href="').concat(e,'" title="').concat(i,'">').concat(i,"</a></li>"))}).reduce(function(t,e){return t.appendChild(e),t},document.createDocumentFragment());this.$userActionsList.innerHTML="",this.$userActionsList.appendChild(t),this.$userActionsList.classList.add("dm_actions--populated")}},{key:"rePopulateSubNavigation",value:function(){var t=this.subheaderActions.subnavigation,e=void 0===t?[]:t;this._updateAskQuestion(e,this.optionalSubnavigation),this._updateWriteBlogpost(e,this.optionalSubnavigation)}},{key:"toggleUserActions",value:function(){this.isUserActionsOpen()?this.hideUserActions():this.showUserActions()}},{key:"showUserActions",value:function(){this.$userActionsDropdown.classList.add("dm-breadcrumb-actions__dropdown--open")}},{key:"hideUserActions",value:function(){this.$userActionsDropdown.classList.remove("dm-breadcrumb-actions__dropdown--open")}},{key:"isUserActionsOpen",value:function(){return this.$userActionsDropdown.classList.contains("dm-breadcrumb-actions__dropdown--open")}},{key:"initEventListeners",value:function(){this.$userActionsOpener.addEventListener("click",this._onOpenerClick),window.addEventListener("mouseup",this._onClickOutside),window.addEventListener("touchend",this._onClickOutside),window.addEventListener("keydown",this._onEscape)}},{key:"_getStandardActions",value:function(){var t=this,e=this.subheaderActions.standardActions,n=void 0===e?[]:e;return Object.keys(n).filter(function(e){return!n[e].optional||t.subheaderOptionalActions.indexOf(e)>-1}).map(function(t){return n[t]})}},{key:"_updateAskQuestion",value:function(t,e){var n=t.askQuestion;this.$createQuestionItem.href=n.url+this._calculatePreFilledParameters(e)}},{key:"_updateWriteBlogpost",value:function(t,e){var n=t.writeBlogPost;this.$createBlogpostItem.href=n.url+this._calculatePreFilledParameters(e)}},{key:"_calculatePreFilledParameters",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t.preFilledTag?"?primaryTagId="+t.preFilledTag:""}},{key:"_getUserActions",value:function(){var t=this.subheaderActions.additionalActions,e=void 0===t?[]:t,n=[],i=["blogs","answers"];return this._isGlobalModerator()||this._isModerator()&&-1!==i.indexOf(this.system)?n.push(e.moderation):n.push(e.gettingStarted),this._isAdministrator()&&n.push(e[this.system+"Administration"]),n.filter(function(t){return t})}},{key:"_isModerator",value:function(){return this.getCurrentUser()&&this.getCurrentUser().roles&&-1!==this.getCurrentUser().roles.indexOf("moderator")}},{key:"_isGlobalModerator",value:function(){return this.getCurrentUser()&&this.getCurrentUser().roles&&-1!==this.getCurrentUser().roles.indexOf("globalmoderator")}},{key:"_isAdministrator",value:function(){return this.getCurrentUser()&&this.getCurrentUser().roles&&-1!==this.getCurrentUser().roles.indexOf("administrator")}},{key:"_onOpenerClick",value:function(t){t.preventDefault(),this.toggleUserActions()}},{key:"_onEscape",value:function(t){27===t.which&&(this.hideUserActions(),t.preventDefault())}},{key:"_onClickOutside",value:function(t){t.target===this.$userActionsOpener||this.$userActionsDropdown.contains(t.target)||this.hideUserActions()}}]),t}()}]);