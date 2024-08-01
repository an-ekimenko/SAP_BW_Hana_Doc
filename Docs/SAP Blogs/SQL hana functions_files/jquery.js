!function(e){e.fn.columnFilter=function(t){function n(e,t,n,a,r){if(void 0===t)return new Array;void 0===n&&(n=!0),void 0===a&&(a=!0),void 0===r&&(r=!0);var i;i=1==a?e.aiDisplay:e.aiDisplayMaster;for(var l=new Array,s=0,o=i.length;s<o;s++){var c=i[s],u=m.fnGetData(c,t);1==r&&0==u.length||(1==n&&jQuery.inArray(u,l)>-1||l.push(u))}return l.sort()}function a(e){return b.bUseColVis?m.fnSettings().oApi._fnVisibleToColumnIndex(m.fnSettings(),e):e}function r(t,n,r,i,l,s){var h="text_filter form-control";i&&(h="number_filter form-control");var f=t.fnSettings().aoPreSearchCols[c].sSearch,p="search_init ";u=(u=v.sSearchColumnPlaceholder).replace(/(^\s*)|(\s*$)/g,"");""!=f&&"^"!=f&&(i&&"^"==f.charAt(0)?f.substr(1):f,p="");var m=e('<input type="text" class="'+p+h+'" rel="'+c+'" placeholder="'+u+'" title="'+u+'"/><span class="tablesearch"/>');void 0!=s&&-1!=s&&m.attr("maxlength",s),d.html(m),i?d.wrapInner('<span class="filter_column filter_number" />'):d.wrapInner('<span class="filter_column filter_text" />'),o[c]=u;var b=c;if(i&&!t.fnSettings().oFeatures.bServerSide)m.keyup(function(){t.fnFilter("^"+this.value,a(b),!0,!1),g()});else{m.bind("propertychange input keyup",function(){if(t.fnSettings().oFeatures.bServerSide&&0!=l){t.fnSettings().aoPreSearchCols[b].sSearch;var i=e(this).data("dt-iLastFilterLength");void 0===i&&(i=0);var s=this.value.length;if(Math.abs(s-i)<l)return;e(this).data("dt-iLastFilterLength",s)}t.fnFilter(this.value,a(b),n,r),g()})}m.focus(function(){e(this).hasClass("search_init")&&(e(this).removeClass("search_init"),this.value="")}),m.blur(function(){""==this.value&&e(this).addClass("search_init")})}function i(t,a,r,i,s,o,u,d){o=!0,null==a&&(a=n(t.fnSettings(),r,!0,!1,!0));var h=r,f=t.fnSettings().aoPreSearchCols[c].sSearch;null!=f&&""!=f||(f=u);s=v.sAllValues;var p='<select class="search_init select_filter form-control" rel="'+c+'"><option value="" class="search_init">'+s+"</option>";d&&(p='<select class="search_init select_filter form-control" rel="'+c+'" multiple>');var m=0,b=a.length,x=!1;for(m=0;m<b;m++)if("object"!=typeof a[m]){var S;try{0===(S=e(a[m]).text()).length()&&(S=a[m])}catch(e){S=a[m]}translatedString=l(S).replace(/&lt;/g,"%%%lt").replace(/&gt;/g,"%%%gt").replace(/\+/g,"%%%plus");var y=translatedString.split(";");for(k=0;k<y.length;k++){string=y[k],string=string.replace(/^(<.[^(><.)]+>|\s)*/g,""),string=string.replace(/(<.[^(><.)]+>|\s)*$/g,"");var _=string;string+""!=""&&string+""!=" "&&string+""!="&zwnj;"&&string+""!="‌‌"||(_=v.sEmptyCells);var F=string;F="(^|;)(<.[^(><.)]+>|\\s)*?"+(F=(F=(F=(F=(F=(F=F.replace(/<.*?>+/g,"(<.*?>|\\s)*?")).replace(/\s/g,"\\s")).replace(/%%%lt/g,"&lt;")).replace(/%%%gt/g,"&gt;")).replace(/%%%plus/g,"\\+")).replace(/\\\\/g,"\\"))+"(<.[^(><.)]+>|\\s)*?(;|$)",_=(_=(_=(_=_.replace(/%%%lt/g,"&lt;")).replace(/%%%gt/g,"&gt;")).replace(/%%%plus/g,"+")).replace(/\\/g,"");var w="";F!=f&&F!=escape(f)||(w="selected "),stringToAdd="<option "+w+' value="'+F+'">'+_+"</option>",x||_!==v.sEmptyCells?x&&_===v.sEmptyCells||-1===p.indexOf(stringToAdd)&&(p+=stringToAdd):(p+=stringToAdd,x=!0)}}else{w="";o?(a[m].value==f&&(w="selected "),p+="<option "+w+'value="'+a[m].value+'">'+a[m].label+"</option>"):(escape(a[m].value)==f&&(w="selected "),p+="<option "+w+'value="'+escape(a[m].value)+'">'+a[m].label+"</option>")}var R=e(p+"</select>"),T=(w=e(R).val(),e(R).find("option"));T.sort(function(t,n){var a=e(t).text().toUpperCase(),r=e(n).text().toUpperCase();return a<r?-1:a>r?1:0}),e(R).empty().append(T),e(R).val(w),i.html(R),i.wrapInner('<span class="filter_column filter_select" />'),d?R.change(function(){""!=e(this).val()?e(this).removeClass("search_init"):e(this).addClass("search_init");var n=e(this).val(),a=[];if(null==n||n==[])var r="^(.*)$";else{e.each(n,function(e,t){a.push(l(t))});r="^("+a.join("|")+")$"}t.fnFilter(r,h,!0,!1)}):(R.change(function(){""!=e(this).val()?e(this).removeClass("search_init"):e(this).addClass("search_init"),o?t.fnFilter(e(this).val(),r,o,!1):t.fnFilter(unescape(e(this).val()),r),g()}),null!=f&&""!=f&&t.fnFilter(unescape(f),r))}function l(e){return e.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&")}function s(e){switch(e){case 0:return v.sRangeFormat.substring(0,v.sRangeFormat.indexOf("_FROM_"));case 1:return v.sRangeFormat.substring(v.sRangeFormat.indexOf("_FROM_")+6,v.sRangeFormat.indexOf("_TO_"));default:return v.sRangeFormat.substring(v.sRangeFormat.indexOf("_TO_")+4)}}var o,c,u,d,h="From _FROM_ to _TO_",f=new Array,p=new Array,g=function(){},m=this,v={sRangeFormat:"From _FROM_ to _TO_",sAllValues:"All values",sEmptyCells:"Empty cells",sSearchColumnPlaceholder:"Search within the column",sSearchRange:"Search in range"};m.fnSettings().oLanguage.sUrl.length>0?e.ajax({async:!1,url:m.fnSettings().oLanguage.sUrl,dataType:"json",success:function(e){v.sRangeFormat=e.sRangeFormat,v.sAllValues=e.sAllValues,v.sEmptyCells=e.sEmptyCells,v.sSearchColumnPlaceholder=e.sSearchColumnPlaceholder,v.sSearchRange=e.sSearchRange}}):(v.sAllValues=m.fnSettings().oLanguage.sAllValues,v.sEmptyCells=m.fnSettings().oLanguage.sEmptyCells,v.sRangeFormat=m.fnSettings().oLanguage.sRangeFormat,v.sSearchColumnPlaceholder=m.fnSettings().oLanguage.sSearchColumnPlaceholder,v.sSearchRange=m.fnSettings().oLanguage.sSearchRange);var b=e.extend({sPlaceHolder:"foot",sRangeSeparator:"~",iFilteringDelay:500,aoColumns:null,sRangeFormat:"From _FROM_ to _TO_",sDateFromToken:"from",sDateToToken:"to"},t);return this.each(function(){if(m.fnSettings().oFeatures.bFilter){o=new Array;var t=m.fnSettings().aoFooter[0];m.fnSettings().nTFoot;if("head:after"==b.sPlaceHolder){var l=e("tr:first",m.fnSettings().nTHead).detach();m.fnSettings().bSortCellsTop?(l.prependTo(e(m.fnSettings().nTHead)),t=m.fnSettings().aoHeader[1]):(l.appendTo(e(m.fnSettings().nTHead)),t=m.fnSettings().aoHeader[0]),"tr:last",m.fnSettings().nTHead}else if("head:before"==b.sPlaceHolder){if(m.fnSettings().bSortCellsTop){(l=e("tr:first",m.fnSettings().nTHead).detach()).appendTo(e(m.fnSettings().nTHead)),t=m.fnSettings().aoHeader[1]}else t=m.fnSettings().aoHeader[0];"tr:first",m.fnSettings().nTHead}for(e(t).each(function(t){c=t;var l={type:"text",bRegex:!1,bSmart:!0,iMaxLenght:-1,iFilterLength:0};if(null!=b.aoColumns){if(b.aoColumns.length<c||null==b.aoColumns[c])return;l=b.aoColumns[c]}if(u=e(e(this)[0].cell).text(),null==l.sSelector?d=e(e(this)[0].cell):0==(d=e(l.sSelector)).length&&(d=e(e(this)[0].cell)),null!=l)switch(h=null!=l.sRangeFormat?l.sRangeFormat:b.sRangeFormat,l.type){case"null":break;case"number":r(m,!0,!1,!0,l.iFilterLength,l.iMaxLenght);break;case"select":1!=l.bRegex&&(l.bRegex=!1),function(e,t,n,r,l){var s=e.fnSettings();null!=t&&"function"!=typeof t||""==s.sAjaxSource||s.oFeatures.bServerSide||s.aoDrawCallback.push({fn:function(s,o,c){return function(u){if(2==u.iDraw&&null!=u.sAjaxSource&&""!=u.sAjaxSource&&!u.oFeatures.bServerSide)return i(e,t&&t(u.aoData,u),a(s),o,c,n,r,l)}}(c,d,u),sName:"column_filter_"+c}),i(e,"function"==typeof t?null:t,a(c),d,u,n,r,l)}(m,l.values,l.bRegex,l.selected,l.multiple);break;case"number-range":!function(t){d.html(s(0));var n=t.attr("id")+"_range_from_"+c,r=e('<input type="text" class="number_range_filter form-control" id="'+n+'" rel="'+c+'"/>');d.append(r),d.append(s(1));var i=t.attr("id")+"_range_to_"+c,l=e('<input type="text" class="number_range_filter form-control" id="'+i+'" rel="'+c+'"/>');d.append(l),d.append(s(2)),d.wrapInner('<span class="filter_column filter_number_range form-control" />');var o=c;p.push(c),t.dataTableExt.afnFiltering.push(function(e,r,l){if(t.attr("id")!=e.sTableId)return!0;if(null===document.getElementById(n))return!0;var s=document.getElementById(n).value,c=document.getElementById(i).value,u="-"===r[a(o)]?"":1*r[a(o)];return""===s&&""===c||""===s&&u<=c||s<=u&&""===c||s<=u&&u<=c}),e("#"+n+",#"+i,d).bind("propertychange input keyup",function(){var e=1*document.getElementById(n).value,a=1*document.getElementById(i).value;0!=e&&0!=a&&e>a||(t.fnDraw(),g())})}(m);break;case"date-range":!function(t){var n=h.split(/[}{]/);d.html("");var r=t.attr("id")+"_range_from_"+c,i=e('<input type="text" class="date_range_filter form-control" id="'+r+'" rel="'+c+'"/>');i.datepicker();var l=t.attr("id")+"_range_to_"+c,s=e('<input type="text" class="date_range_filter form-control" id="'+l+'" rel="'+c+'"/>');for(ti=0;ti<n.length;ti++)n[ti]==b.sDateFromToken?d.append(i):n[ti]==b.sDateToToken?d.append(s):d.append(n[ti]);d.wrapInner('<span class="filter_column filter_date_range" />'),s.datepicker();var o=c;p.push(c),t.dataTableExt.afnFiltering.push(function(n,r,l){if(t.attr("id")!=n.sTableId)return!0;var c=i.datepicker("getDate"),u=s.datepicker("getDate");if(null==c&&null==u)return!0;var d=null;try{if(null==r[a(o)]||""==r[a(o)])return!1;d=e.datepicker.parseDate(e.datepicker.regional[""].dateFormat,r[a(o)])}catch(e){return!1}return null!=d&&(null==c&&d<=u||c<=d&&null==u||c<=d&&d<=u)}),e("#"+r+",#"+l,d).change(function(){t.fnDraw(),g()})}(m);break;case"checkbox":!function(t,a){null==a&&(a=n(t.fnSettings(),c,!0,!0,!0));var r,i=c,l="",s=a.length,o=u.replace("%","Perc").replace("&","AND").replace("$","DOL").replace("£","STERL").replace("@","AT").replace(/\s/g,"_");o=o.replace(/[^a-zA-Z 0-9]+/g,"");var h=u;null==b.sFilterButtonText&&void 0==b.sFilterButtonText||(h=b.sFilterButtonText);var f=Math.floor(s/12);s%12>0&&(f+=1);var p=100/f-2,m=10*f;1==f&&(p=20);var v='<div style="float:left; min-width: '+p+'%; " >',x=t.attr("id")+o,S="chkBtnOpen"+x,y=x+"-flt-toggle";for(l+='<button id="'+S+'" class="checkbox_filter btn btn-default" > '+h+"</button>",l+='<div id="'+y+'" title="'+u+'" rel="'+c+'" class="toggle-check ui-widget-content ui-corner-all"  style="width: '+m+'%; " >',l+=v,r=0;r<s;r++){r%12==0&&0!=r&&(l+="</div>"+v);var _=a[r],F=a[r];"object"==typeof a[r]&&(_=a[r].label,F=a[r].value);var w=e(l+='<input class="search_init checkbox_filter btn btn-default" type="checkbox" id= "'+x+"_cb_"+F+'" name= "'+o+'" value="'+F+'" >'+_+"<br/>");d.html(w),d.wrapInner('<span class="filter_column filter_checkbox" />'),w.change(function(){var n="",a="|",r=e('input:checkbox[name="'+o+'"]:checked').size();e('input:checkbox[name="'+o+'"]:checked').each(function(t){(0==t&&1==r||0!=t&&t==r-1)&&(a=""),n=(n=n.replace(/^\s+|\s+$/g,""))+e(this).val()+a,a="|"}),""!=n?e('input:checkbox[name="'+o+'"]').removeClass("search_init"):e('input:checkbox[name="'+o+'"]').addClass("search_init"),t.fnFilter(n,i,!0,!1),g()})}e("#"+S).button(),e("#"+y).dialog({autoOpen:!1,hide:"blind",buttons:[{text:"Reset",click:function(){return e('input:checkbox[name="'+o+'"]:checked').each(function(t){e(this).attr("checked",!1),e(this).addClass("search_init")}),t.fnFilter("",i,!0,!1),g(),!1}},{text:"Close",click:function(){e(this).dialog("close")}}]}),e("#"+S).click(function(){e("#"+y).dialog("open");var t=e(this);return e("#"+y).dialog("widget").position({my:"top",at:"bottom",of:t}),!1});var k=g;g=function(){var t=e("#"+S);e("#"+y).dialog("widget").position({my:"top",at:"bottom",of:t}),k()}}(m,l.values);break;case"twitter-dropdown":case"dropdown":!function(t){var n,a=c,r='<div class="dropdown select_filter form-control"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+u+'<b class="caret"></b></a><ul class="dropdown-menu" role="menu"><li data-value=""><a>Show All</a></li>',i=t.length;for(n=0;n<i;n++)r+='<li data-value="'+t[n]+'"><a>'+t[n]+"</a></li>";var l=e(r+"</ul></div>");d.html(l),d.wrapInner('<span class="filterColumn filter_select" />'),l.find("li").click(function(){m.fnFilter(e(this).data("value"),a)})}(l.values);break;case"cell-range":!function(t){var n=t.fnSettings().aoPreSearchCols[c].sSearch,r="search_init ";u=(u=v.sSearchRange).replace(/(^\s*)|(\s*$)/g,""),""!=n&&"^"!=n&&(bIsNumber&&"^"==n.charAt(0)&&n.substr(1),r="");var i="cell_number_range_"+c,l=e('<input type="text" id="'+i+'" class="'+r+'number_range_filter form-control" rel="'+c+'" placeholder="'+u+'" title="'+u+'"/><span class="tablesearch"/>');d.html(l),d.wrapInner('<span class="filter_column filter_number" />');var s=c;p.push(c),t.dataTableExt.afnFiltering.push(function(e,n,r){if(console.log("test"),t.attr("id")!=e.sTableId)return!0;if(null===document.getElementById(i))return!0;var l=1*document.getElementById(i).value,o=n[a(s)];o=o.replace(/\s/g,"");var c=new RegExp("^[0-9]+$"),u=new RegExp("^[0-9]+-[0-9]+");if(""==l)return!0;if(c.test(o)){if(o==l)return!0}else if(u.test(o)){var d=o.split("-"),h=d[0],f=d[1];if(h<=l&&l<=f)return!0}return!1}),e("#"+i,d).keyup(function(){document.getElementById(i).value,t.fnDraw(),g()})}(m);break;case"text":default:bRegex=null!=l.bRegex&&l.bRegex,bSmart=null!=l.bSmart&&l.bSmart,r(m,bRegex,bSmart,!1,l.iFilterLength,l.iMaxLenght)}}),j=0;j<p.length;j++){f.push(function(){var t=m.attr("id");return e("#"+t+"_range_from_"+p[j]).val()+b.sRangeSeparator+e("#"+t+"_range_to_"+p[j]).val()})}if(m.fnSettings().oFeatures.bServerSide){var x=m.fnSettings().fnServerData;m.fnSettings().fnServerData=function(t,n,a){for(j=0;j<p.length;j++){var r=p[j];for(k=0;k<n.length;k++)n[k].name=="sSearch_"+r&&(n[k].value=f[j]())}if(n.push({name:"sRangeSeparator",value:b.sRangeSeparator}),null!=x)try{x(t,n,a,m.fnSettings())}catch(e){x(t,n,a)}else e.getJSON(t,n,function(e){a(e)})}}}})},jQuery.fn.dataTableExt.oSort["alpha-numeric-asc"]=function(e,t){var n=new RegExp("^([a-zA-Z]*)(.*)"),a=n.exec(e),r=n.exec(t);return a[1]>r[1]?1:a[1]<r[1]?-1:(a[2]=parseInt(a[2]),r[2]=parseInt(r[2]),a[2]<r[2]?-1:a[2]>r[2]?1:0)},jQuery.fn.dataTableExt.oSort["alpha-numeric-desc"]=function(e,t){var n=new RegExp("^([a-zA-Z]*)(.*)"),a=n.exec(e),r=n.exec(t);return a[1]>r[1]?-1:a[1]<r[1]?1:(a[2]=parseInt(a[2]),r[2]=parseInt(r[2]),a[2]<r[2]?1:a[2]>r[2]?-1:0)}}(jQuery),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t,window,document)}):"object"==typeof exports?module.exports=function(t,n){return t||(t=window),n||(n="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(n,t,t.document)}:e(jQuery,window,document)}(function(e,t,n,a){"use strict";var r=e.fn.dataTable,i=(r.ext.columnFilters,function(n,l){var s=new r.Api(n);this.c=e.extend(!0,[],i.defaults,l);var o=s.settings()[0];if(o._columnFilters)throw"ColumnFilters already initialized on table "+o.nTable.id;o._columnFilters=this,this.s={dt:s,columnFilters:[],filterPresets:function(e){if(e===a)return[];var n,r,i=t.location.search.substring(1).split("&"),l=[];for(r=0;r<i.length;r++){var s=(n=decodeURIComponent(i[r]).split("="))[0];n[1],s.indexOf(e)>-1&&l.push([n[0].substring(s.lastIndexOf(e)+e.length+1),n[1]])}return l}(s.settings()[0].oInit.sapTableId),displayedColumnFilters:e()},this._constructor()}),l=function(t,n,a){this.idx=t,this.context=n,this.element=e(),this.state=[],this.number=0,this.id=a};l.prototype.addElement=function(){},l.prototype.addListeners=function(){},l.prototype.setState=function(e){},l.prototype.search=function(){},l.prototype.getState=function(){return this.state},l.prototype.checkDefaults=function(){if(this.id){for(var e=this.context.s.filterPresets,t=0;t<e.length;t++)e[t][0]===this.id&&this.addDefaults(e[t][1]);this.context.s.dt.draw()}},l.prototype.saveState=function(e){this.context.s.saveState&&this.state!==e&&(this.state=e,this.element.trigger("triggerSave"))},l.prototype.addDefaults=function(){};var s=function(e,t,n,a){l.call(this,e,n,a),this.bRegex=t,this.number=1};(s.prototype=Object.create(l.prototype)).constructor=s,s.prototype.addElement=function(){var t=e('<th><span class="filter_column filter_text"><input class="display" type="text" value="" placeholder="'+this.context.s.dt.i18n("sSearchColumnPlaceholder")+'" /><span class="tablesearch"/></span></th>');e.data(t,"type","text"),e.data(t,"bRegex",this.bRegex),this.element=t},s.prototype.addListeners=function(){var t=this.element,n=this.context.s.dt.column(this.idx),a=this;t.find("input").on("keyup change",function(){n.search()!==this.value&&(n.search(this.value,e.data(t,"bRegex")).draw(),a.saveState(this.value))})},s.prototype.addDefaults=function(t){var n=this.element,a=this.context.s.dt.column(this.idx);n.find("input").val(t),a.search(t,e.data(n,"bRegex")),a.draw()},s.prototype.setState=function(e){this.addDefaults(e),this.saveState(e)};var o=function(e,t,n,a){s.call(this,e,t,n,a),this.number=2};(o.prototype=Object.create(s.prototype)).constructor=o,o.prototype.addElement=function(){var t=e('<th><span class="filter_column filter_text number_filter"><input class="display" type="number" value="" placeholder="Filter" /><span class="tablesearch"/></span></th>');e.data(t,"type","text"),this.element=t};var c=function(e,t,n){l.call(this,e,t,n),this.number=3};(c.prototype=Object.create(l.prototype)).constructor=c,c.prototype.normalizeSearchQueries=function(t){try{return e(t),t}catch(e){return t.replace(/&(?:[a-z\d]+|#\d+|#x[a-f\d]+);/gi,"").replace(/([\!\#\$\%\\&;(\)\*\+,\.\/:=<>\?@\[\]\^\`\{\|\}\~'"])/g,"")}},c.prototype.addElement=function(){function t(t,n,a){var r=e("<li class='sli'></li>");return r.append(e("<input type='checkbox' value='"+function(e){return e.replace(/[\"&<>]/g,function(e){return{'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;"}[e]})}(t)+"' data-label='"+n+"'/>")),r.append(a),r}var n=this.context.s.dt.column(this.idx),r=e(n.nodes().to$()),i=this,l=this.idx,s=this.context.s.dt.settings()[0].oInit.language,o={blankLabel:this.context.s.dt.i18n("sEmptyCells"),filter:s.sFilter===a?"Filter":this.context.s.dt.i18n("sFilter"),selectAll:s.sSelectAll===a?"Select All":this.context.s.dt.i18n("sSelectAll"),removeFilter:s.sRemoveFilter===a?"Remove Filter":this.context.s.dt.i18n("sRemoveFilter")},c=[],u=[];!function(t){e.each(t,function(t,n){if(0===e(n).find("li.sli").length){var a=e("<item>"+n.innerHTML+"</item>");e(a).html(e.trim(e(a).html())),-1===c.indexOf(e(a).html())&&(c.push(e(a).html()),u.push(e(a).text().trim()))}else e(n).find("li.sli").each(function(){e(this).html(e.trim(e(this).html())),-1===c.indexOf(e(this).html())&&(c.push(e(this).html()),u.push(e(this).text().trim()))})})}(r);var d=function(n,a,r){for(var i=[],l=!1,s="",o=0;o<n.length;o++){var c=t(n[o],a[o],a[o]);""===a[o]?(s=n[o],l=!0):i.push(c)}i.sort(function(t,n){return e(t).text().toUpperCase().localeCompare(e(n).text().toUpperCase())});var u=e("<ul></ul>");return e.each(i,function(e,t){u.append(t)}),l&&u.prepend(t(s,"",r.blankLabel)),u.prepend(function(t){var n=e("<li class='sli list-function remove-filter'></li>"),a=e("<a href='#'></a>");return a.text(t),n.append(a),n}(r.removeFilter)),u.prepend(function(t){var n=e("<li class='sli list-function select-all'></li>"),a=e("<a href='#'></a>");return a.text(t),n.append(a),n}(r.selectAll)),u}(c,u,o),h=e("<div><label><a href='#'><span class='hida'>"+o.filter+"</span></a></label></div>");e(h).append("<div class='multiSelect'></div>"),e(h.children(".multiSelect")).html(d);var f=e('<th class="dropdown"> </th>');f.append(h),e.fn.dataTable.ext.search.push(function(t,n,a,r){if(t.nTable.id!==i.context.id)return!0;var s=[],o=e(f).find(".multiSelect input:checked");if(0===o.length)return!0;e.each(o,function(t,n){s.push(i.normalizeSearchQueries(e(n).attr("data-label")))});var c=[],u=!1,d=i.context.s.dt.cell(a,l).nodes().to$();if(e(d).find("li.sli").each(function(){u=!0;var t=i.normalizeSearchQueries(e(this).text().trim());c.push(t),e(this).removeClass("dt_highlight")}),!u){var h=e(d).text().trim();c.push(i.normalizeSearchQueries(h))}var p=s.filter(function(e){return-1!==c.indexOf(e)});return i.saveState(s),p.length>0}),e.data(f,"type","select"),this.element=f},c.prototype.addListeners=function(){var n=this.element,a=this.context;n.find(".multiSelect").hide(),n.find("label").on("click",function(){if(0===e(".dropdown .multiSelect:visible").length){e(this).next(".multiSelect").toggle(),r()}else e(".dropdown .multiSelect:visible").hide();return!1}),n.find(".select-all").children().on("click",function(){return e(this).parent().siblings().find("input:checkbox:not(checked)").prop("checked",!0),a.s.dt.draw(),!1}),n.find(".remove-filter").children().on("click",function(){return e(this).parent().siblings().find("input:checkbox:checked").prop("checked",!1),a.s.dt.draw(),!1}),n.find(".multiSelect").on("change",function(){a.s.dt.draw(),r()});var r=function(){i(),l()},i=function(){var a=n.find(".multiSelect"),r=e(t).width();r>600?a.children("ul").width("500px"):a.children("ul").width(r-100+"px"),a.css("margin-left","");var i=a.closest(".tablenoborder").offset().left+a.closest(".tablenoborder").width(),l=a.children("ul").offset().left+a.children("ul").width();l+20>i&&a.css("margin-left",i-l-20+"px")},l=function(){var e=n.find(".multiSelect"),t=e.closest(".dataTables_wrapper");t.parent().css("padding-bottom","");var a=e.closest(".tablenoborder").offset().top+e.closest(".tablenoborder").height(),r=e.children("ul").offset().top+e.children("ul").height();r+90>a&&t.parent().css("padding-bottom",r+90-a)}},c.prototype.addDefaults=function(t){var n=this;this.element.find("input").each(function(a){e(this).attr("data-label")!==t&&n.normalizeSearchQueries(e(this).attr("data-label"))!==t||e(this).prop("checked",!0)})},c.prototype.setState=function(e){for(var t=0;t<e.length;t++)this.addDefaults(e[t])};var u=function(e,t,n){l.call(this,e,t,n),this.number=4};(u.prototype=Object.create(l.prototype)).constructor=u,u.prototype.addElement=function(){var t=e('<th class="number-range"></th>'),n=e('<input class="dt-from" type="number" placeholder="'+this.context.s.dt.i18n("sFrom")+'" min="0">'),a=e('<input class="dt-to" type="number" placeholder="'+this.context.s.dt.i18n("sTo")+'" min="0">'),r=this,i=this.idx;t.append(n),t.append(a),e.data(t,"type","number-range"),e.fn.dataTable.ext.search.push(function(e,t,l,s){if(e.nTable.id!==r.context.id)return!0;var o=n.val(),c=a.val();r.saveState([o,c]);var u="-"===t[i]?"":1*t[i];return""===o&&""===c||(""===o&&u<=c||(o<=u&&""===c||o<=u&&u<=c))}),this.element=t},u.prototype.addListeners=function(){var e=this.element,t=this.context.s.dt.column(this.idx);e.find("input").on("keyup change",function(){t.draw()})},u.prototype.setState=function(e){var t=this.element;t.find("input.dt-from").val(e[0]),t.find("input.dt-to").val(e[1])};var d=function(e,t,n){l.call(this,e,t,n),this.number=5};(d.prototype=Object.create(l.prototype)).constructor=d,d.prototype.addElement=function(){var t=e('<th class="filter_column filter_number cell-range"></th>'),n=e('<input type="number" placeholder="'+this.context.s.dt.i18n("sSearchRange")+'" min="0"></input>');t.append(n),e.data(t,"type","cell-range");var a=this,r=this.idx;e.fn.dataTable.ext.search.push(function(e,t,i,l){if(e.nTable.id!==a.context.id)return!0;var s=n.val();if(a.saveState(s),""===s)return!0;s*=1;var o=t[r],c=new RegExp("^[0-9]+$"),u=new RegExp("^[0-9]+-[0-9]+");if(c.test(o)){if(s===o)return!0}else if(u.test(o)){var d=o.split("-"),h=d[0],f=d[1];if(h<=s&&s<=f)return!0}return!1}),this.element=t},d.prototype.addListeners=function(){var e=this.element,t=this.context.s.dt.column(this.idx);e.find("input").on("keyup change",function(){t.draw()})},d.prototype.addDefaults=function(e){this.element.find("input").val(e),this.context.s.dt.column(this.idx).draw()},d.prototype.setState=function(e){this.addDefaults(e),this.saveState(e)};var h=function(e,t){l.call(this,e,t),this.number=6};(h.prototype=Object.create(l.prototype)).constructor=h,h.prototype.addElement=function(){var t=e("<th></th>");e.data(t,"type","none"),this.element=t},e.extend(i.prototype,{add:function(t,n){var a=e.extend(!0,{},{type:"text",bRegex:"false",id:""},t),r=a.type,i=a.bRegex,l=a.id;if("text"===r)var f=new s(n,i,this,l);else if("number"===r)f=new o(n,i,this,l);else if("select"===r)f=new c(n,this,l);else if("number-range"===r)f=new u(n,this,l);else if("cell-range"===r)f=new d(n,this,l);else f=new h(n,this,l);return f.addElement(),this.s.columnFilters.push(f),this},_constructor:function(){var t=this,r=this.s.dt,i=r.settings()[0].sInstance,l=i+"_filterrow";this.id=i;var s=e("#"+i),o=this.s.columnFilters;if(r.settings()[0].oInit.searchHighlight)var c="highlight-init";else c="init.dt.dth";this.s.displayedColumnFilters=e("<tr></tr>").attr("id",l),e("#"+i).find("thead").first().append(this.s.displayedColumnFilters);for(var u=0;u<this.c.length;u++)this.add(this.c[u],u);this._update();var d=r.settings()[0].oInit.bStateSave;this.s.saveState=d;var h="DataTables_"+i;for(u=0;u<o.length;u++)h+=o[u].number;var f=h;if(d)s.on(c,function(){var e=localStorage.getItem(f);if(null!==e)for(var n=JSON.parse(e),a=0;a<t.c.length;a++)o[a].setState(n.columnValues[a])}),s.on("triggerSave",function(){var e=localStorage.getItem(f);if(null!==e)var n=JSON.parse(e);else n=r.state();n.columnValues===a&&(n.columnValues=new Array(t.c.length));for(var i=0;i<t.c.length;i++)n.columnValues[i]=o[i].getState();localStorage.setItem(f,JSON.stringify(n))});else{s.on(c,function(){for(var e=0;e<t.c.length;e++)o[e].checkDefaults()});for(u=0;u<t.s.filterPresets.length;u++){var p=t.s.filterPresets[u];if(""===p[0]){var g=p[1];r.search(g).draw()}}}e(n).on("column-visibility.dt","#"+i,function(){t._update()}),e(n).bind("click",function(t){e(t.target).parents().hasClass("dropdown")||e(".dropdown .multiSelect").hide()})},_update:function(){var t=this.s.displayedColumnFilters;t.empty();var n=[];this.s.dt.columns().every(function(){this.visible()&&n.push(this.index())});for(var a=this.s.columnFilters,r=0;r<a.length;r++){var i=a[r];n.indexOf(i.idx)>-1&&(e(t).append(i.element),i.addListeners())}}}),i.defaults={},e.fn.dataTable.ColumnFilters=i,e.fn.DataTable.ColumnFilters=i,e(n).on("init.dt plugin-init.dt",function(e,t){if("dt"===e.namespace){var n=t.oInit.columnFilters||r.defaults.columnFilters;n&&!t._columnFilters&&new i(t,n)}})});