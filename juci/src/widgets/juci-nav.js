//! Author: Martin K. Schröder <mkschreder.uk@gmail.com>

JUCI.app
.directive("juciNav", function(){
	return {
		// accepted parameters for this tag
		scope: {
		}, 
		templateUrl: "/widgets/juci-nav.html", 
		replace: true, 
		controller: "NavCtrl",
		controllerAs: "ctrl"
	}; 
})
.controller("NavCtrl", function($scope, $navigation, $location, $state, $rootScope, $config){
	$scope.showSubMenuItems = false;
	
	$scope.hasChildren = function(menu){
		return Object.keys(menu.children) > 0;
	};

	$scope.isItemActive = function (item) {
		var active_node = $navigation.findNodeByHref($location.path().replace(/\//g, "")); 
		if(!active_node) return false; 
		if(item.href === active_node.href) {
			if(item.children_list && item.children_list.length > 0) {
				$scope.showSubMenuItems = true;
			} else {
				$scope.showSubMenuItems = false;
			}
			return true;
		} else if (active_node.path.indexOf(item.path) === 0){
			$scope.showSubMenuItems = true; 
		} else {
			$scope.showSubMenuItems = false; 
		}
		return false;
	};

	$scope.isSubItemActive = function (item) {
		var active_node = $navigation.findNodeByHref($location.path().replace(/\//g, "")); 
		if(!active_node) return false; 
		return item.href === active_node.href;
	};

	$scope.itemVisible = function(item){
		if(!item.modes || !item.modes.length) return true; 
		else if(item.modes && item.modes.indexOf($config.local.mode) == -1) {
			return false; 
		} 
		else return true; 
	};

	function activate(){
		var node = $navigation.findNodeByHref($location.path().replace(/\//g, "")); 
		if(node) {
			$scope.tree = $navigation.tree(node.path.split("/")[0]); 
		}
		//var path = $location.path().replace(/^\/+|\/+$/g, '');
		//var subtree = path.split("-")[0];
		//$scope.tree = $navigation.tree(subtree);
	}
	activate();
	
});
