'use strict';
/* User Service  */
angular.module('cpProductPageService', [])
	.service('versionUtilities', function () {
		var that = this;

		this.getVersionSelectorState = function (versions, showVersionWhenOneVersion) {
			if (versions && versions.length > 1) {
				return 'multiple';
			} else if (versions && versions.length === 1 && showVersionWhenOneVersion) {
				return 'single';
			} else {
				return 'none';
			}
		};
		this.sortVersions = function (versions) {
			var sortedVersions = [];
			var versionObjs = [];
			var longestArrayLength = 0;
			for (var i = 0; i < versions.length; i++) {
				var version = versions[i];
				if (/^(\d+\.)*\d+$/.test(version)) {
					var tokenizedVersion = version.split('.');
					for (var j = 0; j < tokenizedVersion.length; j++) {
						tokenizedVersion[j] = parseInt(tokenizedVersion[j]);
					}
					var obj = {
						"version": version,
						"tokens": tokenizedVersion
					}
					if (tokenizedVersion.length > longestArrayLength) {
						longestArrayLength = tokenizedVersion.length;
					}
					versionObjs.push(obj);
				} else {
					console.log("Version cannot be smart-sorted if it contains characters other than 0-9 or decimal. No two decimals in a row and no leading/trailing decimals: " + version);
					var sortedVersions = versions.sort().reverse();
					//use .slice(0) to get a deep copy of the array (shallow copy has some bad side effects)
					return sortedVersions.slice(0);
				}
			}

			for (i = 0; i < versionObjs.length; i++) {
				while (versionObjs[i].tokens.length < longestArrayLength) {
					versionObjs[i].tokens.push(0);
				}
			}

			versionObjs.sort(function (first, second) {
				var a = first.tokens;
				var b = second.tokens;

				for (var i = 0; i < a.length; i++) {
					if (a[i] === b[i] && i === a.length - 1) {
						return 0;
					} else if (a[i] === b[i]) {
						continue;
					} else if (a[i] > b[i]) {
						return -1;
					} else {
						return 1;
					}
				}
			});

			sortedVersions = versionObjs.map(function (obj) {
				return obj.version;
			});

			return sortedVersions.slice(0);

		};
		this.getProductPageFromDesiredVersionLanguageState = function (productPages, desiredVersion, desiredLang, desiredState) {

			var versionList = productPages.map(function (productPage) {
				return productPage.version;
			});

			versionList = that.sortVersions(versionList);

			if (versionList.indexOf(desiredVersion) === -1) {
				desiredVersion = versionList[versionList.length];
			}

			var productPagesWithVersion = productPages.filter(function (productPage) {
				return productPage.version === desiredVersion;
			});

			var langList = productPagesWithVersion.map(function (productPage) {
				return productPage.language;
			});


			if (langList.indexOf(desiredLang) === -1) {
				if (langList.indexOf("en-US") > -1) {
					desiredLang = "en-US";
				} else if (langList.indexOf("de-DE") > -1) {
					desiredLang = "de-DE";
				} else {
					desiredLang = langList[0];
				}
			}

			var productPagesWithVersionAndLanguage = productPagesWithVersion.filter(function (productPage) {
				return productPage.language === desiredLang;
			});

			var stateList = productPagesWithVersionAndLanguage.map(function (productPage) {
				return productPage.state;
			});


			if (stateList.indexOf(desiredState) === -1) {
				if (stateList.indexOf("PRODUCTION") > -1) {
					desiredState = "PRODUCTION";
				} else if (stateList.indexOf("TEST") > -1) {
					desiredState = "TEST";
				} else {
					desiredState = "DRAFT";
				}
			};
			return {
				version: desiredVersion,
				language: desiredLang,
				state: desiredState
			}
		};
	})
	//.factory('productPageReleases', ['$resource',
	//                                          function($resource) {
	//													return $resource('/http.svc/productpagerelease', {}, {
	//               											query: {method:'GET', params:{product: '@product', language: '@locale', state: '@state', nocache: new Date().getTime()}, cache:false},
	//               											
	//               										});
	//                                                   }
	//                                               ])
	//.factory('productPageResult', ['$resource',
	//                                         function($resource) {
	//     										return $resource('/http.svc/deliverables', {}, {
	//     											query: {method:'GET', params:{product: '@product', locale: '@locale', version: '@version', state: '@state', $top: '5000', $productPage: '0', nocache: new Date().getTime()}, isArray:false, cache:false},
	//     											
	//     										});
	//                                         }
	//                                     ])
	.factory('productPageVersions', ['$resource',
		function ($resource) {
			return function(useCached) {
				var nocache;
				if (useCached !== undefined && useCached === false) {
					nocache = new Date().getTime();
				}
				return $resource('/http.svc/filter', {}, {
					query: { method: 'GET', params: { element: 'pv', product: '@product', language: '@locale', state: '@state', $top: '5000', nocache: nocache }, isArray: false},
				});
			}
		}
	])
	.factory('productPageCustomInfo', ['$resource',
		function ($resource) {
			return function(useCached) {
				var nocache;
				if (useCached !== undefined && useCached === false) {
					nocache = new Date().getTime();
				}
				return $resource('/http.svc/productpage', {}, {
					query: { method: 'GET', params: { nocache: nocache }, isArray: false}
	
				});
			}

		}
	]);