var app = angular.module("dashboard",['ngCookies','angularUtils.directives.dirPagination']);
app.controller('placesCtrl',function($scope,$http,config)
{
	$scope.pageSize = 5;
	$scope.currentPage = 1;
	$http.get(config.apiUrl+"places").then(function(result)
	{
		$scope.places = result.data;
	});
});

app.controller('beaconCtrl',function($scope,$http,config)
{
	$scope.pageSize = 5;
	$scope.currentPage = 1;
	$http.get(config.apiUrl+"beacon").then(function(result)
	{
		$scope.beacons = result.data;
	});
});