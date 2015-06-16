$(document).ready(function(){
	/** Woopra + ga events **/
	$('.don').on('click', function( event ) {
		event.preventDefault();
		woopra.track('interaction', {category: "btn-don-blog_eb14", action: "clic", url: document.location.href, title: document.title, value: ""});
		ga('send', 'event', 'btn-don-blog_eb14', 'clic', document.location.href, '');
		window.open($(this).attr('href'));
		return false;
	});

});