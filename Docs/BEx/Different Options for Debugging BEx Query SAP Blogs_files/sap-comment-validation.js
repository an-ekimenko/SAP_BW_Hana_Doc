"use strict";jQuery(function(m){function f(e,a){this.allowedNumberOfLinks=e,this.validateMaxLinks=a}f.prototype.validate=function(e,a,t){var n=function(e){for(var a="",t=e.split(/(<[^<>]+>)/g),n=0,i=0;i<t.length;i++){var s=t[i];if(s.match(/^<code[\s>]|^<pre[\s>]|^<style[\s>]|^<script[\s>]/g)?n++:0!==n&&s.match(/^<\/code[\s>]|^<\/pre[\s>]|^<\/style[\s>]|^<\/script[\s>]/g)&&n--,0!==n||0===s.length||"<"===s.charAt(0)&&s.match(/^<\s*[\w]{1,20}:\/\//g))a+=s;else{var o=" "+s+" ";a+=o=(o=(o=(o=o.replace(/([\s(<.,;:!?])([\w]{1,20}:\/\/(?=\S{1,2000}\s)[\w\x80-\x9f\xa1-\xff#%~/@\[\]*(+=&$-]*(?:['.,;:!?)][\w\x80-\x9f\xa1-\xff#%~/@\[\]*(+=&$-]+)*)(\)?)/g,' <a href="$2">$2</a>')).replace(/([\s>])((www|ftp)\.[\w\x80-\xff#$%&~/.\-;:=,?@\[\]+]+)/gi,' <a href="http://$2">$2</a>')).replace(/([\s>])([.0-9a-z_+-]+)@(([0-9a-z-]+\.)+[0-9a-z]{2,})/gi,' <a href="mailto:$2@$3">$2@$3</a>')).substr(1,o.length-2)}}return a=a.replace(/(<a([ \r\n\t]+[^>]+?>|>))<a [^>]+?>([^>]+?)<\/a><\/a>/g,"$1$3</a>")}(e).match(/<a [^>]*href/g),i=!0;if(n){var s=n.length,o=function(e){return"undefined"!=typeof sharedValidation?sharedValidation.Utils.getFirstInvalidLink(e):""}(e);if(""!==o)a(utilsArgs.linksValidationErrMsg.replace("%s",o)),i=!1;else this.validateMaxLinks&&this.allowedNumberOfLinks<s&&(a("No more than "+this.allowedNumberOfLinks+" links are allowed in comments. Please reduce the number of links."),i=!1)}i&&t()},m(document).ready(function(){var e=window.commentValidation.BLOGS_PAGE,d=window.commentValidation.max_links_number,c=window.commentValidation.validateMaxLinks;if("single"===e)m(document).on("tinymce-editor-setup",function(e,a){var t=m(a.formElement).find(".validation-message .validation-message__text"),n=m("#submit"),i=m(a.formElement).closest(".comment-respond").find("button.save"),s=new f(d,c),o=function(e){t.text(e),t.parent().removeClass("validation-message_hidden"),n.prop("disabled",!0),i.prop("disabled",!0)},l=function(){t.text(""),t.parent().addClass("validation-message_hidden"),n.prop("disabled",!1),i.prop("disabled",!1)},r=function(e){i=m(a.formElement).closest(".comment-respond").find("button.save"),s.validate(e,o,l)};l(),a.on("Change",function(e){r(e.level.content)}),a.on("keyup",function(){r(a.getContent())})});else if("comment.php"===e){var a=function(e){this.callbacks=[],this.textarea=e,this._observe()};a.prototype._observe=function(){var t=this,n=t.textarea.value;setInterval(function(){var e=t.textarea.value;if(0!==n.localeCompare(e))for(var a=0;a<t.callbacks.length;a++)t.callbacks[a](e);n=e},500)},a.prototype.subscribe=function(e){this.callbacks.push(e)};var t=m("#"+wpActiveEditor).closest(".wp-editor-wrap"),n=m('<div class="comment-form__validaton-message validation-message validation-message_hidden"><span class="validation-message__text"></span></div>');t.prepend(n),n=n.find(".validation-message__text");var i=new f(d),s=new a(document.getElementById(wpActiveEditor)),o=m("#save");s.subscribe(function(e){i.validate(e,function(e){n.text(e),n.parent().removeClass("validation-message_hidden"),o.prop("disabled",!0)},function(){n.text(""),n.parent().addClass("validation-message_hidden"),o.prop("disabled",!1)})})}})});