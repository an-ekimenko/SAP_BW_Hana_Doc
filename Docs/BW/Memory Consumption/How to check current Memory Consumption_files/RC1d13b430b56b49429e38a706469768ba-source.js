// For license information, see `https://assets.adobedtm.com/ccc66c06b30b/563843cfec4a/6513e2c128b9/RC1d13b430b56b49429e38a706469768ba-source.js`.
_satellite.__registerScript('https://assets.adobedtm.com/ccc66c06b30b/563843cfec4a/6513e2c128b9/RC1d13b430b56b49429e38a706469768ba-source.min.js', "<script>\n  if((_satellite.cookie.get('country')||\"\").toLowerCase() != 'us')\n  {\n  document .body.addEventListener( \"click\" , function (event) {\n  if (event && event.target && event.target.id === 'truste-consent-button' ) {\n     sessionStorage.setItem('referrerBeforeTrustArcReload', document.referrer);\n     sessionStorage.setItem('referrerBeforeTrustArcReloadUpdateTime', new Date().getTime());\n  setTimeout(function() { window .location.reload(); }, 1000 );\n  }\n});}\n</script>");