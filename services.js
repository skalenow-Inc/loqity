var app=angular.module('serve',[]);
app.service('plugin',function(){
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

app.service('mainplg',function(){
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