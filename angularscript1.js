var app=angular.module("loqity",['ngRoute','ngAnimate','serve'])
app.config(function($routeProvider,$locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/',{
			templateUrl:'main.html',
			controller:'mainctrl'
		})

		$routeProvider
		.when('/company',{
			templateUrl:'company.html',
			controller:'companyctrl'
		})

		.when('/solution',{
			templateUrl:'solution1.html',
			controller:'solutionctrl'
		})

		.when('/features',{
			templateUrl:'features1.html',
			controller:'featuresctrl'
		})

		.when('/howitworks',{
			templateUrl:'howitworks.html',
			controller:'howitworksctrl'
		})
})

app.controller('ctrl',function($scope,mainplg){
	$scope.message="message passing successfully"
	$scope.result=mainplg.main();
})

app.controller('mainctrl',function($scope,mainplg){
	$scope.message="Index page successfully Deployed";
	$scope.result=mainplg.main();			
})

app.controller('companyctrl',function($scope,plugin){
	$scope.result=plugin.company();

})

app.controller('howitworksctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();

})

app.controller('featuresctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();
})

app.controller('solutionctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();
})
