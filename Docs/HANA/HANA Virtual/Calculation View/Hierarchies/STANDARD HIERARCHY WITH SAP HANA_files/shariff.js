function shariff_share_counts(){"use strict";for(var a=document.getElementsByClassName("shariff"),b={},c=0;a[c];c++){var d=a[c].dataset.url,e=a[c].dataset.services,f=a[c].dataset.timestamp,g=a[c].dataset.backendurl;"undefined"==typeof g&&(g="/wp-json/shariff/v1/share_counts?");var h=g+"url="+d+"&services="+e+"&timestamp="+f;if("undefined"!=typeof e)if(b[d]){e=b[d][1]+"|"+e;var i=e.split("|");i=i.filter(function(a,b,c){return c.indexOf(a)==b}),e=i.join("|"),h=g+"url="+d+"&services="+e+"&timestamp="+f,b[d]=[d,e,f,h]}else b[d]=[d,e,f,h]}for(var j in b)b.hasOwnProperty(j)&&shariff_get_share_counts(b[j][0],b[j][3],a)}function shariff_get_share_counts(a,b,c){var d=new XMLHttpRequest;d.open("GET",b,!0),d.onload=function(){d.status>=200&&d.status<400&&shariff_add_share_counts(a,JSON.parse(d.responseText),c)},d.send()}function shariff_add_share_counts(a,b,c){for(var d=0;c[d];d++)if(c[d].dataset.url==a){for(var e=c[d].getElementsByClassName("shariff-totalnumber"),f=0;e[f];f++)null!==b&&"undefined"!=typeof b.total&&(e[f].innerHTML=b.total);for(var g=c[d].getElementsByClassName("shariff-total"),h=0;g[h];h++)null!==b&&"undefined"!=typeof b.total&&(g[h].innerHTML=b.total);for(var i=c[d].getElementsByClassName("shariff-count"),j=0;i[j];j++)null!==b&&"undefined"!=typeof b[i[j].dataset.service]&&("undefined"==typeof c[d].dataset.hidezero||"1"==c[d].dataset.hidezero&&b[i[j].dataset.service]>0)&&(i[j].innerHTML=b[i[j].dataset.service],i[j].style.opacity="1")}}document.addEventListener("DOMContentLoaded",shariff_share_counts,!1);