"use strict";!function(){window.rom=window.rom||{cmd:[]},rom.inited||(rom.display=function(t,r){var e=localStorage.getItem("rom.ad_tag_url_template")||"https://cdn-plus.roxot-panel.com/wrapper-builder/__TAG_ID__/tag",n=e.replace("__TAG_ID__",r),o=r+"_iframe",a='\n<!DOCTYPE html>\n<html style="display: table;">\n  <head></head>\n  <body style="margin: 0;">\n    <div id="'.concat(r,'"></div>\n    <script async src="').concat(n,"\"><\/script>\n    <script>\n        var rowr = window.rowr || {cmd: []};\n        rowr.iframeId = '").concat(o,"';\n    <\/script>\n  </body>\n</html>\n  "),i=document.createElement("iframe");i.setAttribute("id",o),i.setAttribute("class","rom-iframe"),i.style.border="0",i.style.margin="0",i.style.padding="0",i.style.display="table";var d=document.getElementById(t);if(!d)return void console.error("Can not found ad block "+t+" for tag "+r);d.innerText="",d.appendChild(i);var c=i.contentDocument||i.contentWindow.document;c.open(),c.write(a),c.close()},rom.cmd.push=function(t){if("function"==typeof t)try{t.call()}catch(t){console.error("Error processing command",t)}else console.error("Commands written into rom.cmd must be wrapped in a function")},rom.cmd.forEach(function(t){return rom.cmd.push(t)}),rom.inited=!0)}();