var ns={high:"http://schemaapp.com/ontology/highlight#",schema:"http://schema.org/",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",gist:"http://ontologies.semanticarts.com/gist#"};var applicableTemplates=[];var config=null;var resourcesReady=false;var templatesLoaded=false;var schemaServer="https://api.hunchmanifest.com";var schemaCDN="https://data.schemaapp.com/";var LOCAL_STORAGE_KEY=location.host+"-schemaapp";var LOCAL_STORAGE_DATE_KEY=LOCAL_STORAGE_KEY+"-Date";var templateDict={};var TEXT_NODE=3;var CAPTURE_PAGE=false;var API_KEY_FIELD="X-API-KEY";var ANALYTICS_ENDPOINT="https://menyofluhd.execute-api.us-east-1.amazonaws.com/prod";var ANALYTICS_KEY="zvmDMsFIW85ymw0u3UhcD2E6dfpuOZBH4pffNmac";function applyContentFilter(a,c){var e=a;var b=[];if(c){var d=c.split('");');d.splice(d.length-1,1);d.forEach(function(g){var f={optionSelected:null,filterText:""};var h=g.split('("');f.optionSelected=h[0];if(h[1]){f.filterText=h[1]}b.push(f)})}b.forEach(function(h){var l=e.toLowerCase();var k=h.filterText.toLowerCase();switch(h.optionSelected){case"BEFORE":if(h.filterText){var f=l.indexOf(k);if(f>=0){e=e.slice(0,f)}else{e=""}}break;case"AFTER":if(h.filterText){var f=l.indexOf(k);if(f>=0){e=e.slice(f+k.length)}else{e=""}}break;case"OMIT":var j=new RegExp(h.filterText,"mi");e=e.replace(j,"");break;case"NUMBER":var i=/(\+|-)*((\d+[.]\d*)|(\d*[.]\d+)|\d+)/mi;var j=new RegExp(i);var g=j.exec(e);g?e=g[0]:e=null;break;case"NONNUMBER":e=e.replace(/\d+/gm,"");break}});return e?e:a}function hasLocalStorage(a){try{var c=window[a];item="Test";c.setItem(item,item);c.removeItem(item);return true}catch(b){console.log("Storage not available "+b.code+" "+b.name)}return false}function injectJSON(b){if(b!==""){var a=document.createElement("script");a.type="application/ld+json";a.innerHTML=b;document.getElementsByTagName("head")[0].appendChild(a)}}function timeOk(b){var a=24*60*60;var c=new Date().getTime()-parseInt(b);return !(c>a)}function persistToLocalStorage(a){if(hasLocalStorage("localStorage")){var b=window.localStorage;b.setItem(LOCAL_STORAGE_KEY,JSON.stringify(a));b.setItem(LOCAL_STORAGE_DATE_KEY,new Date().getTime().toString())}}function schemaAppgetAccountId(){var b=applicableTemplates[0].replace("http://schemaapp.com/db/","");var a=b.split("/");if(a[1]!==undefined&&a[1].match(/Template[0-9]+/)===null){var c=a[0]+"/"+a[1]}else{var c=a[0]}return c}function countPageForAnalytics(){var l=window.location.protocol+window.location.hostname;var m=l.replace(/\./g,"").replace(/:/g,"");for(var e=0;e<applicableTemplates.length;e++){var a=applicableTemplates[e].replace("http://schemaapp.com/db/","");var g=a.split("/");var b=[];for(var c=0;c<g.length;c++){var f=g[c];if(f==m||f.match(/Template[0-9]+/)!==null){break}b.push(f)}if(b[1]!==undefined){var h="http://schemaapp.com/db/"+b[0]+"/"+b[1]}else{var h="http://schemaapp.com/db/"+b[0]}var d={graph:h,source:"HighlightJS:"+applicableTemplates[e],url:window.location.href};var k=new XMLHttpRequest();k.open("POST",ANALYTICS_ENDPOINT,true);k.setRequestHeader(API_KEY_FIELD,ANALYTICS_KEY);k.setRequestHeader("Content-Type","application/json");k.send(JSON.stringify(d))}}function schemaAppLoadResources(){var b=window.location.protocol+"//"+window.location.host;var a=schemaServer+"/highlight/fetch.json?resource="+b;var c=new XMLHttpRequest();c.onreadystatechange=function(){if(this.readyState!==4||this.status!==200){return}config=JSON.parse(c.responseText);processConfig();persistToLocalStorage(config)};c.open("GET",a,true);c.send()}function processConfig(){var b=getEntityByType(config,"HighlightTemplate");var a=[location.protocol,"//",location.host,location.pathname].join("");b.forEach(function(p){var d=true;var o=config[p];if(o[ns.high+"pattern"]===undefined){return}for(var k=0;k<o[ns.high+"pattern"].length;k++){var q=o[ns.high+"pattern"][k];var m=config[q.value];var c=m[ns.gist+"categorizedBy"];var h=m[ns.gist+"hasMember"];for(var g=0;g<h.length;g++){var n=c[0];var f=n.value.replace(ns.high,"");var e=m[ns.gist+"hasMember"][g];var l=e.value;if(f==="GlobCollection"){if(globChecker(a,l)){d=false}}else{if(f==="XPathCollection"){if(document.evaluate(l,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue){d=false}}else{if(l==a){d=false}}}}}if(!d){console.log("Pushing Template "+p);applicableTemplates.push(p)}});resourcesReady=true;loadTemplates()}function processHighlights(b,a,c){b.forEach(function(f){var e=getObjects(config,f,ns.rdf+"type");var i=config[f];if(c!==undefined){i[ns.high+"xPath"][0]["value"]=c+i[ns.high+"xPath"][0]["value"]}var d=tagFactory(e[0],i);var g=Tag.extract(d);a=merge(a,g)});return a}function createListTagPath(f,a){var d=f.split("~");d=d.slice(0,d.length-2);var h=a;for(var c=1;c<=d.length;c++){var e=d[c-1];if(c%2===0){keyFound=false;for(var b in h){if(h[b]["@type"]==e){h=h[b];keyFound=true}}if(!keyFound){var g={"@type":e};h.push(g);h=g}}else{if(h.hasOwnProperty(e)){h=h[e];continue}else{h[e]=[];h=h[e]}}}return h}function processListTagHighlights(l,g,q,c){var e={};var d={};var o=false;var f=q[ns.high+"xPath"][0]["value"];var b=q[ns.high+"propertyPath"][0]["value"];var m=createListTagPath(b,g);if(f.slice(-1)=="]"){f=f.split("/");f.pop();f.push("*");f=f.join("/")}var h=q[ns.high+"propertyPath"][0]["value"].split("~");var n=h.pop();var p=h.pop();if(m[p]===undefined){m[p]=[]}else{if(typeof m[p]==="string"){m[p]=[m[p]]}}var a=document.evaluate(f,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);for(var k=0;k<a.snapshotLength;k++){var j=a.snapshotItem(k);d={"@type":n,"@id":window.location.href+"#"+n.replace("http://schema.org/","")+"_"+c};l.forEach(function(t){var r=getObjects(config,t,ns.rdf+"type");var v=config[t];if(v[ns.rdf+"type"][0]["value"]===ns.high+"TagXPath"){var s=v[ns.high+"xPath"][0]["value"];v[ns.high+"xPath"][0]["value"]=s.indexOf("/")==0?s.slice(1):s}var i=tagFactory(r[0],v);var u=Tag.extract(i,j);d=merge(d,u)});c++;m[p].push(d)}return{resource:g,objectCount:a.snapshotLength}}function loadTemplates(){if(!resourcesReady||templatesLoaded){return false}templatesLoaded=true;applicableTemplates.forEach(function(e){var c=getObjects(config,e,ns.gist+"categorizedBy");var a={"@context":"http://schema.org/","@type":c[0],"@id":window.location.href+"#"+c[0].replace("http://schema.org/",""),url:window.location.href};var d=[];var h=[];var f=getObjects(config,e,ns.high+"hasHighlight");f.forEach(function(j){var i=getObjects(config,j,ns.rdf+"type");if(i==ns.high+"TagList"){h.push(j)}else{d.push(j)}});a=processHighlights(d,a);var g=1;h.forEach(function(l){var i=config[l];var j=getObjects(config,l,ns.high+"hasTemplate");var k=config[j[0]];var m=getObjects(config,j,ns.high+"hasHighlight");res=processListTagHighlights(m,a,i,g);a=res.resource;g+=res.objectCount});var b=JSON.stringify(a,function(i,j){if(i=="offer"){return j.id}else{return j}});injectJSON(b)});countPageForAnalytics()}function getObjects(b,c,a){var e=[];for(var d in b[c]){if(d===a){for(var f in b[c][d]){if(b[c][d][f].type==="uri"){e.push(b[c][d][f].value)}else{if(b[c][d][f].type==="literal"){e.push(b[c][d][f].value)}}}}}return e}function getEntityByType(a,c){var e=[];for(var b in a){for(var d in a[b]){if(d===ns.rdf+"type"){if(a[b][d][0].value===(ns.high+c)){e.push(b)}}}}return e}function extractObject(g,c,f){var b=c[0];var e=c[1];var d={};d["@type"]=b;if(c.length>2){var a=c.splice(2,c.length-2);if(typeof g==="undefined"){d[e]=extractObject(d,a,f);return d}else{d=extractObject(g[e],a,f);if(g[e] instanceof Array){g[e]=merge(g[e][0],d)}else{g[e]=[g[e],d]}return g}}else{d[e]=f;return d}}function overlappingKeys(d,c){var a=false;var b=false;for(key in d){if(key==="@type"){if(d[key]===c[key]){a=true}else{return false}continue}if(c.hasOwnProperty(key)&&key!=="@type"){if(c[key].constructor===Object){return false}b=true}}if(b&&a){return true}return false}function MergeRecursive(d,c){if(d===undefined){return c}if(overlappingKeys(d[0],c[0])){return[d,c]}for(var b in c){try{if(c[b].constructor==Object){d[b]=MergeRecursive(d[b],c[b])}else{d[b]=c[b]}}catch(a){d[b]=c[b]}}return d}var merge=function(){var d={},c=0,a=arguments.length,b;for(;c<a;c++){for(b in arguments[c]){if(arguments[c].hasOwnProperty(b)){d[b]=MergeRecursive(d[b],arguments[c][b])}}}return d};function tagFactory(b,a){if(b===(ns.high+"TagXPath")||b===(ns.high+"TagXPathDefined")){return Tag.construct(a,Tag.tagTypes.TagXPath)}else{if(b===(ns.high+"TagDefined")){return Tag.construct(a,Tag.tagTypes.TagDefined)}else{if(b===(ns.high+"TagStoredResource")){return Tag.construct(a,Tag.tagTypes.TagStoredResource)}else{if(b===(ns.high+"TagYouTube")){return Tag.construct(a,Tag.tagTypes.TagYouTube)}}}}throw new TypeError("Tag Factory unable to create class "+b)}var Tag={tagTypes:Object.freeze({TagXPath:1,TagDefined:2,TagStoredResource:3,TagYouTube:4}),construct:function(a,b){return[a,[],b]},extract:function(b,a){var c=b[2];if(a===undefined){a=document}switch(c){case Tag.tagTypes.TagXPath:return Tag.xpathExtract(b,a);break;case Tag.tagTypes.TagDefined:return Tag.tagDefined(b);break;case Tag.tagTypes.TagStoredResource:return Tag.storedResource(b);break;case Tag.tagTypes.TagYouTube:return Tag.videoResource(b);break}},getContentFromElement:function(e){if(e.nodeType===TEXT_NODE){return e.wholeText}var b=e.localName.toLowerCase();var c=new Set(["img","video","audio","source","embed"]);var d=new Set(["a","area"]);var i=new Set(["meta"]);if(c.has(b)){if(e.hasAttribute("src")){var a=e.getAttribute("src");if(!a.startsWith("http")){a=window.location.protocol+"//"+window.location.host+a}return a}else{return Tag.getContentFromElement(e.getElementsByTagName("source")[0])}}else{if(d.has(b)){var h=e.getAttribute("href");return h}else{if(i.has(b)){var j=e.getAttribute("content");return j}}}var f=e.cloneNode(true);removeScripts(f);var g=f.textContent;return g},assignProperty:function(h,g,f){var a=h[1];var b=h[0];if(g.includes("~")){var c=g.split("~");var e=c.shift();var d=extractObject(a[e],c,f);if(typeof a[e]!=="undefined"){if(a[e] instanceof Array){a[e]=merge(a[e][0],d)}else{a[e]=[a[e],d]}}else{a[e]=[d]}}else{a[g]=f}return[b,a]},tagDefined:function(e){var b=e[0];var a=e[1];var d=b[ns.high+"propertyPath"][0].value;var c=b[ns.high+"value"][0].value;return Tag.assignProperty([b,a],d,c)[1]},videoResource:function(c,b){var d=c[0];var h=d[ns.high+"xPath"][0].value;var e=[];var g=d[ns.high+"propertyPath"][0].value;var f=document.evaluate(h,b,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);if(!f){return[]}var a=f.src.split("/").pop();value={"@id":a};var i=new XMLHttpRequest();i.onreadystatechange=function(){if(this.readyState!==4||this.status!==200){return}var j=JSON.parse(xhr.responseText);j["@id"]=a;injectJSON(JSON.stringify(j))};i.open("GET",schemaServer+"/schemaorg/video.json?ids="+a,true);i.send();return this.determineObjectPattern(g,e,value)},xpathExtract:function(c,b){var d=c[0];var i,h,g;var e=[];var a="";h=d[ns.high+"xPath"][0].value;if(d[ns.high+"filter"]!==undefined){a=d[ns.high+"filter"][0].value}g=d[ns.high+"propertyPath"][0].value;var f=document.evaluate(h,b,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);if(!f){return e}i=Tag.getContentFromElement(f);i=applyContentFilter(i,a);if(i!=null){i=i.replace(/\s\s+/g," ");e=this.determineObjectPattern(g,e,i)}return e},determineObjectPattern:function(f,a,e){if(!f.includes("~")){a[f]=e}else{var b=f.split("~");var d=b.shift();var c=extractObject(a[d],b,e);if(typeof a[d]!=="undefined"){if(a[d] instanceof Array){a[d]=merge(a[d][0],c)}else{a[d]=[a[d],c]}}else{a[d]=[c]}}return a},storedResource:function(a){var b=a[0];var f=false;var h=b[ns.high+"propertyPath"][0].value;var k=b[ns.high+"value"][0].value;var g=btoa(unescape(k)).replace(/=/g,"");var j=schemaAppgetAccountId();var i=schemaCDN+j+"/"+g;if(k.includes("www.")){var c=k.replace("www.","")}else{var c=k.replace("://","://www.")}var e=btoa(unescape(c)).replace(/=/g,"");var l=new XMLHttpRequest();var d=Tag.assignProperty(a,h,{"@id":k})[1];l.onreadystatechange=function(){if(this.readyState===4&&this.status===200){injectJSON(l.responseText)}else{if(this.readyState===4&&this.status!=200){if(!f){l.open("GET",schemaCDN+j+e,true);l.send()}f=true}}};l.open("GET",i,true);l.send();return d}};function removeScripts(b){var c=[];if(b.children){for(var a=0;a<b.children.length;a++){var d=b.children[a];removeScripts(d);if(d.localName.toLowerCase()==="script"){c.push(d)}}}for(var a=0;a<c.length;a++){b.removeChild(c[a])}}function globChecker(g,f){if(f.charAt(0)!=="/"){f="/"+f}g=g.replace(new RegExp(".+://"),"");var b=g.split("/");var c=f.split("/");var d=1;for(d=1;d<b.length;d++){var a=b[d];if(c.length>d){var e=c[d];if(e==="*"){continue}else{if(e==="**"){return true}}if(a!==e){return false}}else{return false}}return(d>=c.length)}if(hasLocalStorage("localStorage")){var storage=window.localStorage;var storedTemplates=storage.getItem(LOCAL_STORAGE_KEY);var time=storage.getItem(LOCAL_STORAGE_DATE_KEY);if(storedTemplates!==null&&timeOk(time)){config=JSON.parse(storedTemplates);templatesLoaded=true;processConfig()}else{schemaAppLoadResources()}window.addEventListener("load",function(a){loadTemplates()})}else{schemaAppLoadResources();window.addEventListener("load",function(a){loadTemplates()})};