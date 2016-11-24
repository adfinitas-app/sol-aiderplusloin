// Global namespace
var Utils = Utils || {};

/**
 * Check if a method exist and launch it
 * @param  {string}   method Method called
 * @param  {string}   page   Global object
 * @return {function}
 */
Utils.hasMethod = function(page, method) {
	'use strict';

	// Console.log() styles
	var styles = {
		msg: 'color: #00009f;',
		error: 'color: #f00;'
	};

	// Special method for the homepage
	page = page.length ? Utils.camelCase(page) : 'home';
	method = method.length ? Utils.camelCase(method) : 'init';
	var Page = Pages[page];

	try {
		throw new Page();
	} catch (e) {
		console.log('%cPage: Pages.' + page, styles.msg);
		if (e instanceof Error) console.log('%c' + e, styles.error);
		var Method = e[method];
		try {
			console.log('%cMethod: Pages.' + page + '.' + method, styles.msg);
			throw Method();
		} catch (i) {
			if (i instanceof Error) console.log('%c' + i, styles.error);
			return i;
		}
	}
};


/**
 * Convert a kebab-case string into a camelCase one
 * @param  {string} string The string to convert
 * @return {string}        The camelCased string
 */
Utils.camelCase = function(string) {
	'use strict';

	return string.toLowerCase().replace(/-(.)/g, function(match, group) {
		return group.toUpperCase();
	});
};


/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param  {number}    wait       Timer
 * @param  {boolean}   immediate  Launch the function immediately
 * @param  {function}  func       The function that needs debounce
 * @return {function}             A function to bind to the event debounced
 */
Utils.debounce = function(wait, immediate, func) {
	'use strict';

	var timeout;

	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};





/**
 * Check for desired state at intervals
 * @param  {function} fn       [description]
 * @param  {function} callback [description]
 * @param  {function} errback
 * @param  {number}   timeout
 * @param  {number}   interval [description]
 */
Utils.poll = function(fn, callback, errback, timeout, interval) {
	'use strict';

	var endTime = Number(new Date()) + (timeout || 2000);
	interval = interval || 100;

	(function p() {
		// If the condition is met, we're done!
		if (fn()) {
			callback();
		}
		// If the condition isn't met but the timeout hasn't elapsed, go again
		else if (Number(new Date()) < endTime) {
			setTimeout(p, interval);
		}
		// Didn't match and too much time, reject!
		else {
			errback(new Error('timed out for ' + fn + ': ' + arguments));
		}
	})();
};

/**
 * Usage: ensure element is visible
 *
 *	Utils.poll(
 *		function() {
 *			return document.getElementById('lightbox').offsetWidth > 0;
 *		},
 *		function() {
 *			// Done, success callback
 *		},
 *		function() {
 *			// Error, failure callback
 *		}
 *	);
 */







/**
 * Print a tooltip with the image size (useful for bLazy breakpoints)
 * @param  {string}  	selector 	The targetted images
 * @param  {string} 	events   	window events to re-calc sizes
 */
Utils.getSize = function(elements, events) {
	'use strict';

	var $window = $(window),
			$elements = $(elements),
			$styles = $('<style>tlt{z-index:9999;position:absolute;top:0.5em;left:0.5em;display:block;padding:0.5em 0.75em;font:1em/1 sans-serif;color:#fff;background:#00f;border-radius:3px;}</style>'),
			events = events ? events + ' resize' : 'resize',
			array = [];

	var calc = function() {
		$elements.each(function(i, e) {
			var $this  = $(this),
					width  = $this.outerWidth(),
					height = $this.outerHeight();
			array[i].html(width + 'x' + height);
		});
	};

	var debounce = Utils.debounce(300, false, calc);

	this.init = function() {
		$styles.appendTo('head');
		for (var i = 0; i < $elements.length; i++) {
			array.push($('<tlt/>'));
			array[i].appendTo($elements[i].parentNode)
		}
		calc();
		$window.on(events, debounce);
	};

	this.kill = function() {
		$window.off(events, debounce);
		$styles.remove();
		for (var i = 0; i < array.length; i++) {
			array[i].remove();
		}
		console.log('Utils.getSize has been killed');
		return;
	};

	this.init();

	return this;
};



/**
 * Animate scroll for anchor links
 * @return {void}
 */
Utils.smoothScroll = function() {
	'use strict';

	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var $target = $(this.hash);
		if ($target.length) {
			$('html, body').animate({ scrollTop: $target.offset().top }, 1000, 'easeInOutExpo');
			return false;
		}
	}
};



/**
 * Small social sharer function to avoid loading
 * external scripts for such a simple action
 * Usage : $('a').on('click', Utils.share);
 * @return {false}
 */
Utils.share = function() {

	var $this = $(this);
	var o = {
		type  : $this.data('type'),
		url   : $this.data('url'),
		title : $this.data('title'),
		msg   : $this.data('msg'),
		img   : $this.data('img')
	};

	var s = {
		w : screen.availWidth/2 || screen.width/2,
		h : screen.availHeight/2 || screen.height/2
	};

	var types = {
		facebook: {
			url: 'http://www.facebook.com/sharer.php?s=100&[title]=' + o.titre + '&p[summary]=' + o.msg + '&p[url]=' + o.url + '&p[images][1]=' + o.img,
			name: 'Facebook',
			features: 'toolbar=0,status=0,width=580,height=607,top='+ (s.h-310) +',left='+ (s.w-290)
		},
		twitter: {
			url: 'http://twitter.com/intent/tweet?text=' + encodeURIComponent(o.msg),
			name: 'Twitter',
			features : 'scrollbars=yes,width=600,height=253,top='+ (s.h-135) +',left='+ (s.w-300)
		},
		pinterest: {
			url: 'http://pinterest.com/pin/create/button/?url=' + o.url + '&amp;media=' + o.img + '&amp;description=' + o.title,
			name: 'Pinterest',
			features: 'scrollbars=yes,width=760,height=520,top='+ (s.h-265) +',left='+ (s.w-380)
		}
	};

	var url = types[o.type].url;
	var name = types[o.type].name;
	var features = types[o.type].features;
	var popup = window.open(url, name, features)
	popup.focus();
	return false;
};