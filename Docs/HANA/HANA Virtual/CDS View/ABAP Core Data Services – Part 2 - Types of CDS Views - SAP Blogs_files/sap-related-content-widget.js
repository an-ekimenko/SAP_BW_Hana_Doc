"use strict";jQuery(document).ready(function(t){return u=t,m=window.relatedContentWidgetSettings,e=function(){var l="No related content found.";function s(t){return'<li class="dm-widgetlist__item"><div class="dm-widget__contentMessage"><p>'.concat(t,"</p></div></li>")}return{loadRelatedContent:function(t,e){var n=e.id,r=e.type,a=e.title,i=e.primary_tag,o=t.find("ul.dm-widgetlist"),d=o.attr("data-types"),c=parseInt(o.attr("data-limit"));u.ajax({url:m.contentServiceUrl,data:{topic:i,topicSwitch:!1,objectTypes:d,text:a,size:c+1},type:"GET",dataType:"json",beforeSend:function(){!function(t){u(t).append('<div class="dm-loading-indicator"><div class="dm-loading-indicator__bar dm-loading-indicator__bar--bar1"></div><div class="dm-loading-indicator__bar dm-loading-indicator__bar--bar2"></div><div class="dm-loading-indicator__bar dm-loading-indicator__bar--bar3"></div></div>')}(t)},complete:function(){!function(t){u(t).find(".dm-loading-indicator").remove()}(t)},success:function(t){if(void 0!==t.page&&0!==t.page.totalElements){var i="",d=!1;u.each(t._embedded.contents,function(t,e){if(d||t!==c)if(e.objectType===r&&void 0!==e.id&&e.id.match("_"+n+"$"))d=!0;else{e.author.url=m.profileUrl+"/"+e.author.userName,e.pub=new Date(e.published.split(".")[0]).toLocaleString("en-us",{month:"short",day:"2-digit",year:"numeric"});var a=function(t){var e="dm-widget__article-username",a="";return t.author.displayName.startsWith("Former")&&(e+=" disabled",a='aria-disabled="true"'),'<li class="dm-widgetlist__item"><div class="dm-widget__article">\n                                 <div class="dm-widget__article-content-box">\n                                    <div class="dm-widget__article-text">\n                                        <a class="dm-widget__article-title" href="'.concat(t.url,'" title="">').concat(t.displayName,'</a>\n                                        <div class="dm-widget__article-metadata">By \n                                            <a class="').concat(e,'" href="').concat(t.author.url,'" ').concat(a,' title="">').concat(t.author.displayName,"</a>, ").concat(t.pub,"</div>\n                                    </div>\n                                 </div>\n                            </div></li>")}(e);i+=a}}),i.length?o.append(i):o.append(s(l))}else o.append(s(l))},error:function(t){o.append(s("We are sorry but we are currently unable to retrieve related content."))}})}}}(),void u(m.widgetSelector).each(function(t){e.loadRelatedContent(u(this),m.targetContentItem)});var u,m,e});