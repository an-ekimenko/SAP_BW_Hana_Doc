function strEndsWith(b,a){return b.indexOf(a,b.length-a.length)!==-1}var sval;var squery;var sname;var sbind;$jq(document).ready(function(){$jq("#search-form").attr("action",search_selectors[0].url);$jq(".search-field").attr("name",search_selectors[0].fieldname);$jq(".search-field").attr("value",search_selectors[0].value);sval=search_selectors[0].value;squery=search_selectors[0].url;sbind="&";sname=search_selectors[0].fieldname});var seli=0;i=0;$jq.each(search_selectors,function(a,b){seli=a++;$jq("#select-options-pop").append('<li><a href="#" id="'+b.url+'" rel="'+b.fieldname+'" title="'+b.value+'">'+b.name+"</a></li>");a++});if(seli==0){$jq("#search-select").hide()}$jq(document).on("click","#search-select-options li a",function(){$jq("#ext-search-form").attr("action",$jq(this).attr("id"));if($jq(".search-field").attr("value")==""||$jq(".search-field").attr("value")=="Search all of SAP"||$jq(".search-field").attr("value")=="Search the Community"){$jq(".search-field").attr("value",$jq(this).attr("title"))}sval=$jq(this).attr("title");sname=$jq(this).attr("rel");squery=$jq(this).attr("id");if(strEndsWith(squery,"#")){sbind=""}else{sbind="&"}$jq("#search-select-options").fadeOut()});$jq("#search-submit").click(function(){var a=$jq(".search-field").val();window.open(squery+sbind+sname+"="+encodeURIComponent(a),"_blank");return false});$jq(document).on("keypress","#ext-search-form input",function(b){if(b.which==13){var a=$jq(".search-field").val();window.open(squery+sbind+sname+"="+a);return false}});function clearText(a){if(sval==a.value){a.value=""}}function strStartsWith(b,a){return b.indexOf(a)===0};