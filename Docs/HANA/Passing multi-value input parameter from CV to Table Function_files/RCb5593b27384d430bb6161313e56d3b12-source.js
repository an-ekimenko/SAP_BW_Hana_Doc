// For license information, see `https://assets.adobedtm.com/ccc66c06b30b/d266848b2882/7746cc4f8d3f/RCb5593b27384d430bb6161313e56d3b12-source.js`.
_satellite.__registerScript('https://assets.adobedtm.com/ccc66c06b30b/d266848b2882/7746cc4f8d3f/RCb5593b27384d430bb6161313e56d3b12-source.min.js', "function fillStorageForTrackingActivity(){setUpDeleteBlogpost(),setUpPublishBlogpost(),setUpPublishComment()}function setUpPublishComment(){var t=jQuery(\"form#commentform\");t.submit(function(){t.find(\"#new_comment_nonce\").length&&saveToSessionStorage(\"comment\",\"publish\")})}function setUpDeleteBlogpost(){jQuery(\".submitdelete\").click(function(){saveToSessionStorage(\"blogpost\",\"delete\")})}function setUpPublishBlogpost(){var o=jQuery(\"form#post\"),i=\"\";o.find('input[value=\"Publish\"][type=\"Submit\"]').click(function(){i=\"publish\"}),o.find('input[value=\"Needs More Work\"][type=\"Submit\"]').click(function(){i=\"needs_more_work\"}),o.find('input[value=\"Submit for Review\"][type=\"Submit\"]').click(function(){i=\"submit_for_review\"}),o.find('input[value=\"Update\"][type=\"Submit\"]').click(function(){i=\"update\"}),o.find('input[value=\"Save\"][type=\"Submit\"]').click(function(){i=\"update\"});var n=!1;o.find(\"#primary-tag\").change(function(){n=!0});var s=\"Not Saved\"===o.find(\"#custom-post-status-display\").text();o.submit(function(){var t=o.find(\"#original_post_status\").attr(\"value\"),e=n&&(\"needs-more-work\"===t||\"pending\"===t||\"update\"===i&&!s);i&&saveToSessionStorage(\"blogpost\",i),e&&saveToSessionStorage(\"blogpost\",\"update-tag-assignment\")})}function saveToSessionStorage(t,e){var o=[],i=sessionStorage.getItem(STORAGE_KEY);i&&(o=JSON.parse(i)),o.push(createActivity(t,e)),sessionStorage.setItem(STORAGE_KEY,JSON.stringify(o))}function createActivity(t,e){var o={objectType:t,actionType:e},i=window.location;return o.contentURL=i.host+getRootPagePath(i.pathname),o}function sendActionsFromSessionStorage(){var t=sessionStorage.getItem(STORAGE_KEY);if(t){var e=JSON.parse(t);sessionStorage.removeItem(STORAGE_KEY);var o=window.location.host+getRootPagePath(window.location.pathname);e.forEach(function(t){t.contentURL=o,sap_s.trackActivity(t)})}}function getRootPagePath(t){var e=t,o=/.*comment-page-\\d+$/,i=!1;e.endsWith(\"/\")&&(e=e.slice(0,-1),i=!0);var n=e.split(\"/\");return o.test(e)&&6===n.length?(n.pop(),n.join(\"/\")+(i?\"/\":\"\")):t}var STORAGE_KEY=\"DTM_RELOAD_ACTION\";fillStorageForTrackingActivity(),sendActionsFromSessionStorage();");