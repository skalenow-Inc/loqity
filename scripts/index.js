var app = angular.module("loqity",['ngRoute','ngAnimate','ngCookies'])
.constant('config', {
	apiUrl: 'http://127.0.0.1:8500/',
	baseUrl: '/',
	enableDebug: true
})
.config(function($routeProvider,$locationProvider){
	$locationProvider.html5Mode({
 	 enabled: true
 	 
	});
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

		.when('/platform',{
			templateUrl:'platform_b.html',
			controller:'platformctrl'

		})

		.when('/platform2',{
			templateUrl:'platform_a.html',
			//controller:'platformctrl'

		})


		.when('/howitworks',{
			templateUrl:'howitworks.html',
			controller:'howitworksctrl'
		})

		.when('/pricing',{
			templateUrl:'pricing_b.html',
			controller:'pricingctrl'
		})

		.when('/pricing2',{
			templateUrl:'pricing.html',
			controller:'pricing2ctrl'
		})

		.when('/pricing3',{
			templateUrl:'pricing_c.html',
			//controller:'pricing3ctrl'
		})

		.otherwise({
			redirectTo:'/'
		})




		$(".nav a").click(function () {
    if ($(".navbar-collapse").hasClass("in")) {
        $('[data-toggle="collapse"]').click();
  		  }
		});



})

.service('plugin',function(){
	this.company=function(){
			        $('.triggerAnimation').waypoint(function() {
          			  var animation = $(this).attr('data-animate');
            		$(this).css('opacity', '');
            		$(this).addClass("animated " + animation);

        			},
                	{
                    	offset: '75%',
                    	triggerOnce: true
                	}
        			);
					$('.parallax').appear(function() {
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0,
				parallaxBackgrounds: true
			});
		});
	}
})

.service('mainplg',function(){
	this.main=function(){
			var revapi;
			jQuery(document).ready(function() {
			   revapi = jQuery('.tp-banner').revolution(
				{
					delay:6000,
					startwidth:1170,
					startheight:738,
					hideThumbs:10,
					fullWidth:"on",
					forceFullWidth:"on",
					navigationType:"none",
					navigationArrows:"none",
					onHoverStop:"off"
				});

			   var slideThumb = $('.slide-thumbs');

				slideThumb.on('click', function(){
					var btn = $(this);
					revapi.revshowslide(btn.data('slide'));

				});
				revapi.bind("revolution.slide.onchange", function (e,data) {
					slideThumb.parent('li').removeClass('active');
					$('#slidethumb' + data.slideIndex).parent('li').addClass('active');
				});
		});	

			$('.parallax').appear(function() {
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0,
				parallaxBackgrounds: true
			});
		});
	}
})
.controller('ctrl',function($scope,mainplg){
	$scope.message="message passing successfully"
})

.controller('mainctrl',function($scope,mainplg){
	$scope.message="Index page successfully Deployed";
	$scope.result=mainplg.main();			
})

.controller('companyctrl',function($scope,plugin){
	$scope.result=plugin.company();

})

.controller('howitworksctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();

$(function(){
        // Check the initial Poistion of the Sticky Header
        var stickyHeaderTop = $('#stickyheader').offset().top;
 
        $(window).scroll(function(){
                if( $(window).scrollTop() > stickyHeaderTop ) {
                        $('#stickyheader').css({position: 'fixed', top: '80px'});
                        $('#stickyalias').css('display', 'block');
                } else {
                        $('#stickyheader').css({position: 'static', top: '0px'});
                        $('#stickyalias').css('display', 'none');
                }
        });
  });



// var $animation_elements = $('.animation-element');
// var $window = $(window);

// function check_if_in_view() {
//   var window_height = $window.height();
//   var window_top_position = $window.scrollTop();
//   var window_bottom_position = (window_top_position + window_height);
 
//   $.each($animation_elements, function() {
//     var $element = $(this);
//     var element_height = $element.outerHeight();
//     var element_top_position = $element.offset().top;
//     var element_bottom_position = (element_top_position + element_height);
 
//     //check to see if this current container is within viewport
//     if ((element_bottom_position >= window_top_position) &&
//         (element_top_position <= window_bottom_position)) {
//       $element.addClass('in-view');
//     } else {
//       $element.removeClass('in-view');
//     }
//   });
// }

// $window.on('scroll resize', check_if_in_view);
// $window.trigger('scroll');



// $(window).scroll(function() {
// 		$('.animation-element').each(function(){
// 		var imagePos = $(this).offset().top;
// 		var topOfWindow = $(window).scrollTop();
// 			if (imagePos < topOfWindow+400) {
// 				$(this).addClass("slideUp");
// 			}
			
// 		});

	

// 	});


$(window).scroll(function () {
    $('#object').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
            $(this).addClass("hatch");
        } else {
            $(this).removeClass("hatch");
        }
    });



$('#object2').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
            $(this).addClass("fadeIn");
        } else {
            $(this).removeClass("fadeIn");
        }
    });

$('#object3').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + 300 && imagePos + 400 > topOfWindow) {
            $(this).addClass("fadeIn2");
        } else {
            $(this).removeClass("fadeIn2");
        }
    });


$('#hiw_lap_msg').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + 200 && imagePos + 400 > topOfWindow) {
            $(this).addClass("slideDown");
        } else {
            $(this).removeClass("slideDown");
        }
    });


$('#hiw_beacon_msg').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + 200 && imagePos + 400 > topOfWindow) {
            $(this).addClass("slideDown");
        } else {
            $(this).removeClass("slideDown");
        }
    });


$('#hiw_mobile_msg').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + 200 && imagePos + 400 > topOfWindow) {
            $(this).addClass("slideLeft");
        } else {
            $(this).removeClass("slideLeft");
        }
    });


$('#circle_down1').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + 280 && imagePos + 400 > topOfWindow) {
            $(this).addClass("pulse2");
        } else {
            $(this).removeClass("pulse2");
        }
    });


$('#mobile_noti').each(function () {
        var imagePos = $(this).offset().top;
        var imageHeight = $(this).height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + 340 && imagePos + 640 > topOfWindow) {
            $(this).addClass("slideLeft");
        } else {
            $(this).removeClass("slideLeft");
        }
    });



});

})

.controller('featuresctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();
})

.controller('platformctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();
})

.controller('solutionctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();
})

.controller('pricingctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();

})

.controller('pricing2ctrl',function($scope,plugin){
	$scope.message="Index page successfully Deployed"
	$scope.result=plugin.company();

})
.controller('loginCtrl',function($scope,$http,config,$window,$cookies)
{
	$scope.Login = {};
	$scope.form_errors = false;
	var d = new Date();
	d.setDate(d.getDate()+30);
	$scope.login = function(isValid)
	{
		console.log(this.Login);
		$http.post(config.apiUrl+"login",this.Login).then(function(result)
		{
			if(!result.data.status)
			{
				$scope.form_errors = true;
				$scope.login_invalid = result.data.message;
				$scope.login_errors = result.data.data;
			}
			else
			{
				$cookies.put("access_token",result.data.token,{"expires":new Date(d)});
				$window.location = "/main";
			}
		});
	}
});

