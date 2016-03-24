// Global namespace
var Pages = Pages || {};


/* ================================
 * Methods
 * ================================ */

Pages.landing = function() {
	'use strict';

	var _ = this,
		tlLanding 	= new TimelineMax({ paused : true }),
		preload = new createjs.LoadQueue(true);

	_.init = function() {
		'use strict';

		if( $window.width() <= 480 ) return;

		var $content 	= $('.main-content'),
			$loader 	= $('.loader'),
			$logo 		= $content.find('.main-logo'),
			$presente 	= $content.find('.presente'),
			$hashtag 	= $content.find('.hashtag');

		var stage = new swiffy.Stage(document.getElementById('swiffycontainer'), swiffyobject, {});
	  	stage.setBackground(null);
	  	stage.start();
	  	stage.pause();

	  	_.loadAssets();

	  	//tlLanding.duration(9);

		// init timeline landing (loader)
		tlLanding 	.set($content, { display : 'block' })
					.set($content.find('.desc, .subtitle, .container-water, .btn'), { autoAlpha : 0 })
					.from($logo, 0.4, { autoAlpha : 0, y : -50 })
					.from($presente, 0.5, { autoAlpha : 0, y : -30 }, '+=0.2')
					.staggerFromTo($loader.find('p, .btn'), 0.4, {y : -20, autoAlpha : 0 }, {y : 0, autoAlpha : 1 }, 0.1, '-=0.2')
					.to($presente, 0.4, { autoAlpha : 0, y : 20 }, '+=0.1')
					.from($hashtag, 0.5, { autoAlpha : 0, onStart : function() { stage.start(); } }, '+=0.3')
					.add(function() {
						if( preload.progress == 1 ) {
							Utils.hasMethod('step1', 'init');
						}
					}, '+=7');

		setTimeout(function() {
			tlLanding.play();
		}, 200);
	};

	_.loadAssets = function() {
		var imgs = [ "assets/img/calm-water.png", "assets/img/stressed-water.png"/*, "assets/media/CalmBG.mp4", "assets/media/StressedBG.mp4"*/];

		preload.on("complete", loadComplete);
		preload.loadManifest(imgs);

		function loadComplete(event) {
    		if( tlLanding.time() >= tlLanding.duration() ) {
				Utils.hasMethod('step1', 'init');
			}
		};

	};
};



Pages.step1 = function() {
	var _ = this,
		tlStep1 = new TimelineMax({ paused : true, onComplete : function() {

		} }),
		$loader	 		= $('.loader'),
		$snow	 		= $('.snow'),
		$bgVideo 		= $('.video-bg'),
		$content 		= $('.main-content'),
		$subtitle 		= $content.find('.subtitle'),
		$water	 		= $content.find('.container-water'),
		$desc	 		= $content.find('.desc'),
		$btn 	 		= $content.find('.btn'),
		$logo_jme 		= $('.logo-jme'),
		$footer 		= $('.main-footer'),
		$vStressed 		= $('.video-stressed'),
		$vCalm  		= $('.video-calm'),
		$aLoading 		= $('#loading'),
		$aEndLoading	= $('#end-loading'),
		$aRevelation	= $('#revelation'),
		$aUp 			= $('#up-240');

	_.init = function() {
		var base = this;

		function addSourceToVideo(element, src, type) {
		    var source = document.createElement('source');

		    source.src = src;
		    source.type = type;

		    element.appendChild(source);
		}
		// create video calme
		$vCalm[0].autoplay = true;
		$vCalm[0].preload = true;
		$vCalm[0].loop = true;
		addSourceToVideo($vCalm[0], $vCalm.data('src'), 'video/mp4');

		// create video stressed
		$vStressed[0].preload = true;
		$vStressed[0].loop = true;
		addSourceToVideo($vStressed[0], $vStressed.data('src'), 'video/mp4');

		// callback on start animation
		tlStep1.addCallback(function() {
			$btn.on('click', function(e) {
				e.preventDefault();
				_.goTest();
			})
		}, 'onStart');

		tlStep1	.set($footer, {display : 'block' })
				.to($loader, 0.3, { autoAlpha : 0 }, 'start')
				.to($snow, 0.6, { scaleY : 0, ease : Expo.easeInOut }, 'start')
				.fromTo($logo_jme, 0.4, { scale : 0.4, autoAlpha : 0 }, { scale : 1, autoAlpha : 1 })
				.from($footer, 0.3, { y : '100%'})
				.fromTo($subtitle, 0.4, { autoAlpha : 0, y : '-40%' }, {autoAlpha : 1, y:'0%' }, '+=0.2')
				.fromTo($water, 0.7, { autoAlpha : 0, scale : 1.3 }, {autoAlpha : 1, scale : 1 }, '-=0.3')
				.fromTo($btn, 0.4, { autoAlpha : 0, y : 20 }, {autoAlpha : 1, y : 0 }, '+=0.3')
				.fromTo($desc, 0.3, { autoAlpha : 0, y : 10 }, {autoAlpha : 1, y : 0 }, '-=0.2');

		// launch step1
		setTimeout(function() {
			_.play();
		}, 200);
	};

	_.play = function() {
		$aEndLoading[0].play();

		//change song
		$aLoading.animate({ volume : 0 }, 1500, 'swing', function() {
			$aLoading[0].pause();
		});

		$aRevelation[0].play();
		$aRevelation[0].volume = 0;
		$aRevelation.animate({ volume : 1}, 1000, 'swing');

		tlStep1.play();
	};

	_.goTest = function() {

		$btn.addClass('active');

		// water
		TweenMax.set($water.find('.water'), { display : 'none' });
		TweenMax.set($water.find('.water-stressed'), { display : 'block' });

		// videos
		TweenMax.set($vCalm, { opacity : 0 });
		TweenMax.set($vStressed, { opacity : 1 });

		$vStressed[0].play();
		$vCalm[0].pause();

		// audio
		/*$aRevelation.animate({ volume : 0 }, 500, 'swing', function() {
			$aRevelation[0].pause();
		});*/
		$aUp[0].volume = 0;
		$aUp[0].play();
		$aUp.animate({ volume : 1 }, 300, 'swing');

		// redirect to quizz
		setTimeout(function() {
			window.location = '/waterquest/quiz.html';
		}, 5500);
	}
}