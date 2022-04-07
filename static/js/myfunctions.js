function resetLiActive() {
	$('.nav-link').each(function() {
		$(this).parent().removeClass("active");
  });
}

function goToSection(idSection) {
	resetLiActive();
	
	$('html,body').animate({
        scrollTop: $("#"+idSection).offset().top+1},
        1000);
	//$('.icon-close2').click();
}

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$.fn.isFocused = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  var viewMiddle = (viewportBottom + viewportTop)/2;

  return elementBottom > viewMiddle && elementTop < viewMiddle;
};

var countNumbers = function(){
	$('.count').each(function() {
		$(this).prop('Counter',0).animate({
			Counter: $(this).text()
		}, {
			duration: 2000 + Math.floor(Math.random() * Math.floor(3000)),
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	  });
}

var countViewed = 0;
var prevScrollpos = window.pageYOffset;
$(window).on('resize scroll', function() {
  $('.site-section').each(function() {
    var activeSection = $(this).attr('id');
    if ($(this).isFocused()) {
      $('header #menu-' + activeSection).addClass('active');
    } else {
      $('header #menu-' + activeSection).removeClass('active');
    }
  });
  
  if (!countViewed)
	  $('.count').each(function() {
		if ($(this).isInViewport()) {
			if (!countViewed)
				countNumbers();
			countViewed = true;
		}
	  });
	  
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos >= currentScrollPos) {
	$('header').css('top', 0);
  } else {
	$('header').css('top', '-200px');
  }
  prevScrollpos = currentScrollPos;
  
});