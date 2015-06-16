function getDonAmount(){
    $.ajax({
		url: "https://dons.solidarites.org/api/counter/get",
		data: {"user_api":"solintapi","pwd_api":"1z@r2phb","campaigns[]":[84,85]}
	}).done(function(data, status, jqXHR){
		if (data[0] == '1'){
            var amount = data.slice(data.indexOf('|') + 1, data.length - 2);
            $('#amount_collected').html(amount ? amount : 0);
            $('#progress_don').css("width", (amount > 0 ? amount * 100 / 30000 : 0) + "%");
		}
	});
}

function header()
{var headerFixe=$('.header-fixe');$(window).scroll(function()
{if($(window).scrollTop() > $('#video_aider').offset().top - 68)
{headerFixe.fadeIn();}else{headerFixe.fadeOut();}});}

function alertOnLeave(){
	$(window).mousemove(function(e){
		$("#testcoor").html("Coordonnées Y : " + e.pageY);
		if (e.pageY <= $(window).scrollTop() + 5 && trytoleave == true){
			trytoleave = false;
			$('#news-signup').trigger("click");
		}
	});
};

$(document).ready(function(){
/*	$('#news-signup').fancybox({
        beforeShow: function(){
            $(".fancybox-skin").css("backgroundColor","white");
        }
	});
	trytoleave = true; */
	$('body').pageScroller({
			navigation: '#nav',
			scrollOffset: -67
	});
//	getDonAmount();
	header();
	$('a').click(function(){
	});
	$('#bt-entretiens').click(function(){
		$('html, body').animate({scrollTop:$($(this).attr("href")).offset().top}, 400, "swing");
    	return false;  
	});
	$('#bt-film').click(function(){
    	$('html, body').animate({scrollTop:$($(this).attr("href")).offset().top - 67}, 400, "swing");
    	return false;  
	});
	$('.clip-bt').fancybox({});
    $('.bt_donation_box').click(function(){
    $('html, body').animate({scrollTop:$($(this).attr("href")).offset().top - 68}, 400, "swing");
    	return false;  
	});
    $('.fermer').click(function(){
    		$('#temoignage1').hide(400);
    		$('#temoignage2').hide(400);    
    		$('#temoignage3').hide(400);   
     		$('#img_tem1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/sandra_color.jpg");
			$('#img_tem3').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/herve_color.jpg");
			$('#img_sep1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/s-m_color-color.jpg");
			$('#img_sep2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/m-h_color-color.jpg");
    		$('#img_tem2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/marie_color.jpg");
       return false;
    });
    
	$('#btn-temoignage2').click(function(){
		if ($("#temoignage2").css("display") == "none"){
			$('#temoignage1').hide(400);
			$('#temoignage3').hide(400);
			$('#img_tem1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/sandra_nb.jpg");
			$('#img_tem3').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/herve_nb.jpg");
			$('#img_tem2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/marie_color.jpg");
			$("#img_sep1").attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/s-m_grey-color.jpg");
			$("#img_sep2").attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/m-h_color-grey.jpg");
			$("#temoignage2").slideDown();
            $('html, body').animate({scrollTop:$('#font_middle').offset().top + $('#font_middle').height() - 68}, 400, "swing");
		}
		else {
			$('#temoignage2').hide(400);
			$('#img_tem1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/sandra_color.jpg");
			$('#img_tem3').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/herve_color.jpg");
			$('#img_sep1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/s-m_color-color.jpg");
			$('#img_sep2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/m-h_color-color.jpg");
		}
		return false;
	});
	$('#btn-temoignage1').click(function(){
		if ($("#temoignage1").css("display") == "none"){
			$('#temoignage2').hide(400);
			$('#temoignage3').hide(400);
			$('#img_tem2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/marie_nb.jpg");
			$('#img_tem3').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/herve_nb.jpg");
			$('#img_tem1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/sandra_color.jpg");
			$('#img_sep1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/s-m_color-grey.jpg");
			$('#img_sep2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/m-h_grey-grey.jpg");
			$("#temoignage1").slideDown();
            $('html, body').animate({scrollTop:$('#font_middle').offset().top + $('#font_middle').height() - 68}, 400, "swing");
		}
		else {
			$('#temoignage1').hide(400);
			$('#img_tem2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/marie_color.jpg");
			$('#img_tem3').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/herve_color.jpg");
			$('#img_sep1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/s-m_color-color.jpg");
			$('#img_sep2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/m-h_color-color.jpg");
		}
		return false;
	});
	$('#btn-temoignage3').click(function(){
		if ($("#temoignage3").css("display") == "none"){
			$('#temoignage1').hide(400);
			$('#temoignage2').hide(400);
			$('#img_tem2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/marie_nb.jpg");
			$('#img_tem1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/sandra_nb.jpg");
			$('#img_tem3').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/herve_color.jpg");
			$('#img_sep1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/s-m_grey-grey.jpg");
			$('#img_sep2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/m-h_grey-color.jpg");
			$("#temoignage3").slideDown();
            $('html, body').animate({scrollTop:$('#font_middle').offset().top + $('#font_middle').height() - 68}, 400, "swing");
		}
		else {
			$('#temoignage3').hide(400);
			$('#img_tem2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/marie_color.jpg");
			$('#img_tem1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/sandra_color.jpg");
			$('#img_sep1').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/s-m_color-color.jpg");
			$('#img_sep2').attr("src", "https://s3.amazonaws.com/heroku-adfinitas-campaign/sol-landing_page/images/m-h_color-color.jpg");
		}
		return false;
	});
//	setTimeout(alertOnLeave, 15000);
});