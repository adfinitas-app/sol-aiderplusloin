
function depliantExemples () {
	var lienSavPlus = $('.liste-exemples .lien-sav-plus');
	var encartDetails = $('.encart-details');
	
	lienSavPlus.click(function () {	
		if ( $(this).hasClass('actif') ) {
			encartDetails.slideUp('slow');
			lienSavPlus.removeClass('actif');	
			$('.depliant',this).empty().html('+');	
			return false;
		}
		var nomBloc = $(this).attr('id');
		encartDetails.slideUp('slow');
		lienSavPlus.removeClass('actif');	
		$('.liste-exemples .lien-sav-plus .depliant').empty().html('+');	
		
		$('.encart-details#' + nomBloc).slideDown("slow");
		console.log('.encart-details#' + nomBloc);
		$(this).addClass('actif');	
		$('.depliant',this).empty().html('-');	
		
		return false;
	});  	
}

function boutonsArrondis () {
		
	$('.bt-navig').click(function () {	
		var nomDiv = $(this).attr('href');	
		var positionDiv = $(nomDiv).offset() ;
		$('html,body').animate({scrollTop: (positionDiv.top - 55)}, 700);
		return false;
	});  	
	
}

function compteur () {
	
	var bdDons = $('.bandeau-dons');
	var toph = $('header').height();
	
	$(window).scroll(function()
	{			
		if($(window).scrollTop() >= parseInt(600))
		{
			bdDons.css('position','fixed');
			bdDons.css('top',0);
			bdDons.addClass('fixed');
		} else {
			bdDons.css('position','relative');
			bdDons.removeClass('fixed');
		}
	});

		
}

   
$(document).ready(function() {		
	depliantExemples();		
	boutonsArrondis();	
	compteur();	

});




