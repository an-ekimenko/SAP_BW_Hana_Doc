'use strict';
/*
 *
 */
var cpProductController = angular.module('cpProductPageController', []);
cpProductController.controller('ProductPageCtrl', ['$scope', '$window', '$state', 'stateService', 'deliverableState', '$stateParams', '$translate', '$sce', '$q', '$timeout', 'productPageCustomInfo', 'versionUtilities', 'productPageVersions', '$cookies',
    '$log', 'PATHS', 'searchServiceApi', 'Notification', '$uibModal', '$location', 'resultsHandler',
    function ($scope, $window, $state, stateService, deliverableState, $stateParams, $translate, $sce, $q, $timeout, productPageCustomInfo,
        versionUtilities, productPageVersions, $cookies, $log,
        PATHS, searchServiceApi, Notification, $uibModal, $location, resultsHandler) {
		//try{ sap_s.trackData(); } catch(e) {console.log(e);}
        $scope.$parent.showSearchIcon = false;
        $scope.$parent.viewerOn.value = false; //Determine whether the viewer is open
        // varaiables for binding search results
        $scope.initialized = false;
        $scope.hasAlias;
        $scope.onlyProductInUrl = false;
        $scope.showSearchAndButtons = false;
        $scope.contentWeight = false;
        $scope.showFilterButton = true;
        $scope.filterOn = {};
        $scope.filterOn.value = false;
        
        var adobeTracker = new AdobeTrackingService();
        
        $scope.currentSearchScope = "This product";       

        if ($scope.showByFeatureFlag("ppsearch")) {
        	$scope.scopedSearchPlaceholder = 'Search through all documents relating to this product';
        } else {
        	$scope.scopedSearchPlaceholder = 'Search through all documents on this page';
        }
        
        
        
        
        
        $scope.isDisclaimerValid = function(deliverable) {
        	        	
        	if($scope.showByFeatureFlag("disclaimer")){
        		
     
        		window.open(deliverable);
        		
        	}else {
        		
        		
        	if(deliverable.indexOf("disclaimer-for-links?q=")>-1){
        		
        		$scope.openDisclaimer(deliverable);
        		
        	}else{    		
        		window.open(deliverable);
        		      		
        	 }
        	
           }
        	
        }
        
        $scope.switchSearchScope = function(val) {
        	if (val == 'product') {
        		$scope.currentSearchScope = "This product";       
                $scope.scopedSearchPlaceholder = 'Search through all documents relating to this product';
        	} else {
        		$scope.currentSearchScope = "All SAP products";       
                $scope.scopedSearchPlaceholder = 'Search across all products on the SAP Help Portal';
        	}  	
        }
        
        $scope.isLoggedOn = function() {
			var sapuacpuserid = $cookies.get('sapuacpuserid');
			return sapuacpuserid;
		};

        $scope.pdfLink = function(deliverable) {
        	
        	if (!$scope.downloadAsPdf) {
        		return false;
        	}

            var allDeliverables, filteredPdfs;

            function matchesBmapTitleLocaleState(otherDeliverable) {
                if (deliverable.buildableMapLOIO !== otherDeliverable.buildableMapLOIO) {
                    return false;
                }
                if (deliverable.title !== otherDeliverable.title 
                		&& deliverable.oldTitle !== otherDeliverable.title
                		&& deliverable.oldTitle !== otherDeliverable.oldTitle) {
                    return false;
                }
                if (deliverable.locale !== otherDeliverable.locale) {
                    return false;
                }
                if (otherDeliverable.transtype !== "pdf.sap" && otherDeliverable.transtype !== "pdf.2017") {
                    return false;
                }
                return true;
            }
            
            if (deliverable.buildableMapLOIO === undefined || 
                deliverable.locale === undefined ||
                deliverable.title === undefined ||
                deliverable.transtype === undefined ||
                deliverable.transtype === "pdf.sap" ||
                deliverable.transtype === "pdf.2017") {
                return false;
            }
            
            allDeliverables = $scope.productDeliverables;
            filteredPdfs = [];
            for (var i = 0; i < allDeliverables.length; i++) {
                if (matchesBmapTitleLocaleState(allDeliverables[i])) {
                    filteredPdfs.push(allDeliverables[i]);
                }
            }

            if (filteredPdfs.length === 1) {
                deliverable.pdfDeliverable = filteredPdfs[0];
                return true;
            } else {
                return false;
            }
        }

        $scope.showContentWeight = function () {
            $scope.contentWeight = true;
        }
        
        $scope.changeVersionCustom = function (version) {
            var productPages = $scope.otherProductPages;
            var desiredVersion = version;
            var desiredLang = $scope.locale;
            var desiredState = $scope.getCurrentState();
            var newProductPage = versionUtilities.getProductPageFromDesiredVersionLanguageState(productPages, desiredVersion, desiredLang, desiredState);
            window.location.replace(PATHS.BASE_URL + '/product' + $scope.url(newProductPage.state) + '/' + $scope.params.productId + '/' + newProductPage.version + '/' + newProductPage.language);
        },
            // defines if the search results are visible
            $scope.initialize = function () {
                if ($scope.initialized === false) {
                    $scope.initialized = true;
                    if ($stateParams.languageCode) {
                        $scope.populateData($stateParams.languageCode);
                    } else if ($stateParams.product) {
                        $scope.onlyProductInUrl = true;
                        $scope.populateData();
                    } else if ('alias' in $stateParams) {
                        $scope.populateData();
                    } else {
                        var rawLocale = $scope.translate.proposedLanguage();
                        if (rawLocale == null) {
                            $log.log("Problem with translate service, defaulting to English");
                            $scope.locale = "en-US";
                            $scope.populateData("en-US");
                        } else {
                            var mapping = [
                                ["en-US", "en-US"],
                                ["en_US", "en-US"],
                                ["de", "de-DE"],
                                ["fr", "fr-FR"],
                                ["es", "es-ES"],
                                ["zh-CN", "zh-CN"],
                                ["zh_CN", "zh-CN"],
                                ["ja", "ja-JP"],
                                ["in", "in_id"],
                                ["ar", "ar"],
                                ["bg", "bg"],
                                ["ca", "ca"],
                                ["cs", "cs"],
                                ["cy", "cy"],
                                ["da", "da"],
                                ["el", "el"],
                                ["et", "et"],
                                ["fi", "fi"],
                                ["he", "he"],
                                ["hi", "hi"],
                                ["hu", "hu"],
                                ["it", "it"],
                                ["kk", "kk"],
                                ["ko", "ko"],
                                ["lt", "lt"],
                                ["lv", "lv"],
                                ["ms", "ms"],
                                ["nl", "nl"],
                                ["no", "no"],
                                ["pl", "pl"],
                                ["pt", "pt"],
                                ["ro", "ro"],
                                ["ru", "ru"],
                                ["sh", "sh"],
                                ["sk", "sk"],
                                ["sl", "sl"],
                                ["sv", "sv"],
                                ["th", "th"],
                                ["tr", "tr"],
                                ["vi", "vi"]
                            ];
                            for (var i = 0; i < mapping.length; i++) {
                                var locale;
                                if (mapping[i][0] === rawLocale) {
                                    locale = mapping[i][1];
                                    $scope.locale = locale;
                                    $scope.populateData(locale);
                                    break;
                                }
                                if (locale === undefined) {
                                    $scope.locale = "en-US";
                                    $log.log("Could not find mapping for locale: " + rawLocale + ". Perhaps there is a problem with the translate service?");
                                }
                            }
                        }
                    }
                }

            }
        // shows nothing found section
        $scope.nothingFoundVisible = false;
        // contains the found topics and the max number
        $scope.searchResults = $scope.searchResults || {};
        $scope.locale = $stateParams.languageCode;
        $scope.reloadRoute = function () {
            $state.reload();
        }
        $scope.translate = $translate;
        $scope.errorCode = -1;
        $scope.errorLine1 = '';
        $scope.errorLine2 = '';
        $scope.errorLine3 = '';
        var _state = deliverableState;
        $scope.getCurrentState = function () {
            if ($scope.product.state !== undefined) {
                return $scope.product.state;
            }
            var currentState = state;
            return currentState;
        };
        $scope.isEnglishFallback = function (deliverable) {
            if (deliverable.isExternal) {
                return false;
            }
            if (!('locale' in deliverable) || deliverable.locale === undefined) {
                $log.log("Deliverable doesn't have a locale!")
                return false;
            }
            if ($scope.locale === undefined) {
                $log.log("Product page does not have a locale!");
                return false;
            }
            return deliverable.locale === "en-US" && $scope.locale !== "en-US";
        }
        $scope.openInfoDialog = function () {
            $scope.dialog = $uibModal.open({
                templateUrl: '_build_938311c7a845691adeabc837/partials/productpage-info-modal.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'app-modal-window',
                scope: $scope
            })
        };
        $scope.populateData = function (locale) {
            var useCached = $scope.logged_on === null;

            $scope.params = {};
            var queryParams = {};
            var versionParams = {};
            var promises;
            var hasAlias;
            
            if ('alias' in $stateParams) {
                $scope.hasAlias = true;
                $scope.params.alias = $stateParams.alias;
                queryParams = {
                    alias: $scope.params.alias,
                    state: deliverableState
                };
                promises = {
                    productPage: productPageCustomInfo(useCached).query(queryParams).$promise
                };
            }
            else if ($scope.onlyProductInUrl) {
                $scope.hasAlias = false;
                $scope.params.productId = $stateParams.product;
                queryParams = {
                    product: $scope.params.productId,
                    locale: "en-US",
                    onlyProduct: true
                };
                promises = {
                    productPage: productPageCustomInfo(useCached).query(queryParams).$promise
                };
            } else {
                $scope.hasAlias = false;
                $scope.params.productId = decodeURIComponent(decodeURIComponent($stateParams.product));
                $scope.params.versionId = decodeURIComponent(decodeURIComponent($stateParams.version));
                queryParams = {
                    product: $scope.params.productId,
                    state: deliverableState,
                    locale: locale,
                    version: $scope.params.versionId
                };
                versionParams = {
                    product: $scope.params.productId,
                    state: deliverableState,
                    language: locale //sometimes we use locale, sometimes we use language. This is inconsistent. 
                };
                promises = {
                    productPage: productPageCustomInfo(useCached).query(queryParams).$promise,
                    versions: productPageVersions(useCached).query(versionParams).$promise,
                };
            }

            var updateHero = function (errorCode, result) {
                if (errorCode !== 1) {
                    $scope.product.productName = $scope.$eval("'PP_SORRY' | translate");
                } else {
                    $scope.showSearchAndButtons = true;
                    showProductName(result);
                }
            }

            var showProductName = function (result) {
                var productPage = result.productPage.data;

                if ($scope.onlyProductInUrl) {
                    deliverableState = productPage.state;
                }
                if ($scope.hasAlias || $scope.onlyProductInUrl) {
                    $scope.params.productId = productPage.productId;
                    $scope.params.versionId = productPage.versionId;
                    $scope.locale = productPage.locale;
                    versionParams = {
                        product: $scope.params.productId,
                        state: deliverableState,
                        language: $scope.locale //sometimes we use locale, sometimes we use language. This is inconsistent. 
                    };
                    $stateParams.languageCode = locale;
                    productPageVersions(useCached).query(versionParams).$promise.then(function (result2) {
                        populateVersionAndProductName(result2.data.pv);
                    });
                } else {
                    populateVersionAndProductName(result.versions.data.pv);
                }  
                
                var pageName = productPage.product_name;
                if(!pageName) {
                	pageName = "Other Products";
                }
                var language = productPage.locale;                	
                var loginStatus = $scope.isLoggedOn();
                
                var channel = productPage.productId;
                
                adobeTracker.setPageData(pageName, language, loginStatus, channel) 
                
                var query = $location.search().q;
                                
                if(!query) {
                	adobeTracker.trackData();
                }
            }
            
            $scope.isDisambiguationPage = false;
            $scope.disambiguationType = 'version';
            $scope.pageLoading = false;
            $q.all(promises).then(function (result) {
                var containsError = function (productPage) {
                    return 'errorCode' in productPage;
                }
                
                var containsRedirect = function (productPage) {
                    return 'redirect' in productPage;
                }

                var displayError = function (productPage) {
                    $scope.errorCode = productPage.errorCode;
                    if ('errorLine1' in productPage) {
                        $scope.errorLine1 = productPage.errorLine1;
                    }
                    if ('errorLine2' in productPage) {
                        $scope.errorLine2 = productPage.errorLine2;
                    }
                    if ('errorLine3' in productPage) {
                        $scope.errorLine3 = productPage.errorLine3;
                    }
                }
                
                var isDisambiguationPage = function (productPage) {
                    return 'disambiguationPage' in productPage;
                }

                var productPage = result.productPage.data;
                
                if (containsRedirect(productPage)) {
                    var path = productPage.redirect;
                    $window.location.href = $window.location.protocol + '//' + $window.location.host + path;
                }
                
                $scope.product.localizedAllContentString = productPage.localizedStrings.allContent;
                $scope.product.localizedSearchResultsString = productPage.localizedStrings.searchResults;
                if ("groupNames" in productPage.localizedStrings) {
                    $scope.product.groupNames = productPage.localizedStrings.groupNames;
                } else {
                    $log.error("Missing localized group names");
                }
                
                if (containsError(productPage)) {
                    if (isDisambiguationPage(productPage)) {
                        //set scope.product.custom to true so when changing versions we go to a custom page
                        $scope.product.custom = true;
                        $scope.pageLoading = true;
                        $scope.isDisambiguationPage = true;
                        if ('disambiguationType' in productPage) {
                            $scope.disambiguationType = productPage.disambiguationType;
                        }
                        $scope.otherProductPages = productPage.otherProductPages;
                        $scope.product.validVersions = $scope.otherProductPages.map(function (obj) {
                            return obj.version;
                        });
                        $scope.product.validLanguages = $scope.otherProductPages
                            .filter(function (obj) {
                                return obj.version === productPage.versionId;
                            })
                            .map(function (obj) {
                                return obj.language;
                            });
                        $scope.product.validStates = $scope.otherProductPages
                            .filter(function (obj) {
                                return obj.version === productPage.versionId && obj.language === productPage.locale;
                            })
                            .map(function (obj) {
                                return obj.state;
                            });
                        showProductName(result);
                        getAvailableVersions();
                    } else {
                        getAvailableVersions();
                        getAvailableLanguages();
                        getAvailableStates();
                    }
                    displayError(productPage);
                    updateHero(productPage.errorCode, result);
                } else {
                    if ('contentCategoryIds' in productPage) {
                        $scope.product.groupIds = productPage.contentCategoryIds;
                    }
                    if ('disableSearch' in productPage && productPage.disableSearch === 1) {
                        $scope.filterOn.value = true;
                        $scope.showFilterButton = false;
                    }
                    if ('disableImages' in productPage && productPage.disableImages === 1) {
                    	$scope.showImages = false;
                    } else {
                    	$scope.showImages = true;
                    }
                    if ('downloadAsPdf' in productPage && productPage.downloadAsPdf === 1) {
                    	$scope.downloadAsPdf = true;
                    } else {
                    	$scope.downloadAsPdf = false;
                    }
                    $scope.showVersionNameWhenOneVersion = productPage.showVersionNameWhenOneVersion;
                    $scope.showSearchAndButtons = true;
                    $scope.product.validVersions = productPage.validVersions;
                    $scope.product.validLanguages = productPage.validLanguages;
                    $scope.product.validStates = productPage.validStates;
                    $scope.otherProductPages = productPage.otherProductPages;
                    $scope.product.state = productPage.state;
                    $scope.product.version = productPage.versionId;
                    $scope.product.locale = productPage.locale;
                	showProductName(result);
                    if ('deliverables' in productPage) { 
                        $scope.productDeliverables = productPage.deliverables;
                    } else {
                        $scope.productDeliverables = [];
                    }
                    if (productPage.shortdesc) {
                        $scope.product.shortdesc = productPage.shortdesc;
                        $('head').append('<meta name="description" content="' + productPage.shortdesc.replace(/"/g, "") + '">');
                    }
                    if (productPage.notSearchable === 1) {
                        var noIndex = $('<meta name="robots" content="no-index">');
                        $('head').append(noIndex);
                        $scope.$on("$destroy", function(){
                            $(noIndex).remove();
                        });
                    }
                    $scope.product.guides = [];
                    if (productPage.merge === 1) {
                        $scope.product.merge = true;
                        $scope.product.type = 'Merge';
                        productPageRefresh();
                        sortCategoryListsByAlpha();
                        createSectionsFromCustomProductPage(productPage);
                    } else if (productPage.has_sections === 1) {
                        $scope.product.custom = true;
                        $scope.product.type = 'Custom';
                        createSectionsFromCustomProductPage(productPage);
                    } else {
                        productPageRefresh();
                    }
                    loadSearchFromUrl();

                }
            });
        };

        function loadSearchFromUrl() {
            var urlParams = $location.search();
            if ('q' in urlParams) {
                $scope.product.setSubpage('results');
                var query = urlParams.q;
                $scope.searchContent(query);
                $scope.pp_keywords = decodeURIComponent(query);
            } 
        }

        function sortCategoryListsByAlpha() {
            for (var i = 0; i < $scope.product.guides.length; i++) {
                $scope.product.guides[i].list.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1;
                    }
                    return 0;
                });
            }
        }

        function createSectionsFromCustomProductPage(productPage) {
            $scope.product.ppsections = true;
            $scope.product.bmapLoio = productPage.bmapLoio;
            $scope.product.projectName = productPage.projectName;
            var sections = productPage.sections;
            for (var j = 0; j < sections.length; j++) {
                createSection(sections[j]);
            }
        }

        var customCategorySuffix = 0;

        function getCustomCategoryFilepath() {
            //customCategorySuffix = (customCategorySuffix + 1) % 4;
            return "custom";
        }

        function createSection(section) {
            var name = section.title_id;
            var links = section.links;
            var maxLinks = section.max_links;
            var productPages = section.productPages;
            var list = [];
            for (var j = 0; j < links.length; j++) {
                var deliverable;
                if (links[j].is_internal === 1) {
                    if (links[j].transtype === "productpage.uacp") {
                        var loioMap = productPages.map(function (obj) { return obj.loio; });
                        var indexInArray = loioMap.indexOf(links[j].output_id);
                        if (indexInArray > -1) {
                            var newInfo = links[j];
                            deliverable = productPages[indexInArray];
                            deliverable.index = newInfo.index + 1;
                            deliverable.weight = -1;
                            deliverable.transtype = "productpage.uacp";
                            deliverable.state = $scope.getCurrentState();
                            if (!('linktext' in newInfo) || newInfo.linktext.length === 0) {
                                //for product page deliverables, the product name should be the title 
                                deliverable.title = deliverable.productName;
                            } else {
                                deliverable.title = newInfo.linktext;
                            }
                            list.push(deliverable);
                            $scope.product.displayedDeliverables.push(deliverable);
                        } else {
                            $log.log("The product page deliverable with output ID '" + links[j].output_id + "' and version '" + links[j].version + "' and the same language and state could not be found.");
                        }
                    } else {
                        var filteredItems = getItem(links[j].bmap_loio, links[j].output_id);
                        for (var k = 0; k < filteredItems.length; k++) {
                            var filteredItem = filteredItems[k];
                            if (filteredItem === null) {
                                $log.log("Could not find deliverable with bmap loio: " + links[j].bmap_loio);
                                continue;
                            }
                            deliverable = createInternalDeliverable(filteredItem, links[j]);
                            list.push(deliverable);
                            $scope.product.displayedDeliverables.push(deliverable);
                        }
                    }
                } else {
                    deliverable = createExternalDeliverable(links[j]);
                    list.push(deliverable);
                    $scope.product.displayedDeliverables.push(deliverable);
                }
            }
            if (list.length > -1) {
                $scope.product.deliverableCount += list.length;
                if (list.length === 1) {
                    $scope.product.singleDeliverable = list[0];
                }
                if (list.length > maxLinks) {
                    list.isLongList = true;
                    $scope.product.longListCount++;
                    $scope.product.hasLongList = true;
                }
                //Rotate between four custom category images
                if (/^.*other.jpg.*$/.test(section.image_path)) {
                    section.image_path = getCustomCategoryFilepath();
                }

                if ($scope.product.merge === true) {
                    if ($scope.product.groupNames.indexOf(section.title_name) < 0 && $scope.product.groupIds.indexOf(section.title_id) < 0) {
                        $scope.product.groupNames.push(name);
                        $scope.product.guides.push({
                            id: camelize(name), //whatsNew
                            index: section.index + 100, //add a high number to ensure the custom categories come at the end after the dynamic categories
                            longList: list.isLongList,
                            list: list,
                            maxLinks: maxLinks,
                            title: section.title_name, //"What's New"
                            imagePath: "_build_938311c7a845691adeabc837/" + "img/cc_" + section.image_path.replace(/^img\/|\.jpg$/gi, '') + ".png", // "img/whats_new.jpg -> img/cc_whats_new.png"
                            description: section.shortdesc
                        });
                    } else {
                        //Lists should be sorted alphabetically already, then add on the deliverables from the custom product page by index. a,b,c,d, custom item 1, custom item 2
                        var category = ($scope.product.guides.filter(function (item) {
                            return item.title === section.title_name || item.id === section.title_id;
                        }));
                        category[0].description = section.shortdesc;
                        category[0].maxLinks = maxLinks;
                        list.sort(function (a, b) {
                            if (a.index > b.index) {
                                return 1;
                            }
                            if (a.index < b.index) {
                                return -1;
                            }
                            return 0;
                        });
                        for (var l = 0; l < category[0].list.length; l++) {
                            category[0].list[l].index = l;
                        }
                        category[0].list = (category[0].list).concat(list);
                        if (category[0].list.length > category[0].maxLinks) {
                            category[0].longList = true;
                            $scope.product.longListCount++;
                            $scope.product.hasLongList = true;
                        }

                    }
                } else {
                    $scope.product.guides.push({
                        id: camelize(name), //whatsNew
                        index: section.index, //0
                        longList: list.isLongList,
                        list: list,
                        maxLinks: maxLinks,
                        title: section.title_name, //"What's New"
                        imagePath: "_build_938311c7a845691adeabc837/" + "img/cc_" + section.image_path.replace(/^img\/|\.jpg$/gi, '') + ".png", // "img/whats_new.jpg -> img/cc_whats_new.png"
                        description: section.shortdesc
                    });
                }
            }
        }

        function createInternalDeliverable(filteredItem, newInfo) {
            var deliverable = {
                index: newInfo.index + 1
            };
            deliverable.buildableMapLOIO = filteredItem.buildableMapLOIO;
            deliverable.format = filteredItem.format;
            deliverable.locale = filteredItem.locale;
            deliverable.loio = filteredItem.loio;
            deliverable.alias = filteredItem.alias;
            deliverable.rootPage = filteredItem.rootPage;
            deliverable.hasLock = filteredItem.hasLock;
            deliverable.state = $scope.getCurrentState();
            deliverable.weight = -1;

            deliverable.version = $scope.params.versionId;

            deliverable.isExternal = false;
            if (newInfo.shortdesc.length === 0) {
                deliverable.shortdesc = filteredItem.shortdesc;
            } else {
                deliverable.shortdesc = newInfo.shortdesc;
            }
            if (!('linktext' in newInfo) || newInfo.linktext.length === 0) {
                deliverable.title = filteredItem.title;
            } else {
                deliverable.title = newInfo.linktext;
                deliverable.oldTitle = filteredItem.title;
            }
            deliverable.linkType = '';
            deliverable.transtype = filteredItem.transtype;
            deliverable.isVideo = false;

            return deliverable;
        }

        function createExternalDeliverable(info) {

            function convertPathIfNeeded(path, linkType, isVideo) {
                if (!isVideo && (linkType === "third_party" || linkType === "sap_non_doc")) {
                    path = "/viewer/disclaimer-for-links?q=" + encodeURIComponent(path);
                }
                return path;
            }

            var deliverable = {
                index: info.index + 1
            };
            // console.log(info);
            deliverable.isExternal = true;
            deliverable.shortdesc = info.shortdesc;
            deliverable.weight = -1;
            if ('linkType' in info) {
                deliverable.linkType = info.linkType;
            } else {
                deliverable.linkType = '';
            }
            if (info.is_video === 1) {
                deliverable.isVideo = true;
                if (info.href.indexOf("video.sap.com") > -1 ||
                    info.href.indexOf("kaltura.com") > -1
                ) {
                    deliverable.vidIsExternal = false;
                } else {
                    deliverable.vidIsExternal = true;
                }
            } else {
                deliverable.isVideo = false;
            }
            deliverable.href = convertPathIfNeeded(info.href, deliverable.linkType, deliverable.isVideo);
            deliverable.title = info.linktext;
            deliverable.transtype = "";
            deliverable.icon = info.icon;
            return deliverable;
        }

        if (!_state) {
            _state = "PRODUCTION";
        }

        var getAvailableVersions = function () {
            //Initialize variables for search service api
            $scope.verParameters = searchServiceApi.getDefaultParameters();
            $scope.verParameters.product = $scope.params.productId;
            $scope.verParameters.version = $scope.params.versionId;
            $scope.verParameters.state = "DRAFT,TEST,PRODUCTION";
            $scope.verParameters.language = '';
            //Get all available versions for product

            searchServiceApi.onFilterValuesRequested("version", $scope.verParameters, $scope.onNavValuesRetrieved);

        }

        var getAvailableLanguages = function () {
            //Initialize variables for search service api
            $scope.langParameters = searchServiceApi.getDefaultParameters();
            $scope.langParameters.product = $scope.params.productId;
            $scope.langParameters.version = $scope.params.versionId;
            $scope.langParameters.state = "DRAFT,TEST,PRODUCTION";

            //Get all available languages in version

            searchServiceApi.onFilterValuesRequested("language", $scope.langParameters, $scope.onNavValuesRetrieved);

        }

        var getAvailableStates = function () {
            //Initialize variables for search service api
            $scope.stateParameters = searchServiceApi.getDefaultParameters();
            $scope.stateParameters.product = $scope.params.productId;
            $scope.stateParameters.version = $scope.params.versionId;
            $scope.stateParameters.state = "DRAFT,TEST,PRODUCTION";
            $scope.stateParameters.language = $scope.locale;

            //Get all available states in version/language

            searchServiceApi.onFilterValuesRequested("state", $scope.stateParameters, $scope.onNavValuesRetrieved);

        }

        // handle retrieval of language data
        $scope.onNavValuesRetrieved = function (data, element) {
            $scope.pageLoading = false;
            Array.prototype.diff = function (a) {
                if (a === undefined || a.length === 0) {
                    return this;
                }
                var filteredArray = [];
                for (var i = 0; i < this.length; i++) {
                    if (a.indexOf(this[i].key) > -1) {
                        filteredArray.push(this[i]);
                    }
                }
                return filteredArray;
            };
            if (element === "version") {
                var _unsortedVersions = data.version.diff($scope.product.validVersions);
                var _unsortedVersionKeys = _unsortedVersions.map(function (obj) {
                    return obj.key;
                });
                var _sortedVersionKeys = versionUtilities.sortVersions(_unsortedVersionKeys);
                $scope.availableVersions = [];
                for (var i = 0; i < _sortedVersionKeys.length; i++) {
                    var n = _unsortedVersionKeys.indexOf(_sortedVersionKeys[i]);
                    $scope.availableVersions.push(_unsortedVersions[n]);
                }
               $scope.versionSelector = versionUtilities.getVersionSelectorState($scope.availableVersions, $scope.showVersionNameWhenOneVersion);
            }
            if (element === "language") {
                $scope.availableLanguages = data.language.diff($scope.product.validLanguages);
            }
            if (element === "state") {
                $scope.availableStates = data.state.diff($scope.product.validStates);
            }
        }
        $scope.initialize();
        var scrollToTopOfPage = function () {
            var distanceFromTop = pageYOffset;
            var headerHeight = $('div#cp-hero').outerHeight(false) + 70;

            if (distanceFromTop > headerHeight) {
                $('body').animate({ scrollTop: headerHeight }, 'fast');
            }
        }
        $scope.product = {
            type: 'Generated',
            getIcon: function (deliverable) {
                var pdf = {
                    addclass: ["pp-pdf-icon", "pp-addenda-i"],
                    title: "DETAIL_FORMAT_PDF"
                };
                var video;
                if (deliverable.isVideo) {
                    video = {};
                } else {
                    video = {
                        addclass: ["pp-video-icon", "pp-addenda-i"],
                        title: "DETAIL_FORMAT_VIDEO"
                    }
                }

                var other = {
                    addclass: ["pp-other-icon", "pp-addenda-i"],
                    title: "DETAIL_FORMAT_OTHER"
                };
                if ('transtype' in deliverable && deliverable.transtype.toLowerCase() === 'pdf.sap') {
                    return pdf;
                }
                if ('transtype' in deliverable && deliverable.transtype.toLowerCase() === 'pdf') {
                    return pdf;
                }
                if ('isExternal' in deliverable && deliverable.isExternal && 'icon' in deliverable && deliverable.icon !== undefined && deliverable.icon.length > 0) {
                    if (deliverable.icon === "pdf") {
                        return pdf;
                    }
                    if (deliverable.icon === "video") {
                        return video;
                    }
                    if (deliverable.icon === "other") {
                        return other;
                    }
                }
                if ('isExternal' in deliverable && deliverable.isExternal && 'href' in deliverable) {
                    if (/^.*.pdf$/i.test(deliverable.href)) {
                        return pdf;
                    }
                    if (/^.*.mp4$/i.test(deliverable.href)) {
                        return video;
                    }
                    if (/^.*\.(xlsx?|pptx?|zip)$/i.test(deliverable.href)) {
                        return other;
                    }
                    if (/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be|video\.sap\.com)\/.+$/i.test(deliverable.href)) {
                        return video;
                    }
                    if (/^(https?\:\/\/)?service.sap.com\/~sapidb\/.+$/i.test(deliverable.href)) {
                        return pdf;
                    }
                }
                return {};
            },
            expanded: false,
            toggleExpanded: function () {
                $scope.product.expanded = !$scope.product.expanded;
            },
            setExpanded: function (value) {
                $scope.product.expanded = value;
            },
            tab: "overview",
            subpage: "all", // all, details, results
            list: false,
            setList: function () {
                if ($scope.product.subpage == "details") {
                    $scope.product.tab = "overview";
                    $scope.product.subpage = "all";
                }
                $scope.product.list = true;
            },
            setTab: function (id) {
                if (id == 'overview') {
                    $scope.product.subpage = 'all';
                } else {
                    $scope.product.subpage = 'details';
                }
                scrollToTopOfPage();
                $scope.product.tab = id;
            },
            isTabSet: function (id) {
                return $scope.product.tab === id;
            },
            setSubpage: function (id) {
                if (id == 'all') {
                    $scope.product.tab = 'overview';
                }
                scrollToTopOfPage();
                $scope.product.subpage = id;
            },
            isSubpageSet: function (id) {
                return $scope.product.subpage === id;
            },
            localizedAllContentString: "All Content",
            localizedSearchResultsString: "Search Results",
            deliverableCount: 0,
            singleDeliverable: null, //Used to hold a single deliverable in case a page only has one deliverable. 
            ppsections: false,
            merge: false,
            custom: false,
            hasHasLongList: false,
            longListCount: 0,
            name: $scope.params.productId,
            productName: "",
            versionName: "",
            version: $scope.params.versionId,
            locale: $scope.locale,
            state: _state,
            maxLength: 0,
            searchText: "",
            versions: [],
            versionIds: [],
            locales: [],
            redirect: 0,
            displayedDeliverables: [],
            uacpBmaps: [],
            shortdesc: "",
            //Order could come from CMS 
            //CMS could provide json file to explain groups, text, ordering, image 
            groupNames: [],
            groupIds: [],
            descriptions: {
                //currently no default descriptions used
            },
            //Old function for changing versions
            productPageUrl: function (data) {
                return PATHS.BASE_URL + '/product' + $scope.url(_state) + '/' + $scope.params.productId + '/' + data + '/' + $scope.locale;
            },
            //New functions for changing versions
            changeVersionDynamic: function (version) {
                var getLangsForVersion = function () {
                    //Initialize variables for search service api
                    $scope.lforvParameters = searchServiceApi.getDefaultParameters();
                    $scope.lforvParameters.product = $scope.params.productId;
                    $scope.lforvParameters.version = version;
                    $scope.lforvParameters.state = "DRAFT,TEST,PRODUCTION";

                    //Get all available languages in target version
                    searchServiceApi.onFilterValuesRequested("language", $scope.lforvParameters, $scope.onNavValuesForVersionLang);
                }

                var langList = [];

                var desiredLang = $scope.locale;

                var stateList = [];

                var desiredState = $scope.getCurrentState();

                // handle retrieval of language data
                $scope.onNavValuesForVersionLang = function (data, element) {
                    langList = data.language;
                    langList = langList.map(function (data) {
                        return data.value;
                    });
                    //Pick lang to be used if preferred isn't available
                    if (langList.indexOf(desiredLang) === -1) {
                        if (langList.indexOf("en-US") > -1) {
                            desiredLang = "en-US";
                        } else if (langList.indexOf("de-DE") > -1) {
                            desiredLang = "de-DE";
                        } else {
                            desiredLang = langList[0];
                        }
                    };

                    var getStatesForVersion = function () {
                        //Initialize variables for search service api
                        $scope.sforvParameters = searchServiceApi.getDefaultParameters();
                        $scope.sforvParameters.product = $scope.params.productId;
                        $scope.sforvParameters.version = version;
                        $scope.sforvParameters.state = "DRAFT,TEST,PRODUCTION";
                        $scope.sforvParameters.language = desiredLang;

                        //Get all available states in target language/version
                        searchServiceApi.onFilterValuesRequested("state", $scope.sforvParameters, $scope.onNavValuesForVersionState);
                    }

                    // handle retrieval of state data
                    $scope.onNavValuesForVersionState = function (data, element) {
                        stateList = data.state;
                        stateList = stateList.map(function (data) {
                            return data.value;
                        });
                        //Pick state to be used if preferred isn't available
                        if (stateList.indexOf(desiredState) === -1) {
                            if (stateList.indexOf("PRODUCTION") > -1) {
                                desiredState = "PRODUCTION";
                            } else if (stateList.indexOf("TEST") > -1) {
                                desiredState = "TEST";
                            } else {
                                desiredState = "DRAFT";
                            }
                        };
                        window.location.replace(PATHS.BASE_URL + '/product' + $scope.url(desiredState) + '/' + $scope.params.productId + '/' + version + '/' + desiredLang);
                    }

                    getStatesForVersion();
                }

                getLangsForVersion();

            },
            changeVersion: function (version) {

                if (!$scope.product.custom && !$scope.product.merge) {
                    $scope.product.changeVersionDynamic(version);
                } else {
                    $scope.changeVersionCustom(version);
                }
            },



            changeLanguage: function (language) {
                var getStatesForLanguage = function () {
                    //Initialize variables for search service api
                    $scope.sforlParameters = searchServiceApi.getDefaultParameters();
                    $scope.sforlParameters.product = $scope.params.productId;
                    $scope.sforlParameters.version = $scope.params.versionId;
                    $scope.sforlParameters.state = "DRAFT,TEST,PRODUCTION";
                    $scope.sforlParameters.language = language;

                    //Get all available states in target language

                    searchServiceApi.onFilterValuesRequested("state", $scope.sforlParameters, $scope.onNavValuesForLanguage);

                }

                var stateList = [];

                var desiredState = $scope.getCurrentState();

                // handle retrieval of state data
                $scope.onNavValuesForLanguage = function (data, element) {
                    if (element === "state") {
                        stateList = data.state;
                    };
                    stateList = stateList.map(function (data) {
                        return data.value;
                    });
                    //Pick state to be used if preferred isn't available
                    if (stateList.indexOf(desiredState) === -1) {
                        if (stateList.indexOf("PRODUCTION") > -1) {
                            desiredState = "PRODUCTION";
                        } else if (stateList.indexOf("TEST") > -1) {
                            desiredState = "TEST";
                        } else {
                            desiredState = "DRAFT";
                        }
                    };
                    window.location.replace(PATHS.BASE_URL + '/product' + $scope.url(desiredState) + '/' + $scope.params.productId + '/' + $scope.params.versionId + '/' + language);
                }

                getStatesForLanguage();
            },
            changeState: function (state) {
                return PATHS.BASE_URL + '/product' + $scope.url(state) + '/' + $scope.params.productId + '/' + $scope.params.versionId + '/' + $scope.locale;
            },
            viewerURL: function (data) {

                var url = "";
                var commonData = $scope.url(data.state) + '/' + data.loio + '/' + data.version + '/' + data.locale;
                if (data.isExternal === true) {
                    url = data.href;
                } else if (data.transtype === "html5.uacp") {
                    if (data.alias) {
                        url = PATHS.BASE_URL + $scope.aliasURL(data);
                    } else {
                        url = PATHS.BASE_URL + commonData;
                    }
                } else if (data.transtype === "productpage.uacp") {
                    url = PATHS.BASE_URL + '/product' + $scope.url(data.state) + '/' + data.product + '/' + data.version + '/' + data.locale;
                } else {
                    if (data.alias) {
                        url = $scope.aliasURL(data) + '/' + data.rootPage;
                    } else {
                        url = "/http.svc/rc" + commonData + '/' + data.rootPage;
                    }
                }

                if (data.hasLock) {
                    return PATHS.LOGIN_URL + encodeURIComponent(url);
                } else {
                    return url;
                }
            },
            getTarget: function (data) {
                if (data.transtype === "html5.uacp" || data.transtype === "productpage.uacp") {
                    return "";
                }
                return "_blank";
            },
            getRel: function (data) {
                if (data.transtype === "html5.uacp" || data.transtype === "productpage.uacp") {
                    return "";
                }
                return "noopener noreferrer";
            }
        };

        $scope.checkActive = function (var1, var2) {
            if (var1 == var2) {
                return true;
            }
        }

        //check if language exists in releases, used for the secondary language selector on productpage
        $scope.checkLanguageNew = function (preferredLanguage) {

            if ($scope.availableLanguages !== undefined) {

                var availableLanguagesNew = $scope.availableLanguages.map(function (release) {
                    var twoDigits = release.value.substring(0, 2);
                    return twoDigits;
                });

                if (availableLanguagesNew.indexOf(preferredLanguage) > -1) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return true;
            }
        };
        $scope.getDirection = function () {
            var language = $scope.locale;

            if (language !== undefined) {
                if (language.substring(0, 2) == 'ar' ||
                    language.substring(0, 2) == 'he') {
                    return 'rtl';
                } else {
                    return 'ltr';
                }
            }
            return 'ltr';
        };
        $scope.getSecLang = function () {
            var langcode = $scope.locale.substring(0,2);
            if (langcode !== undefined) {
            	return langcode;
            }
            return 'en';
        };
        $scope.url = function (state) {
            if (state === 'PRODUCTION') {
                return '';
            } else {
                return '/' + state;
            }
        };
        $scope.trust = function (url) {
            return $sce.trustAsResourceUrl(url);
        };

        function getItem(bmapLoio, outputId) {
            var deliverable = searchDeliverables($scope.productDeliverables, bmapLoio, outputId);
            return deliverable;
        }

        function searchDeliverables(deliverableList, bmapLoio, outputId) {
            //items array holds a deliverables of the same buildable map loio for further filtering
            var html5Items = [];
            var otherItems = [];
            var outputIdItem = [];
            var hasOutputId = outputId.length > 0;
            for (var i = 0; i < deliverableList.length; i++) {
                var deliverable = deliverableList[i];
                if (deliverable.version !== $scope.params.versionId) {
                    continue;
                }

                //if bmap loio is not provided, just search for matching output id (loio)
                if (bmapLoio === deliverable.buildableMapLOIO || (bmapLoio === "" && hasOutputId)) {
                    if (hasOutputId && deliverable.loio === outputId) {
                        outputIdItem.push(deliverable);
                        return outputIdItem;
                    }
                    //return html5.uacp if detected.
                    if (deliverable.transtype === "html5.uacp") {
                        html5Items.push(deliverable);
                    } else {
                        otherItems.push(deliverable);
                    }
                }
            }
            if (hasOutputId) {
                return [];
            } else if (html5Items.length > 0) {
                return html5Items;
            } else {
                return otherItems;
            }
        }

        function populateVersionAndProductName(results) {
            if (!$scope.hasAlias && !$scope.onlyProductInUrl && !results[0] && $stateParams.languageCode === undefined) {
                $window.location.href += "/en-US";
            }
            if (results.length === 0) {
                $log.log("problem with product page results");
            }
            //                              $scope.product.productName = results[0].productName;
            for (var i = 0; i < results.length; i++) {
                $scope.product.versions.push({
                    "id": results[i].version,
                    "name": results[i].versionName,
                    "productName": results[i].productName
                });
                if (results[i].version === $scope.params.versionId) {
                    $scope.product.productName = results[i].productName;
                    $scope.product.versionName = results[i].versionName;
                    $scope.$parent.viewTitle = $scope.product.productName;
                    // set title of the page
   			    	$window.document.title = $scope.product.productName + " | SAP Help Portal";
                }
            }
            getAvailableVersions();

            getAvailableLanguages();

            getAvailableStates();
        }

        function productPageRefresh() {
            deliverablesReset();
            var deliverables = preprocessDeliverables($scope.productDeliverables);
            addToTranstypeLists(deliverables);
            mergeAndFilterTranstypeLists();
            createCategoryLists();
        }

        function deliverablesReset() {
            $scope.product.uacpBmaps = [];
            $scope.product.unfilteredDeliverables = [];
            $scope.product.displayedDeliverables = [];
            $scope.product.uacpHtml5Deliverables = [];
            $scope.product.pdfDeliverables = [];
            $scope.product.otherDeliverables = [];
            $scope.product.guides = [];
            for (var i = 0; i < $scope.product.groupIds.length; i++) {
                var categoryId = $scope.product.groupIds[i];
                var categoryName = $scope.product.groupNames[i];
                addGuideCategory(categoryName, false, categoryId);
            }
        }

        //TODO add custom category image rotation
        function addGuideCategory(name, newCategory, id) { //eg "What's New" 
            var _imgPath = "";
            if (typeof id === 'undefined') {
                id = underscorise(name);
            }
            if (newCategory) {
                $scope.product.groupNames.push(name);
                _imgPath = getCustomCategoryFilepath();
            } else {
                _imgPath = "img/" + id + ".jpg";
            }

            $scope.product.guides.push({
                id: id,
                index: $scope.product.groupNames.indexOf(name), //0
                list: [],
                title: name, //"What's New"
                imagePath: "_build_938311c7a845691adeabc837/" + "img/cc_" + _imgPath.replace(/^img\/|\.jpg$/gi, '') + ".png", // "img/whats_new.jpg -> img/cc_whats_new.png"
                description: ''
            });
        }

        function preprocessDeliverables(deliverables) {
            var unfilteredDeliverables = [];
            for (var i = 0; i < deliverables.length; i++) {
                //Deal with categories
                var deliverable = deliverables[i];
                // $scope.product.productName = deliverable.productName;
                // $scope.product.versionName = deliverable.versionName;
                //Need to check if version is correct for the deliverables
                if (!deliverable.documentType || deliverable.version !== $scope.params.versionId || deliverable.product != $scope.params.productId) {
                    continue;
                }
                var processedDocType = deliverable.documentType.replace("’", "'"); //Need update from CMS for localization, will take time
                if (processedDocType === "end-user_information") {
                    processedDocType = "enduser_information";
                }
                deliverable.documentType = processedDocType;
                if ($scope.product.groupNames.indexOf(processedDocType) < 0 && $scope.product.groupIds.indexOf(processedDocType) < 0) {
                    addGuideCategory(processedDocType, true);
                }
                unfilteredDeliverables.push(deliverable);
            }
            return unfilteredDeliverables;
        }

        function camelize(str) {
            if (str == null || str.length === 0) {
                return "";
            }
            str = str.replace("'", "").replace("’", "");
            return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
                if (+match === 0) return ""; // or if
                // (/\s+/.test(match))
                // for white spaces
                return index == 0 ? match.toLowerCase() : match.toUpperCase();
            });
        }

        function underscorise(str) {
            if (str == null || str.length === 0) {
                return "";
            }
            return str.replace(/ /g, "_").replace(/[^\w]/g, "").toLowerCase();
        }

        function addToTranstypeLists(deliverables) {
            var selectedList;
            for (var i = 0; i < deliverables.length; i++) {
                var deliverable = deliverables[i];
                //There should only be one productpage.uacp transtype 
                //todo make sure we only get one version when requesting deliverables
                if (deliverable.transtype === "productpage.uacp" || deliverable.documentType.length === 0) { } else {
                    if (deliverable.transtype === "html5.uacp") {
                        $scope.product.uacpHtml5Deliverables.push(deliverable);
                    } else if (deliverable.transtype === "pdf.sap") {
                        $scope.product.pdfDeliverables.push(deliverable);
                    } else {
                        $scope.product.otherDeliverables.push(deliverable);
                    }
                }
            }
        }

        function mergeAndFilterTranstypeLists() {
            addAllDeliverables([$scope.product.uacpHtml5Deliverables,
            $scope.product.pdfDeliverables,
            $scope.product.otherDeliverables
            ]);
        }
        //Add all deliverables in order of priority
        function addAllDeliverables(deliverableList) {
            for (var i = 0; i < deliverableList.length; i++) {
                addDeliverables(deliverableList[i]);
            }
        }

        function addDeliverables(deliverables) {
            var tempBmaps = [];
            for (var i = 0; i < deliverables.length; i++) {
                var deliverable = deliverables[i];
                if ($scope.product.uacpBmaps.indexOf(deliverable.buildableMapLOIO) < 0) {
                    $scope.product.displayedDeliverables.push(deliverable);
                    tempBmaps.push(deliverable.buildableMapLOIO);
                }
            }
            $scope.product.uacpBmaps = $scope.product.uacpBmaps.concat(tempBmaps);
        }

        //        function redirectToSingleDeliverable(deliverable) {
        //        	if ($scope.product.redirect === 0) {
        //        		 $scope.product.redirect = 1;
        //        		 if (deliverable.isExternal && 'href' in deliverable && deliverable.href.length > 0) {
        //    				 Notification.info({message: 'You are being redirected to the only available information for the selected product.', replaceMessage: true, maxCount: 1});
        //    			 } else {
        //        			 Notification.info({message: 'You are being redirected to the only available guide for the selected product.', replaceMessage: true, maxCount: 1});
        //    			 }
        //        		 var timer = $timeout(function () {
        //        			 if (deliverable.isExternal && 'href' in deliverable && deliverable.href.length > 0) {
        //        				 window.location.replace(deliverable.href);
        //        			 } else {
        //            			 window.location.replace(window.location.origin + $scope.product.viewerURL(deliverable));
        //        			 }
        //        			 }, 5000);
        //        		 $scope.$on(
        //                         "$destroy",
        //                         function( event ) {
        //                        	 Notification.clearAll();
        //                             $timeout.cancel( timer );
        //                         }
        //                     );
        //        	}
        //        }

        function createCategoryLists() {
            $scope.product.deliverableCount += $scope.product.displayedDeliverables.length;
            for (var k = 0; k < $scope.product.displayedDeliverables.length; k++) {
                var deliverable = $scope.product.displayedDeliverables[k];
                var docType = deliverable.documentType;
                for (var j = 0; j < $scope.product.guides.length; j++) {
                    var guide = $scope.product.guides[j];
                    if (guide.title === docType || guide.id === docType) {
                        guide.list.push(deliverable);
                        //For dynamic product pages, each section has a max of 5 links.
                        if (guide.list.length > 10000) {
                            guide.longList = true;
                            $scope.product.longListCount++;
                            $scope.product.hasLongList = true;
                        }
                    }
                }
            }
        }
        
        $scope.nonEmptyCC = function(item) {
        	// must have array, and array must be empty
            return item.list.length;
        }

        $scope.aliasURL = function (data) {
            if (data.state) {
                return $scope.url(data.state) + '/' + data.alias;
            } else {
                return data.alias;
            }
        };
        $scope.ppLoadingResults = false;
        $scope.to = 21;
        $scope.moreResults = false;
        $scope.previousTerm = '';
        $scope.searchResults.results = [];
        var pp_keywords = '';
        $scope.pp_search = {
            keywords: function(newKeywords){
                return arguments.length ? (pp_keywords = newKeywords) : pp_keywords;
            }
    };
        // starts the search for a specific term
        $scope.searchContent = function (term) {
        	
        	if (!$scope.filterOn.value) {

	        	if ($scope.currentSearchScope == 'All SAP products') {

	        		if ($scope.isLoggedOn()) {
	    				if(term) {
	    					$location.url('/search?q=' + term +'&state=DRAFT,TEST,PRODUCTION&language=en-US&format=standard,html,pdf,others');					
	    				} else {
	    					$location.url('/search?state=DRAFT,TEST,PRODUCTION&language=en-US&format=standard,html,pdf,others');										
	    				}
	    			} else {
	    				if(term) {
	    					$location.url('/search?q=' + term + '&state=PRODUCTION&language=en-US&format=standard,html,pdf,others');					
	    				} else {
	    					$location.url('/search?state=PRODUCTION&language=en-US&format=standard,html,pdf,others');										
	    				}
	    			}
	        	} else {
	        
	
		            //if term undefined, this means we are loading more results with the same search term as before
		            if (term !== undefined) {
		                var urlParams = $location.search();
		                if (term !== $scope.previousTerm && !('q' in urlParams && decodeURIComponent(urlParams.q) ===term)) {
		                    $window.location.href = location.protocol + '//' + location.host + location.pathname + '?q=' + encodeURIComponent(term);
		                }
		                $scope.ppLoadingResults = true;
		                $scope.previousTerm = term;
		                $scope.to = 21;
		                $scope.moreResults = false;
		            } else {
		                term = $scope.previousTerm;
		            }
		            $scope.nothingFoundVisible = false;
		            $scope.product.subpage = 'results';
		            var params = searchServiceApi.getDefaultParameters();
		            params.q = term;
		            params.area = "content";
		            params.product = $scope.product.name;
		            params.version = $scope.product.version;
		            params.language = $scope.product.locale;
		            params.state = $scope.product.state;
                    params.to = $scope.to;
                    if ($scope.showByFeatureFlag("ppsearch")) {
                        params.ppdependencysearch = 1;
                    }
		            searchServiceApi.setParameters(params)
		            searchServiceApi.onSearchRequested(encodeURI(term), $scope.onSearchRetrieved);
	        	}
	        }
        }
        
        // callback when search results are retrieved
        $scope.onSearchRetrieved = function (response) {

            var highlightingEnabled = resultsHandler.getShowHighlighting();

            if(highlightingEnabled && response.results && response.query) {
                
                var topics = response.results;
                
                for(var i=0; i<topics.length; i++) {
                    
                    if(topics[i].transtype === "html5.uacp") {
                        topics[i].url += "?q="+response.query;
                    }
                }
            }
            
            $scope.ppLoadingResults = false;
            $scope.nothingFoundVisible = false;
            var _resultsLength = response.results.length;
            if (_resultsLength === $scope.to) {
                $scope.moreResults = true;
                response.results = response.results.splice(0, $scope.to - 1);
                $scope.to += 20;
            } else {
                $scope.moreResults = false;
            }
            $scope.searchResults = response;

            if (_resultsLength == 0) {
                $scope.nothingFoundVisible = true;
            }
            
            if(response.query) {
                adobeTracker.trackSearchData(response.query, $scope.nothingFoundVisible);
            }
        };
        
        $scope.onSelectResult = function() { 
        	
        	var linkRank = this.$index+1; 
        	var linkDescription = this.item.title; 
        	
        	adobeTracker.trackResultClick(linkRank, linkDescription);
        };


    }
]);
//fix for certain languages e.g., German displaying escaped HTML entities. 
cpProductController.filter('html', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});