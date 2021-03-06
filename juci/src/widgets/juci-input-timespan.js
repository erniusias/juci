//! Author: Martin K. Schröder <mkschreder.uk@gmail.com>
$juci.app.directive("juciInputTimespan", function () {
	return {
		templateUrl: "/widgets/juci-input-timespan.html",
		restrict: 'E',
		replace: true,
		scope: {
			model: "=ngModel"
		}, 
		controller: "juciInputTimespan"
	};
}).controller("juciInputTimespan", function($scope){
	$scope.data = {
		from: "", to: ""
	}; 
	$scope.validateTime = function(time){
		return (new UCI.validators.TimeValidator()).validate({ value: time }); 
	}
	$scope.validateTimespan = function(time){
		return (new UCI.validators.TimespanValidator()).validate({ value: time }); 
	}
	$scope.$watch("model", function(model){
		if(model && model.value && model.value.split){
			var value = model.value; 
			var parts = value.split("-"); 
			if(parts.length == 2){
				$scope.data.from = parts[0]||""; 
				$scope.data.to = parts[1]||""; 
			} else {
				$scope.data.from = value; 
			}
		} else {
			$scope.data.to = $scope.data.from = ""; 
		}
	}, true); 
	
	(function(){
		function updateTime(value){
			if($scope.model){
				$scope.model.start_time = $scope.data.from; 
				$scope.model.end_time = $scope.data.to; 
				$scope.model.value = ($scope.data.from||"") + "-"+($scope.data.to||""); 
			}
		}
		$scope.$watch("data.from", updateTime); 
		$scope.$watch("data.to", updateTime); 
	})(); 
}); 
