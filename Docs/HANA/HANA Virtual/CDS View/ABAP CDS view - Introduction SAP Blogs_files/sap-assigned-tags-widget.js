"use strict";jQuery(document).ready(function(e){return function(i,e){var a="dm-hidden",s=e.data,t=e.maxItemsBeforeHide,d=e.widgetClassname,n=Object.keys(s).map(function(e){return'<li class="dm-assignedTagsList__item"><a class="dm-assignedTagsList__title" href="'.concat(s[e],'">').concat(e,"</a></li>")}).join(""),l=i(n),m=l.slice(0,t),g=l.slice(t),c=i('<ul class="dm-assignedTagsList dm-widgetlist--default-items"></ul>').append(m);if(i(d).append(c),g.length){var r=i('<ul class="dm-assignedTagsList dm-widgetlist--extra-items dm-hidden"></ul>').append(g);i(d).append(r),i(d).append('<a class="dm-link dm-widget__more-link" data-toggle="viewAll">'.concat(o(!1),"</a>"))}function o(e){return e?"View less...":"View more..."}i(e.widgetClassname).on("click","a.dm-widget__more-link",function(e){e.preventDefault();var s=i(this).parent().find("ul.dm-widgetlist--extra-items");s.toggleClass(a);var t=!s.hasClass(a);i(this).text(o(t))})}(e,window.assignedTagsWidgetSettings)});