var auto_projet = 1;
function time_projet(){
    el = '#projet-nav li.active';
    el = ($(el).next().length>0) ? $(el).next() : $('#projet-nav li:first');
    //el.trigger('click');
    valOrder = el.data('visible-order');
    switch_projet(valOrder);
}
function switch_projet(valOrder){
    $('#projet-nav li').removeClass('active');
    //console.log(valOrder);
    $('#projets div[data-order]').stop().hide().animate({
        opacity: 0
    }, 500, "linear", function() {
        //$('#projets div[data-order]').hide();
        $('#projet-nav li[data-visible-order="'+valOrder+'"]').addClass('active');

        $('#projets div[data-order="'+valOrder+'"]').stop().show().animate({
        opacity: 1});
    });
}
$(document).ready(function(){
    
    $('figcaption').css('top','600px');
    $('figure').hover(function(){
        $(this).find('figcaption').stop().animate({'top':0}, 200, function(){});
    },function(){
        $(this).find('figcaption').stop().animate({'top':$(this).parent().height()+10}, 200, function(){});
    });
    $('.burger .burger-img').click(function(){
       $('.burger .menu').toggle(); 
    });
    $('.burger span').click(function(){
       $('.burger .menu').hide(); 
    });
    $('#projet-nav li').click(function(){
        $('dd[data-magellan-arrival="projets"] a').trigger('click');
        valOrder = $(this).data('visible-order');
        switch_projet(valOrder);
        $.unrepeat();
    });
    $.repeat(10000, function(){ time_projet(); });

			/* Tracking MENU */
	                $('dd[data-magellan-arrival="video"]').click(function() {
	                   woopra.track('interaction', {
	            	    category: "MENU-VIDEO-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });
			$('dd[data-magellan-arrival="possible"]').click(function() {
	                   woopra.track('interaction', {
	            	    category: "MENU-POSSIBLE-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		        });
			$('dd[data-magellan-arrival="projets"]').click(function() {
			    woopra.track('interaction', {
			    category: "MENU-PROJETS-JME15",
			    action: "clic",
			    url: document.location.href,
			    title: document.title,
			    value: "0"
		        });
			});
    //$('#projet-nav li:first').trigger('click');
    
    
    //woopra
    
	$(".logo-sticky").click(function() {
	                   woopra.track('interaction', {
	            	    category: "RETOUR-SITE-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });

	                /* Tracking CTA sticky */
	                $("#STICKY-JME15").click(function() {
	                   woopra.track('interaction', {
	            	    category: "CTA-STICKY-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });

                    
					//$(".menu-projets").click(function() {
	                //   woopra.track('interaction', {
	            	//    category: "MENU-PROJETS-JME15",
	        	    //    action: "clic",
	        	    //    url: document.location.href,
	        	    //    title: document.title,
	        	    //    value: "0"
	    	        //    });
		            //});

					$("#CTA1-textJME15").click(function() {
	                   woopra.track('interaction', {
	            	    category: "CTA-text-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });
					$(".video-link").click(function() {
	                   woopra.track('interaction', {
	            	    category: "VIDEO-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });
					$("#don-1").click(function() {
	                   woopra.track('interaction', {
	            	    category: "CTA-GRILLE-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: $("#don-1 .value-don").html()
	    	            });
		            });
                    $("#don-2").click(function() {
                       woopra.track('interaction', {
	            	    category: "CTA-GRILLE-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: $("#don-2 .value-don").html()
	    	            });
		            });
	                $(".BTN-GP-AUTRE-P1-JME15").click(function() {
	                   woopra.track('interaction', {
	                    category: "CTA-GRILLE-JME15",
	        	        action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });
	                $(".CTA2-TextJME15").click(function() {
	                   woopra.track('interaction', {
	                    category: "CTA-POSSIBLE-TEXTE-JME15",
	                    action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });
	                $(".CTA3-BTN-JME15").click(function() {
	                   woopra.track('interaction', {
	                    category: "CTA-POSSIBLE-BOUTON-JME15",
	                    action: "clic",
	                    url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });
	               $('#CTA4-EQUI-JME15-68').on('click', function( event ) {
                       event.preventDefault();
                       woopra.track('interaction', {category:"CTA-PROJETS-JME15",action:"clic",value:"68",url:document.location.href,title: document.title});window.open($(this).attr('href'), '_blank');
                       return false;
                       
                   });
                  $("#CTA4-EQUI-JME15-111").on('click', function( event ) {
                      event.preventDefault();
                      woopra.track('interaction', {category:"CTA-PROJETS-JME15",action:"clic",value:"111",url:document.location.href,title: document.title});window.open($(this).attr('href'), '_blank');
                      return false;
                  });
                  $("#CTA4-EQUI-JME15-140").on('click', function( event ) {
                      event.preventDefault();
                      woopra.track('interaction', {category:"CTA-PROJETS-JME15",action:"clic",value:"140",url:document.location.href,title: document.title});window.open($(this).attr('href'), '_blank');
                      return false;
                      
                  });
	                $(".CTA-FOOTER-JME15").click(function() {
	                   woopra.track('interaction', {
	                    category: "CTA-FOOTER-JME15",
	                    action: "clic",
	        	        url: document.location.href,
	        	        title: document.title,
	        	        value: "0"
	    	            });
		            });

});