
$(document).ready(function()
      {
         $("#collapse-nav").click(function()
         {
            console.log("click");
            $("html").toggleClass("custom-scroll sidebar-left-collapsed");
         });
         
      });

app.constant('config', {
	apiUrl: 'http://127.0.0.1:8500/',
	baseUrl: '/',
	enableDebug: true,
});


app.config(['$cookiesProvider', function($cookiesProvider) {
	$cookiesProvider.defaults.path = '/';
}]);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
app.run(function ($http, $window, config,$cookies) {
	var token = $cookies.get("access_token");

	if (token != undefined || token !=null) 
	{
		$http.defaults.headers.common.Authorization = token;
		$http.get(config.apiUrl + "session").then(function (result) {
			if (!result.data.status) 
			{
				alert("Please Login to Continue");
				$cookies.remove("access_token");
				$window.location = "/";
			}
			else
			{
				var d = new Date();
				d.setDate(d.getDate()+30);
				$cookies.put("access_token",token,{"expires":new Date(d)});
			}
		});

	}
});

app.directive('footer', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/users/footer",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});

app.directive('header', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "partials/header.phtml",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    }
});

app.controller("appCtrl", function ($http, $scope, config,$window,$location,$cookies) {
	$http.get(config.apiUrl +"profile").then(function(result)
	{
		$scope.profile= result.data;
	},
	function(result)
	{
			if(!result.data.status)
			{
				alert("Please Login to Continue");
				$window.location = "/";
			}
	});
	$scope.logout=function()
	{
		$http.delete(config.apiUrl +"logout").then(function(result)
		{
			$cookies.remove("access_token",{ path: '/' });
			$window.location = "/";
		});
	};
});