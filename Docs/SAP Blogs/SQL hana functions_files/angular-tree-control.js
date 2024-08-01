(function(angular){'use strict';angular.module('treeControl',[]).directive('treecontrol',['$compile','$log','userSharedService',function($compile,$log,sharedService){function classIfDefined(cssClass,addClassProperty){if(cssClass){if(addClassProperty)
return'class="'+cssClass+'"';else return cssClass}
else return""}
function ensureDefault(obj,prop,value){if(!obj.hasOwnProperty(prop))
obj[prop]=value}
return{restrict:'EA',require:"treecontrol",transclude:!0,scope:{treeModel:"=",selectedNode:"=?",selectedNodes:"=?",expandedNodes:"=?",onSelection:"&",onNodeToggle:"&",options:"=?",orderBy:"@",reverseOrder:"@",filterExpression:"=?",filterComparator:"=?"},controller:['$scope','$log',function($scope,$log){function defaultIsLeaf(node){return!node[$scope.options.nodeChildren]||node[$scope.options.nodeChildren].length===0}
function shallowCopy(src,dst){if(angular.isArray(src)){dst=dst||[];for(var i=0;i<src.length;i++){dst[i]=src[i]}}else if(angular.isObject(src)){dst=dst||{};for(var key in src){if(hasOwnProperty.call(src,key)&&!(key.charAt(0)==='$'&&key.charAt(1)==='$')){dst[key]=src[key]}}}
return dst||src}
function defaultEquality(a,b){if(a===undefined||b===undefined||a==null||b==null)
return!1;a=shallowCopy(a);a[$scope.options.nodeChildren]=[];b=shallowCopy(b);b[$scope.options.nodeChildren]=[];return angular.equals(a,b)}
$scope.options=$scope.options||{};ensureDefault($scope.options,"multiSelection",!1);ensureDefault($scope.options,"nodeChildren","children");ensureDefault($scope.options,"dirSelectable","true");ensureDefault($scope.options,"injectClasses",{});ensureDefault($scope.options.injectClasses,"ul","");ensureDefault($scope.options.injectClasses,"li","");ensureDefault($scope.options.injectClasses,"liSelected","");ensureDefault($scope.options.injectClasses,"iExpanded","");ensureDefault($scope.options.injectClasses,"iCollapsed","");ensureDefault($scope.options.injectClasses,"iLeaf","");ensureDefault($scope.options.injectClasses,"label","");ensureDefault($scope.options.injectClasses,"labelSelected","");ensureDefault($scope.options,"equality",defaultEquality);ensureDefault($scope.options,"isLeaf",defaultIsLeaf);$scope.selectedNodes=$scope.selectedNodes||[];$scope.expandedNodes=$scope.expandedNodes||[];$scope.expandedNodesMap={};for(var i=0;i<$scope.expandedNodes.length;i++){$scope.expandedNodesMap[""+i]=$scope.expandedNodes[i]}
$scope.parentScopeOfTree=$scope.$parent;function isSelectedNode(node){if(!$scope.options.multiSelection&&($scope.options.equality(node,$scope.selectedNode))){return!0}
else if($scope.options.multiSelection&&$scope.selectedNodes){for(var i=0;(i<$scope.selectedNodes.length);i++){if($scope.options.equality(node,$scope.selectedNodes[i])){return!0}}
return!1}}
$scope.headClass=function(node){var liSelectionClass=classIfDefined($scope.options.injectClasses.liSelected,!1);var injectSelectionClass="";if(liSelectionClass&&isSelectedNode(node))
injectSelectionClass=" "+liSelectionClass;if(!node.filteringTokens){if($scope.options.isLeaf(node))
return"tree-leaf"+injectSelectionClass;if($scope.expandedNodesMap[this.$id])
return"tree-expanded"+injectSelectionClass;else return"tree-collapsed"+injectSelectionClass}else{if($scope.options.isLeaf(node))
return"tree-leaf "+node.filteringTokens+injectSelectionClass;if($scope.expandedNodesMap[this.$id])
return"tree-expanded "+node.filteringTokens+injectSelectionClass;else return"tree-collapsed "+node.filteringTokens+injectSelectionClass}};$scope.isTopicHead=function(node){if(!node.u){return'topichead'}else{if(node.m){return'chaptertitle o2olink'}else{return'chaptertitle'}}}
$scope.featureFlag=function(feature){return sharedService.isRestricted(feature)};$scope.iBranchClass=function(){if($scope.expandedNodesMap[this.$id])
return classIfDefined($scope.options.injectClasses.iExpanded);else return classIfDefined($scope.options.injectClasses.iCollapsed)};$scope.nodeExpanded=function(){return!!$scope.expandedNodesMap[this.$id]};$scope.selectNodeHead=function(){var expanding=$scope.expandedNodesMap[this.$id]===undefined;$scope.expandedNodesMap[this.$id]=(expanding?this.node:undefined);if(expanding){$scope.expandedNodes.push(this.node)}
else{var index,p;while(index!=-1){p=index;for(var i=0;(i<$scope.expandedNodes.length);i++){if($scope.options.equality($scope.expandedNodes[i],this.node)){index=i}}
if(index!=undefined&&index!=-1)
$scope.expandedNodes.splice(index,1);if(p==index)index=-1}}
if($scope.onNodeToggle)
$scope.onNodeToggle({node:this.node,expanded:expanding});$scope.$emit("tocExpanded")};$scope.selectNodeLabel=function(selectedNode){if(selectedNode[$scope.options.nodeChildren]&&selectedNode[$scope.options.nodeChildren].length>0&&!$scope.options.dirSelectable){this.selectNodeHead()}
else{var selected=!1;if($scope.options.multiSelection){var pos=-1;for(var i=0;i<$scope.selectedNodes.length;i++){if($scope.options.equality(selectedNode,$scope.selectedNodes[i])){pos=i;break}}
if(pos===-1){$scope.selectedNodes.push(selectedNode);selected=!0}else{$scope.selectedNodes.splice(pos,1)}}else{if(!$scope.options.equality(selectedNode,$scope.selectedNode)){$scope.selectedNode=selectedNode;selected=!0}
else{}}
if($scope.onSelection)
$scope.onSelection({node:selectedNode,selected:selected})}};$scope.selectedClass=function(){var isThisNodeSelected=isSelectedNode(this.node);var labelSelectionClass=classIfDefined($scope.options.injectClasses.labelSelected,!1);var injectSelectionClass="";if(labelSelectionClass&&isThisNodeSelected)
injectSelectionClass=" "+labelSelectionClass;return isThisNodeSelected?"tree-selected"+injectSelectionClass:""};var orderBy=$scope.orderBy?' | orderBy:orderBy:reverseOrder':'';var template='<div '+classIfDefined($scope.options.injectClasses.ul,!0)+'>'+'<div class="chapter" ng-repeat="node in node.'+$scope.options.nodeChildren+' | filter:filterExpression:filterComparator '+orderBy+'" ng-class="headClass(node)">'+'<div class="chaptertitleortopichead tree-line" ng-class="isTopicHead(node)" ng-click="node.u ? angular.noop() : selectNodeHead(node)" >'+'<div class="collapseicon tree-branch-head" ng-click="node.u ? selectNodeHead(node) : angular.noop()">'+'<span ng-show="!expandedNodesMap[this.$id]" class="cp-collapsed"></span>'+'<span ng-show="expandedNodesMap[this.$id]" class="cp-expanded"></span>'+'</div>'+'<div class="emptycollapseicon tree-leaf-head '+classIfDefined($scope.options.injectClasses.iLeaf,!1)+'"></div>'+'<div class="topictitle tree-label '+classIfDefined($scope.options.injectClasses.label,!1)+'" ng-class="selectedClass()" ng-click="node.u ? selectNodeLabel(node) : angular.noop()" tree-transclude></div>'+'<div ng-show="node.m && !featureFlag('+"'navrefsearch'"+')" class="o2oicon" title="Related document">&#xe039;</div>'+'</div>'+'<div class="subchaptersrow tree-line">'+'<div class="collapseiconempty"></div>'+'<div class="subchapterscell tree-line">'+'<treeitem ng-if="nodeExpanded()"></treeitem>'+'</div>'+'</div>'+'</div>'+'</div>';this.template=$compile(template)}],compile:function(element,attrs,childTranscludeFn){return function(scope,element,attrs,treemodelCntr){scope.$watch("treeModel",function updateNodeOnRootScope(newValue){if(angular.isArray(newValue)){if(angular.isDefined(scope.node)&&angular.equals(scope.node[scope.options.nodeChildren],newValue))
return;scope.node={};scope.synteticRoot=scope.node;scope.node[scope.options.nodeChildren]=newValue}
else{if(angular.equals(scope.node,newValue))
return;scope.node=newValue}});scope.$watchCollection('expandedNodes',function(newValue){var notFoundIds=0;var newExpandedNodesMap={};var $liElements=element.find('.chaptertitleortopichead');var existingScopes=[];angular.forEach($liElements,function(liElement){var $liElement=angular.element(liElement);var liScope=$liElement.scope();existingScopes.push(liScope)});angular.forEach(newValue,function(newExNode){var found=!1;for(var i=0;(i<existingScopes.length)&&!found;i++){var existingScope=existingScopes[i];if(scope.options.equality(newExNode,existingScope.node)){newExpandedNodesMap[existingScope.$id]=existingScope.node;found=!0}}
if(!found)
newExpandedNodesMap[notFoundIds++]=newExNode});scope.expandedNodesMap=newExpandedNodesMap});treemodelCntr.template(scope,function(clone){element.html('').append(clone)});scope.$treeTransclude=childTranscludeFn}}}}]).directive("treeitem",function(){return{restrict:'E',require:"^treecontrol",link:function(scope,element,attrs,treemodelCntr){treemodelCntr.template(scope,function(clone){element.html('').append(clone)})}}}).directive("treeTransclude",function(){return{link:function(scope,element,attrs,controller){if(!scope.options.isLeaf(scope.node)){angular.forEach(scope.expandedNodesMap,function(node,id){if(scope.options.equality(node,scope.node)){scope.expandedNodesMap[scope.$id]=scope.node;scope.expandedNodesMap[id]=undefined}})}
if(!scope.options.multiSelection&&scope.options.equality(scope.node,scope.selectedNode)){scope.selectedNode=scope.node}else if(scope.options.multiSelection){var newSelectedNodes=[];for(var i=0;(i<scope.selectedNodes.length);i++){if(scope.options.equality(scope.node,scope.selectedNodes[i])){newSelectedNodes.push(scope.node)}}
scope.selectedNodes=newSelectedNodes}
scope.transcludeScope=scope.parentScopeOfTree.$new();scope.transcludeScope.node=scope.node;scope.transcludeScope.$parentNode=(scope.$parent.node===scope.synteticRoot)?null:scope.$parent.node;scope.transcludeScope.$index=scope.$index;scope.transcludeScope.$first=scope.$first;scope.transcludeScope.$middle=scope.$middle;scope.transcludeScope.$last=scope.$last;scope.transcludeScope.$odd=scope.$odd;scope.transcludeScope.$even=scope.$even;scope.$on('$destroy',function(){scope.transcludeScope.$destroy()});scope.$treeTransclude(scope.transcludeScope,function(clone){element.empty();element.append(clone)})}}})})(angular)