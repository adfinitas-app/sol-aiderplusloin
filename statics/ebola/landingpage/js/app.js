$(document).foundation();


$(document).ready(function(){
	$('.slick-me').slick({
            autoplay: true,
            autoplaySpeed: 5000,
	    infinite: true,
	    pauseOnHover: false,
            arrows: true
	});
	
	/** Woopra + ga events **/
	$('.top-bar .right a.button').on('click', function( event ) {
		event.preventDefault();
		woopra.track('interaction', {category: "btn-don_eb14", action: "clic", url: document.location.href, title: document.title, value: ""});
		ga('send', 'event', 'btn-don_eb14', 'clic', document.location.href, '');
		window.open($(this).attr('href'));
		return false;
	});
	$('.header a').on('click', function( event ) {
		event.preventDefault();
		woopra.track('interaction', {category: "btn-don-barrage_eb14", action: "clic", url: document.location.href, title: document.title, value: ""});
		ga('send', 'event', 'btn-don-barrage_eb14', 'clic', document.location.href, '');		
		window.open($(this).attr('href'));
		return false;
	});
	$('.don-80 a, .btn-80').on('click', function( event ) {
		event.preventDefault();
		woopra.track('interaction', {category: "btn-don-80_eb14", action: "clic", url: document.location.href, title: document.title, value: "80"});
		ga('send', 'event', 'btn-don-80_eb14', 'clic', document.location.href, '80');
		window.open($(this).attr('href'));
		return false;
	});
	$('.don-160 a, .btn-160').on('click', function( event ) {
		event.preventDefault();
		woopra.track('interaction', {category: "btn-don-160_eb14", action: "clic", url: document.location.href, title: document.title, value: "160"});
		ga('send', 'event', 'btn-don-160_eb14', 'clic', document.location.href, '160');
		window.open($(this).attr('href'));
		return false;
	});
	$('.don-320 a, .btn-320').on('click', function( event ) {
		event.preventDefault();
		woopra.track('interaction', {category: "btn-don-320_eb14", action: "clic", url: document.location.href, title: document.title, value: "320"});
		ga('send', 'event', 'btn-don-320_eb14', 'clic', document.location.href, '320');
		window.open($(this).attr('href'));
		return false;
	});

});