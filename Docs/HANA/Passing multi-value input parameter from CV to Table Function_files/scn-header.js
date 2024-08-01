var sharedUi=window.sharedUi||{};!function(e){var t=e.Utils=e.Utils||{};t.domReady=function(e){var t=!1,s=function(){t||(t=!0,e())};"complete"===document.readyState?window.setTimeout(s,1):(document.addEventListener("DOMContentLoaded",s),window.addEventListener("load",s))},t.setCookie=function(e,t,s){var n=(s=s||{}).expires;if("number"==typeof n&&n){var a=new Date;a.setTime(a.getTime()+1e3*n),n=s.expires=a}n&&n.toUTCString&&(s.expires=n.toUTCString());var i=e+"="+(t=encodeURIComponent(t));for(var o in s){i+="; "+o;var r=s[o];!0!==r&&(i+="="+r)}document.cookie=i},t.getCookie=function(e){var t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([.$?*|{}()[]\\\/+^])/g,"\\$1")+"=([^;]*)"));return t?decodeURIComponent(t[1]):void 0},t.deleteCookie=function(e,t){var s=t||{};s.expires=-1,this.setCookie(e,"",s)},t.hasClass=function(e,t){return e.classList?e.classList.contains(t):e.className&&new RegExp("(^|\\s)"+t+"(\\s|$)").test(e.className)},t.addClass=function(e,s){e.classList?e.classList.add(s):t.hasClass(e,s)||(e.className+=" "+s)},t.removeClass=function(e,s){e.classList?e.classList.remove(s):t.hasClass(e,s)&&(e.className=e.className.replace(new RegExp("(\\s|^)"+s+"(\\s|$)")," "))},t.replaceClass=function(e,s,n){t.removeClass(e,s),t.addClass(e,n)},t.getUrlParts=function(e){var t=new RegExp(["^(https?:)//","(([^:/?#]*)(?::([0-9]+))?)","(/[^?#]*)","(\\?[^#]*|)","(#.*|)$"].join("")),s=e.match(t);return s&&{protocol:s[1],host:s[2],hostname:s[3],port:s[4],pathname:s[5],search:s[6],hash:s[7]}},t.executeFeatureCallback=function(e,t){var s=new XMLHttpRequest;s.open("GET",scnHeader.landscapeConfig.shareduiService+"/api/v1/features/"+e+"/state",!0),s.setRequestHeader("Accept","text/plain"),s.onreadystatechange=function(){if(4===this.readyState){var e=200===this.status?s.responseText:"OFF";t(e)}},s.send(null)},t.getStaticResourcesPathWithMinorVersion=function(){var e,t,s="script[src$='scn-header.min.js']";scnHeader.landscapeConfig.staticResources?(s+="[src^='"+scnHeader.landscapeConfig.staticResources+"']",e="latest"):e="";var n=document.querySelector(s);if(n){var a=new RegExp("(.*)shared-ui/").exec(n.src);t=a.length>1?a[1]:scnHeader.landscapeConfig.staticResources+"/"+e}else t="";return t},t.decodeEntities=function(){var e=document.createElement("textarea");return function(t){return t&&"string"==typeof t&&(t=(t=t.replace(/</g,"&lt;")).replace(/>/g,"&gt;"),e.innerHTML=t,t=e.textContent,e.textContent=""),t}}(),t.postMessageToOrigin=function(e){window.postMessage(JSON.stringify({message:e}),window.location.origin)},t.preventHandlerTriggerOnMobileScrolling=function(e,t){e.addEventListener("touchstart",function(){var s=function(n){t(n),e.removeEventListener("touchend",s)};e.addEventListener("touchend",s),e.addEventListener("touchmove",function t(){e.removeEventListener("touchend",s),e.removeEventListener("touchmove",t)})})},t.getCurrentUserAttrributes=function(e,t){var s=new XMLHttpRequest;s.withCredentials=!0;var n=scnHeader.landscapeConfig.shareduiService+"/api/v1/users/currentUser/attributes";s.open("GET",n,!0),s.setRequestHeader("Accept","application/json"),s.onreadystatechange=function(){4===this.readyState&&200===this.status&&e&&e(s.responseText),4===this.readyState&&200!==this.status&&t&&t(s)},s.send(null)}}(sharedUi),window.setCookie=sharedUi.Utils.setCookie,window.getCookie=sharedUi.Utils.getCookie,window.deleteCookie=sharedUi.Utils.deleteCookie,window.getViewportWidth=sharedUi.Utils.getViewportWidth,window.scnGetUrlParts=sharedUi.Utils.getUrlParts,function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var s=document.createEvent("CustomEvent");return s.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),s}e.prototype=window.Event.prototype,window.CustomEvent=e,window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t=t||window;for(var s=0;s<this.length;s++)e.call(t,this[s],s,this)})}();var scnHeader={systemConfig:{},landscapeConfig:{},currentUser:{},args:{},init:function(e){this.args=e,this.setGlobalConfig(this.args.system,this.args),this.hasPersonalizedData()?(this.currentUser=this.args.user,this.hideAnonymousElements(),this.showPseudoAuthHeader(),sharedUi.Utils.postMessageToOrigin("universalHeaderUserAuthenticated")):(this.showAnonymousElements(),sharedUi.Utils.postMessageToOrigin("universalHeaderUserAnonymous"))},preAuthInit:function(e){this.args=e,this.setGlobalConfig(this.args.system,this.args),this.authenticateWithIFrame()},hasPersonalizedData:function(){return void 0!==this.args.user},populateLogOnLink:function(){var e=document.getElementById("comm-hdr-SignIn");e.setAttribute("title","Log On"),this.populateLogOnHref(e)},populateSubHeaderLogOnLink:function(){var e=document.querySelector(".dm-breadcrumb");if(e){var t=e.getElementsByClassName("dm-user__login-button--wrapper")[0];if(t){var s=t.getElementsByClassName("dm-button--primary")[0];this.populateLogOnHref(s)}}},populateLogOnHref:function(e){this.systemConfig.isLogOnPathRedirect?e.setAttribute("href",this.systemConfig.logOn+encodeURIComponent(location.pathname+location.search)):e.setAttribute("href",this.systemConfig.logOn)},populateLogOutLink:function(){var e=document.getElementById("comm-hdr-LogOut");null!==e&&(this.args.logout_url?e.setAttribute("href",this.args.logout_url.replace("amp;","")):this.systemConfig.isLogOutPathRedirect?e.setAttribute("href",this.systemConfig.logOut+encodeURIComponent(location.pathname+location.search)):e.setAttribute("href",this.systemConfig.logOut))},populateSearch:function(){if(this.landscapeConfig.search){document.querySelector("#comm-hdr-Search form").setAttribute("action",this.landscapeConfig.search);for(var e=document.querySelectorAll(".dm-mobileSearch form"),t=0;t<e.length;t++)e[t].setAttribute("action",this.landscapeConfig.search)}},populateAvatarIcon:function(){if(this.currentUser.username&&this.landscapeConfig.avatarLink){var e=document.querySelector("#comm-hdr-Avatar img"),t=this.landscapeConfig.avatarLink.replace("%%%USERNAME%%%",this.currentUser.username);e.setAttribute("src",t),e.onload=function(){scnHeader._show(this)}}},populateUserName:function(){var e=this.currentUser.name;if(e){document.getElementById("comm-hdr-Username").innerText=e;var t=document.getElementById("comm-hdr-SignIn");t.setAttribute("title",e),t.setAttribute("href","#")}},populateEmail:function(){var e=this.currentUser.email;e&&(document.getElementById("comm-hdr-Email").innerText=e)},populateProfileLink:function(){if(document.getElementById("comm-hdr-UserProfileMenu")&&this.landscapeConfig.profileLink&&document.getElementById("comm-hdr-SubMenuTitleLink")){var e=document.getElementById("comm-hdr-SubMenuTitleLink");e.setAttribute("href",this.landscapeConfig.profileLink),e.setAttribute("target","_blank")}},populateProfileMenuSection:function(e,t,s){if(e&&Array.isArray(t)){var n=document.querySelector("#"+e+" ul");for(var a in t){var i=t[a],o=this._createElement("a",{href:i.url,class:s||"dm-profileMenu__link",target:i.target},i.name),r=this._createElement("li",{class:"dm-profileMenu__item"},[o]);if("Inbox"===i.name){var c=this._createElement("span",{class:"dm-header__profile-notifications dm-hidden js-notification-indicator"},"");r.appendChild(c)}n.appendChild(r)}}},populateProfileMenuTopSection:function(e){this.populateProfileMenuSection("comm-hdr-ProfileMenuTopSection",e,"dm-profileMenu__link-gray")},populateProfileMenuMiddleSection:function(e){this.populateProfileMenuSection("comm-hdr-ProfileMenuMiddleSection",e,null)},hideAnonymousElements:function(){this.hideLogInElement(),this.hideSubHeaderLogInElement()},hideLogInElement:function(){var e=document.getElementById("comm-hdr-AnonymousIcon");this._hide(e)},hideSubHeaderLogInElement:function(){var e=document.querySelector(".dm-breadcrumb");e&&sharedUi.Utils.replaceClass(e,"dm-user--unauthenticated","dm-user--authenticated")},showAnonymousElements:function(){this.showLogInElement(),this.populateAnonymousLandscapeItems()},showLogInElement:function(){var e=document.getElementById("comm-hdr-AnonymousIcon");this._show(e)},showPseudoAuthHeader:function(){this.populateAuthLandscapeItems(),this.populateUserName(),this.populateEmail(),this.removeAttrRelFromProfileActions()},populateAnonymousLandscapeItems:function(){this.landscapeConfig.landscape&&this.systemConfig.systemName&&(this.populateCommonLandscapeItems(),this.populateLogOnLink(),this.populateSubHeaderLogOnLink(),this.populateRegistrationLink())},populateAuthLandscapeItems:function(){if(!this.landscapeConfig.populated&&this.currentUser.username&&this.landscapeConfig.landscape&&this.systemConfig.systemName){this.landscapeConfig.populated=!0,this.populateCommonLandscapeItems(),this.populateAvatarIcon();var e=this.landscapeConfig.profileMenu;this.currentUser.username&&e&&(this.populateProfileMenuTopSection(e.topSection),this.populateProfileMenuMiddleSection(e.middleSection)),this.populateProfileLink(),this.authenticateWithIFrame(),this.populateLogOutLink()}},populateCommonLandscapeItems:function(){this.populateSearch()},removeAttrRelFromProfileActions:function(){document.getElementById("comm-hdr-SignIn").removeAttribute("rel")},authenticateWithIFrame:function(){if(!document.getElementById("authIFrame")&&!this.args.fallback){var e=document.createElement("iframe");e.style.display="none",e.id="authIFrame",e.src=this.landscapeConfig.header+"/protected.html",document.body.appendChild(e)}},populateNotificationsCount:function(e){for(var t=document.querySelectorAll(".js-notification-indicator"),s=0;s<t.length;s++)e&&e>0?this._show(t[s]):this._hide(t[s])},populateRegistrationLink:function(e){if(e)e.name=this.systemConfig.SP?this.systemConfig.SP:window.location.origin;else for(var t=document.querySelectorAll('a[rel="IDS_register"]'),s=0;s<t.length;s++)t[s].name=this.systemConfig.SP?this.systemConfig.SP:window.location.origin},setGlobalConfig:function(e){void 0===SCN_HEADER_CONF||this.systemConfig.systemName||(this.landscapeConfig=SCN_HEADER_CONF.landscape,this.systemConfig=SCN_HEADER_CONF.systems[e],this.systemConfig.landscapeOverwrites&&this._recursiveMerge(this.landscapeConfig,this.systemConfig.landscapeOverwrites),this.systemConfig.systemName=e)},_createElement:function(e,t,s){if(void 0===e)return!1;void 0===s&&(s="");var n=document.createElement(e);if("object"==typeof t)for(var a in t)n.setAttribute(a,t[a]);Array.isArray(s)||(s=[s]);for(var i=0;i<s.length;i++)s[i].tagName?n.appendChild(s[i]):n.appendChild(document.createTextNode(s[i]));return n},_hide:function(e){sharedUi.Utils.addClass(e,"dm-hidden")},_show:function(e){sharedUi.Utils.removeClass(e,"dm-hidden")},_recursiveMerge:function(e,t){for(var s in t)try{t[s].constructor==Object?e[s]=this._recursiveMerge(e[s],t[s]):e[s]=t[s]}catch(n){e[s]=t[s]}return e}};sharedUi.Utils.domReady(function(){var e=window.headerInitArgs?window.headerInitArgs:window.header_init_args,t=scnHeader.systemConfig.systemName;if(!t||scnHeader.systemConfig.authByHeader&&!scnHeader.hasPersonalizedData()){if(!e.user){if(scnHeader.systemConfig.useJWT)return;var s=function(){scnHeader.init(e)};sharedUi.Utils.getCurrentUserAttrributes(function(e){try{var t=JSON.parse(e),n=JSON.stringify({message:"userAttrLoaded",userAttr:t});window.postMessage(n,window.origin)}catch(e){s()}},s)}t&&!e.user||scnHeader.init(e)}}),window.addEventListener("message",function(e){try{var t=JSON.parse(e.data);if(t.message){if("authIFrameLoaded"===t.message){var s=JSON.stringify({message:"messageFromParent",headerHost:scnHeader.landscapeConfig.shareduiService,userAttrIsEmpty:!sharedUi.Utils.getCookie("userArgs")});e.source.postMessage(s,e.origin)}else if("newNotificationsCountLoaded"===t.message)scnHeader.populateNotificationsCount(t.count);else if("userAttrLoaded"===t.message){window.headerInitArgs.user={name:t.userAttr.firstname+" "+t.userAttr.lastname,username:t.userAttr.profileName,roles:t.userAttr.communityRoles,email:t.userAttr.email},sharedUi.Utils.setCookie("userArgs",JSON.stringify(window.headerInitArgs.user),{path:"/"}),scnHeader.init(window.headerInitArgs);s=JSON.stringify({message:"messageFromParent",headerHost:scnHeader.landscapeConfig.shareduiService,userAttrIsEmpty:!1});e.source.postMessage(s,e.origin)}else if("userAttrLoadedError"===t.message&&t.noConsent){var n=scnHeader.landscapeConfig.consentPage;scnHeader.landscapeConfig.consentPageRedirectBackSupported?n+="?redirect_to="+encodeURIComponent(window.location.href):n+="?redirect_system="+scnHeader.systemConfig.systemName,window.location=n}var a=document.getElementById("ids_container");sharedUi.Utils.getCookie("userArgs")&&a&&(a.style.display="none")}}catch(e){}});var buildNavMenu=function(){var e=new XMLHttpRequest;e.open("GET",sharedUi.Utils.getStaticResourcesPathWithMinorVersion()+"shared-ui/1dx-assets/navigation.html5",!0),e.responseType="text",e.onload=function(e){if(4===this.readyState&&200===this.status){var t=document.querySelector("nav#comm-hdr-Navigation ul.dm-mainNav__menu");t.innerHTML=e.target.response;var s=new CustomEvent("communityHeaderNavigationLoaded");t.dispatchEvent(s)}},e.send()};sharedUi.Utils.domReady(function(){document.getElementById("comm-hdr-LogOut").onclick=function(){sharedUi.Utils.deleteCookie("userArgs",{path:"/"})},buildNavMenu()});var SCN_HEADER_CONF=SCN_HEADER_CONF||{};SCN_HEADER_CONF.systems={blogs:{logOn:"/wp-login.php?redirect_to=",isLogOnPathRedirect:!0,authByHeader:!1,logOut:"/wp-login.php?action=logout"},activityStream:{logOn:"/login?ref=https://activities.sap.com",isLogOnPathRedirect:!1,authByHeader:!0,logOut:"/logout.html",SP:"https://hana.ondemand.com/skywalker",landscapeOverwrites:{shareduiService:"/securedheader",header:"/securedheader"},useJWT:!0},header:{logOn:"https://sharedui.services.sap.com/auth",isLogOnPathRedirect:!1,authByHeader:!0,logOut:"/logout.html",SP:"https://hana.ondemand.com/skywalker"},headerapp:{logOn:"https://sharedui.services.sap.com/auth?ref=https://static.community.services.sap",isLogOnPathRedirect:!0,authByHeader:!0,logOut:"https://sharedui.services.sap.com/v2/logout.html?ref=https://static.community.services.sap",isLogOutPathRedirect:!0,SP:"https://hana.ondemand.com/skywalker",useJWT:!0,landscapeOverwrites:{staticResources:""}},extarchive:{logOn:"https://sharedui.services.sap.com/auth?ref=https://archive.sap.com",isLogOnPathRedirect:!0,authByHeader:!0,logOut:"https://sharedui.services.sap.com/v2/logout.html?ref=https://archive.sap.com/",SP:"https://hana.ondemand.com/skywalker",useJWT:!0},answers:{logOn:"/users/login.html?redirect_to=",isLogOnPathRedirect:!0,authByHeader:!1,logOut:"/users/logout.html",landscapeOverwrites:{subHeaderActions:{additionalActions:{moderation:{url:"https://answers.sap.com/moderation/index.html"}}}}},people:{logOn:"/auth/login",isLogOnPathRedirect:!1,authByHeader:!1,logOut:"/auth/logout"},messages:{logOn:"/login",isLogOnPathRedirect:!1,authByHeader:!0,logOut:"/logout.html",SP:"https://hana.ondemand.com/skywalker",landscapeOverwrites:{shareduiService:"/securedheader",header:"/securedheader"}},"htone-community":{logOn:"/bin/fiji/es/login.search.html?_=nc",isLogOnPathRedirect:!1,authByHeader:!1,logOut:"/bin/fiji/es/logout.search.html?_=nc"},contentPages:{logOn:"https://sharedui.services.sap.com/auth?ref=https://community.sap.com",isLogOnPathRedirect:!0,isLogOutPathRedirect:!0,authByHeader:!0,logOut:"https://sharedui.services.sap.com/v2/logout.html?ref=https://community.sap.com",SP:"https://hana.ondemand.com/skywalker",useJWT:!0}},SCN_HEADER_CONF.landscape={landscape:"PROD",profileMenu:{topSection:[{name:"Ask a Question",url:"https://answers.sap.com/questions/ask.html",target:"_self"},{name:"Write a Blog Post",url:"https://blogs.sap.com/wp-admin/post-new.php",target:"_self"},{name:"Activity Stream",url:"https://activities.sap.com",target:"_self"},{name:"Send a Message",url:"https://messages.sap.com",target:"_self"},{name:"Inbox",url:"https://people.sap.com/inbox",target:"_blank"}],middleSection:[{name:"SAP.com",url:"https://www.sap.com",target:"_blank"},{name:"SAP for Me",url:"https://me.sap.com",target:"_blank"}]},subHeaderActions:{subnavigation:{askQuestion:{id:"comm-shdr-AskQuestion",name:"Ask a Question",url:"https://answers.sap.com/questions/ask.html"},writeBlogPost:{id:"comm-shdr-WriteBlogPost",name:"Write a Blog Post",url:"https://blogs.sap.com/wp-admin/post-new.php"}},standardActions:{startDiscussion:{id:"comm-shdr-StartDiscussion",name:"Start a Discussion",url:"https://answers.sap.com/articles/create.html",optional:!0},sendDirectMessage:{id:"comm-shdr-SendMessage",name:"Send a Message",url:"https://messages.sap.com"},manageBlogPosts:{id:"comm-shdr-ManageBlogPosts",name:"Manage My Blog Posts",url:"https://blogs.sap.com/wp-admin/edit.php?post_type=post&author=currentUser"}},additionalActions:{gettingStarted:{id:"comm-shdr-GetStarted",name:"Quick Start Guide",url:"https://community.sap.com/resources/getting-started"},moderation:{id:"comm-shdr-Moderation",name:"Moderation",url:"https://answers.sap.com/moderation/index.html"},blogsAdministration:{id:"comm-shdr-Administration",name:"Administration",url:"https://blogs.sap.com/wp-admin"},answersAdministration:{id:"comm-shdr-Administration",name:"Administration",url:"https://answers.sap.com/admin/index.html"}}},defaultBreadcrumb:[{id:"comm-shdr-breadcrumb-home",url:"https://www.sap.com",name:"Home"},{id:"comm-shdr-breadcrumb-community",name:"Community",url:"https://community.sap.com"}],search:"https://community.sap.com/search",header:"https://sharedui.services.sap.com",avatarLink:"https://avatars.services.sap.com/images/%%%USERNAME%%%.png",profileLink:"https://people.sap.com",community:"https://community.sap.com",blogs:"https://blogs.sap.com",archive:"https://archive.sap.com",qa:"https://answers.sap.com",activityStreamHome:"https://activities.sap.com",shareduiService:"https://sharedui.services.sap.com",shareduiPublicService:"https://sharedui.services.sap.com",navJson:"https://www.sap.com/_jcr_content/parHeader/headerstandard.shared.json",sapcom:"https://www.sap.com",staticResources:"https://static.community.services.sap/com-hdr/v7",designmate:"https://static.community.services.sap/designmate/v3",designsystem:"https://static.community.services.sap/community-ds/v1",consentPage:"https://consent.services.sap.com/consent",consentPageRedirectBackSupported:!0};