function inputValue()
{
	$('form input[type="text"]').each(function()
	{
		if($(this).val() === '')
		{
			$(this).val($(this).attr('placeholder'));	
		}
		else if ($(this).val() !== $(this).attr('placeholder'))
		{
			$(this).addClass('focused');
		}
		
		$(this).focus(function()
		{
			if($(this).val() == $(this).attr('placeholder'))
			{
				$(this).val('').addClass('focused');
			}
		})
		.blur(function()
		{
			if($(this).val() === '')
			{
				$(this).val($(this).attr('placeholder')).removeClass('focused');	
			}
		});
	});
	
	$('form').submit(function()
	{
		$(this).find('input[type="text"]').each(function()
		{
			if($(this).val() === $(this).attr('placeholder'))
			{
				$(this).val('');	
			}
		});
	});
}

function incCounter() {
    var fb = new Firebase("https://sol-aiderplusloin.firebaseio.com/counter/");
}
   
$(document).ready(function()
{	
	inputValue();
	incCounter();
});



jQuery('a[href^="#"]').click(function() {
	var elem = jQuery(jQuery(this).attr('href'));
	if(elem.size()>0){
		var offset = elem.offset().top;
		jQuery('html, body').animate({
	        scrollTop:offset 
	    }, 400);
	}
});
