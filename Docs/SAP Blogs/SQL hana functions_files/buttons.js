(function(h,n){var l;var e=window;if("undefined"!==typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))l=void 0;else{var v=e.document,o=v.createElementNS("http://www.w3.org/1999/xhtml","a"),D="download"in o,r=e.webkitRequestFileSystem,w=e.requestFileSystem||r||e.mozRequestFileSystem,E=function(a){(e.setImmediate||e.setTimeout)(function(){throw a;},0)},s=0,t=function(a){var b=function(){"string"===typeof a?(e.URL||e.webkitURL||e).revokeObjectURL(a):a.remove()};e.chrome?b():setTimeout(b,500)},
u=function(a,b,d){for(var b=[].concat(b),c=b.length;c--;){var i=a["on"+b[c]];if("function"===typeof i)try{i.call(a,d||a)}catch(f){E(f)}}},x=function(a){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["﻿",a],{type:a.type}):a},A=function(a,b){var a=x(a),d=this,c=a.type,i=!1,f,g,h=function(){u(d,["writestart","progress","write","writeend"])},k=function(){if(i||!f)f=(e.URL||e.webkitURL||e).createObjectURL(a);g?g.location.href=f:void 0===e.open(f,
"_blank")&&"undefined"!==typeof safari&&(e.location.href=f);d.readyState=d.DONE;h();t(f)},j=function(a){return function(){if(d.readyState!==d.DONE)return a.apply(this,arguments)}},y={create:!0,exclusive:!1},z;d.readyState=d.INIT;b||(b="download");if(D)f=(e.URL||e.webkitURL||e).createObjectURL(a),o.href=f,o.download=b,c=v.createEvent("MouseEvents"),c.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),o.dispatchEvent(c),d.readyState=d.DONE,h(),t(f);else{e.chrome&&(c&&"application/octet-stream"!==
c)&&(z=a.slice||a.webkitSlice,a=z.call(a,0,a.size,"application/octet-stream"),i=!0);r&&"download"!==b&&(b+=".download");if("application/octet-stream"===c||r)g=e;w?(s+=a.size,w(e.TEMPORARY,s,j(function(c){c.root.getDirectory("saved",y,j(function(c){var f=function(){c.getFile(b,y,j(function(b){b.createWriter(j(function(c){c.onwriteend=function(a){g.location.href=b.toURL();d.readyState=d.DONE;u(d,"writeend",a);t(b)};c.onerror=function(){var a=c.error;a.code!==a.ABORT_ERR&&k()};["writestart","progress",
"write","abort"].forEach(function(a){c["on"+a]=d["on"+a]});c.write(a);d.abort=function(){c.abort();d.readyState=d.DONE};d.readyState=d.WRITING}),k)}),k)};c.getFile(b,{create:false},j(function(a){a.remove();f()}),j(function(a){a.code===a.NOT_FOUND_ERR?f():k()}))}),k)}),k)):k()}},g=A.prototype;"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob?l=function(a,b){return navigator.msSaveOrOpenBlob(x(a),b)}:(g.abort=function(){this.readyState=this.DONE;u(this,"abort")},g.readyState=g.INIT=0,g.WRITING=
1,g.DONE=2,g.error=g.onwritestart=g.onprogress=g.onwrite=g.onabort=g.onerror=g.onwriteend=null,l=function(a,b){return new A(a,b)})}var p=function(a,b){var d=a.title;-1!==d.indexOf("*")&&(d=d.replace("*",h("title").text()));d=d.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,"");return void 0===b||!0===b?d+a.extension:d},q=function(a){return a.newline?a.newline:navigator.userAgent.match(/Windows/)?"\r\n":"\n"},B=function(a,b){for(var d=q(b),c=a.buttons.exportData(b.exportOptions),i=function(a){for(var c=
"",d=b.fieldBoundary,f=b.fieldSeparator,e=0,i=a.length;e<i;e++)0<e&&(c+=f),c+=d?d+a[e].replace(d,"\\"+d)+d:a[e];return c},f=b.header?i(c.header)+d:"",e=b.footer?d+i(c.footer):"",g=[],h=0,j=c.body.length;h<j;h++)g.push(i(c.body[h]));return{str:f+g.join(d)+e,rows:g.length}},C=function(){return-1!==navigator.userAgent.indexOf("Safari")&&-1===navigator.userAgent.indexOf("Chrome")&&-1===navigator.userAgent.indexOf("Opera")},m={"_rels/.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\t<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
"xl/_rels/workbook.xml.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\t<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',"[Content_Types].xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\t<Default Extension="xml" ContentType="application/xml"/>\t<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\t<Default Extension="jpeg" ContentType="image/jpeg"/>\t<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>\t<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
"xl/workbook.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\t<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>\t<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>\t<bookViews>\t\t<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>\t</bookViews>\t<sheets>\t\t<sheet name="Sheet1" sheetId="1" r:id="rId1"/>\t</sheets></workbook>',
"xl/worksheets/sheet1.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">\t<sheetData>\t\t__DATA__\t</sheetData></worksheet>'};n.ext.buttons.copyHtml5={className:"buttons-copy buttons-html5",
text:function(a){return a.i18n("buttons.copy","Copy")},action:function(a,b,d,c){q(c);a=B(b,c).str;a=h("<span>"+b.i18n("buttons.copyKeys","Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.")+"</span>").append(h("<div/>").css({height:1,width:1,overflow:"hidden"}).append(h("<textarea readonly/>").val(a)));b.buttons.info(b.i18n("buttons.copyTitle","Copy to clipboard"),a,0);a.find("textarea")[0].focus();a.find("textarea")[0].select();
var e=h(a).closest(".dt-button-info"),f=function(){e.off("click.buttons-copy");h(document).off(".buttons-copy");b.buttons.info(!1)};e.on("click.buttons-copy",f);h(document).on("keydown.buttons-copy",function(a){27===a.keyCode&&f()}).on("copy.buttons-copy cut.buttons-copy",function(){f()})},exportOptions:{},fieldSeparator:"\t",fieldBoundary:"",header:!0,footer:!1};n.ext.buttons.csvHtml5={className:"buttons-csv buttons-html5",available:function(){return void 0!==window.FileReader&&window.Blob},text:function(a){return a.i18n("buttons.csv",
"CSV")},action:function(a,b,d,c){q(c);a=B(b,c).str;l(new Blob([a],{type:"text/csv"}),p(c))},title:"*",extension:".csv",exportOptions:{},fieldSeparator:",",fieldBoundary:'"',header:!0,footer:!1};n.ext.buttons.excelHtml5={className:"buttons-excel buttons-html5",available:function(){return void 0!==window.FileReader&&void 0!==window.JSZip&&!C()},text:function(a){return a.i18n("buttons.excel","Excel")},action:function(a,b,d,c){a="";b=b.buttons.exportData(c.exportOptions);d=function(a){for(var b=[],c=
0,d=a.length;c<d;c++)b.push(h.isNumeric(a[c])?'<c t="n"><v>'+a[c]+"</v></c>":'<c t="inlineStr"><is><t>'+a[c].replace(/&(?!amp;)/g,"&amp;")+"</t></is></c>");return"<row>"+b.join("")+"</row>"};c.header&&(a+=d(b.header));for(var e=0,f=b.body.length;e<f;e++)a+=d(b.body[e]);c.footer&&(a+=d(b.footer));var b=new window.JSZip,d=b.folder("_rels"),e=b.folder("xl"),f=b.folder("xl/_rels"),g=b.folder("xl/worksheets");b.file("[Content_Types].xml",m["[Content_Types].xml"]);d.file(".rels",m["_rels/.rels"]);e.file("workbook.xml",
m["xl/workbook.xml"]);f.file("workbook.xml.rels",m["xl/_rels/workbook.xml.rels"]);g.file("sheet1.xml",m["xl/worksheets/sheet1.xml"].replace("__DATA__",a));l(b.generate({type:"blob"}),p(c))},title:"*",extension:".xlsx",exportOptions:{},header:!0,footer:!1};n.ext.buttons.pdfHtml5={className:"buttons-pdf buttons-html5",available:function(){return void 0!==window.FileReader&&window.pdfMake},text:function(a){return a.i18n("buttons.pdf","PDF")},action:function(a,b,d,c){q(c);a=b.buttons.exportData(c.exportOptions);
b=[];c.header&&b.push(h.map(a.header,function(a){return{text:a,style:"tableHeader"}}));for(var e=0,d=a.body.length;e<d;e++)b.push(h.map(a.body[e],function(a){return{text:a,style:e%2?"tableBodyEven":"tableBodyOdd"}}));c.footer&&b.push(h.map(a.footer,function(a){return{text:a,style:"tableFooter"}}));a={pageSize:c.pageSize,pageOrientation:c.orientation,content:[{table:{headerRows:1,body:b},layout:"noBorders"}],styles:{tableHeader:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154",alignment:"center"},
tableBodyEven:{},tableBodyOdd:{fillColor:"#f3f3f3"},tableFooter:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154"},title:{alignment:"center",fontSize:15},message:{}},defaultStyle:{fontSize:10}};c.message&&a.content.unshift({text:c.message,style:"message",margin:[0,0,0,12]});c.title&&a.content.unshift({text:p(c,!1),style:"title",margin:[0,0,0,12]});c.customize&&c.customize(a);a=window.pdfMake.createPdf(a);"open"===c.download&&!C()?a.open():a.getBuffer(function(a){a=new Blob([a],{type:"application/pdf"});
l(a,p(c))})},title:"*",extension:".pdf",exportOptions:{},orientation:"portrait",pageSize:"A4",header:!0,footer:!1,message:null,customize:null,download:"download"}})(jQuery,jQuery.fn.dataTable);