// For license information, see `https://assets.adobedtm.com/ccc66c06b30b/d266848b2882/c90caf4413f6/RC746651f653a24e67939e12d1a632eb8f-source.js`.
_satellite.__registerScript('https://assets.adobedtm.com/ccc66c06b30b/d266848b2882/c90caf4413f6/RC746651f653a24e67939e12d1a632eb8f-source.min.js', "function handleQueryAjaxActions(c){var r=function(t){return t.split(\"&\").reduce(function(t,n){var e=n.split(\"=\");return t[e[0]]=e[1],t},{})};jQuery(document).ajaxSuccess(function(t,n,e){if(e.data)for(var o=r(e.data),a=0;a<c.length;a++){var i=c[a][0],s=c[a][1];if(i(o))return void s()}})}function handleFetchActions(c){var t=fetch;fetch=function(){var s=arguments;return t.apply(this,arguments).then(function(t){if(s&&s[1]&&s[1].body){var i=t.clone();i.json().then(function(t){for(var n=Array.from(s[1].body.entries()).reduce(function(t,n){return t[n[0]]=n[1],t},t),e=0;e<c.length;e++){var o=c[e][0],a=c[e][1];if(o(n))return a(),i}})}return t})}}function hasAction(n){return function(t){return\"undefined\"!=typeof t.action&&t.action===n}}function hasParams(e){return function(t){for(var n in e)if(!t[n]||t[n]!==e[n])return!1;return!0}}function sentActivity(e,o){return function(){var t={objectType:o,actionType:e},n=window.location;t.contentURL=n.host+getRootPagePath(n.pathname),sap_s.trackActivity(t)}}function getRootPagePath(t){var n=t,e=/.*comment-page-\\d+$/,o=!1;n.endsWith(\"/\")&&(n=n.slice(0,-1),o=!0);var a=n.split(\"/\");return e.test(n)&&6===a.length?(a.pop(),a.join(\"/\")+(o?\"/\":\"\")):t}handleQueryAjaxActions([[hasParams({action:\"like_a_post\",actionLike:\"doLike\"}),sentActivity(\"like\",\"blogpost\")],[hasParams({action:\"like_a_comment\",actionLike:\"doLike\"}),sentActivity(\"like\",\"comment\")],[hasParams({action:\"like_a_post\",actionLike:\"doUnLike\"}),sentActivity(\"cancel-like\",\"blogpost\")],[hasParams({action:\"like_a_comment\",actionLike:\"doUnLike\"}),sentActivity(\"cancel-like\",\"comment\")],[hasAction(\"sap-update-comment\"),sentActivity(\"update\",\"comment\")],[hasAction(\"sap-delete-comment\"),sentActivity(\"delete\",\"comment\")],[hasParams({action:\"delete-comment\",trash:\"1\"}),sentActivity(\"delete\",\"comment\")],[hasParams({action:\"delete-comment\",untrash:\"1\"}),sentActivity(\"publish\",\"comment\")],[hasAction(\"wprc_add_report\"),sentActivity(\"publish\",\"alert\")],[hasAction(\"report_agree_post\"),sentActivity(\"confirm\",\"alert\")],[hasAction(\"report_disagree_post\"),sentActivity(\"reject\",\"alert\")]]),handleFetchActions([[hasParams({last_status:\"follow\",action:\"ss_change_follow_status\",content_type:\"blogpost\"}),sentActivity(\"follow\",\"blogpost\")],[hasParams({last_status:\"follow\",action:\"ss_change_follow_status\",content_type:\"sap_tag\"}),sentActivity(\"follow\",\"tag\")],[hasParams({last_status:\"not-follow\",action:\"ss_change_follow_status\",content_type:\"blogpost\"}),sentActivity(\"stop-following\",\"blogpost\")],[hasParams({last_status:\"not-follow\",action:\"ss_change_follow_status\",content_type:\"sap_tag\"}),sentActivity(\"stop-following\",\"tag\")]]);");