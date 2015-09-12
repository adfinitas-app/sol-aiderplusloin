/* ==========================================================================
 *  Default JavaScripts
 *  Copyright(c) 2009-2013
 *
 *  Author : Michaël Knauer <mknauer@vegas-deluxe.com>
============================================================================= */


var dxsJs = {
    'encoding': 'utf-8',

    'clsActive': 'active',
    'clsHover': 'hover',
    'clsEnabled': 'enabled',
    'clsDisabled': 'disabled',

    Ui: {}
};

//
//
//

;(function($, window, document, undefined) {

    var $WINDOW,
        $WRAPPER;


    /* Initialize general stuff
    ---------------------------------------------------- */
    dxsJs.Ui.init = function() {

        // Scroll to Donate
        $('.js-donate').click(function(e) {
            e.preventDefault();

            var top = $('.block-don').offset().top - 80;

            $('html, body').stop().animate({scrollTop: top}, {duration: 'slow', queue: false});
        });

        // Scroll to Top
        $('.js-top').click(function(e) {
            e.preventDefault();

            $('html, body').stop().animate({scrollTop: 0}, {duration: 'slow', queue: false});
        });

        // Sticky Menu
        dxsJs.Ui.Menu.init();

        // Launch Videos
        $('.js-video-play').click(function(e) {
            e.preventDefault();

            var $this = $(this),
                $parent = $this.parent(),
                w = $parent.width(),
                h = $parent.height(),
                video = $parent.data('vimeo');

            $parent.append('<div class="player"><iframe src="//player.vimeo.com/video/'+ video +'?color=B21914&autoplay=1" width="'+ w +'" height="'+ h +'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>');
        });

        // Testimonial
        $('.js-testimonial').click(function(e) {
            e.preventDefault();

            var $lightbox = $('.cp-testimonial'),
                $overlay = $lightbox.find('.cp-overlay'),
                $content = $lightbox.find('.cp-outer');

            $content.css('top', $WINDOW.scrollTop() + 30);

            $lightbox.fadeIn(300);
        });

        $('.cp-overlay, .cp-close').click(function(e) {
            e.preventDefault();

            var $this = $(this);

            $this.closest('.cp-lightbox').fadeOut(300);
        });
    };


    /* Sticky Menu
    ---------------------------------------------------- */
    dxsJs.Ui.Menu = {

        init: function() {
            var self = this,
                menuHeight,
                active, id, lastId;

            this.$ = {
                heading: $('.block-heading'),
                header: $('header'),
                menu:   $('.page-nav a[href^=#]')
            };

            menuHeight = this.$.header.outerHeight();

            // Menu
            this.$.menu.click(function(e) {
                var href = $(this).attr('href'),
                    offset = $(href).offset().top - menuHeight + 'px';

                $('html, body').stop().animate({scrollTop: offset}, {duration: 1000, queue: false});

                e.preventDefault();
            });

            // Active class while scrolling
            this.$.blocks = this.$.menu.map(function() {
                var $elm = $($(this).attr('href'));

                if ($elm.length)
                    return $elm;
            });

            $WINDOW.scroll(function() {
                var menuTop = self.$.heading.outerHeight() - menuHeight,
                    scrollTop = $(this).scrollTop();
                    fromTop = scrollTop + menuHeight + 80;

                if (menuTop < scrollTop) {
                    $('body').addClass('affix');
                } else {
                    $('body').removeClass('affix');
                }

                active = self.$.blocks.map(function() {
                    if ($(this).offset().top < fromTop)
                        return this;
                });

                active = active[active.length - 1];
                id = active && active.length ? active[0].id : '';

                if (lastId !== id) {
                    lastId = id;
                    self.$.menu.parent().removeClass(dxsJs.clsActive).end().filter('[href=#'+ id +']').parent().addClass(dxsJs.clsActive);
                }
            });
        }
    };
    



    //
    //
    //

    /* DOCUMENT READY
    ---------------------------------------------------- */
	$(function() {

		$WINDOW = $(window),
        $WRAPPER = $('.page-wrapper');

        // Init general stuff
        dxsJs.Ui.init();

	});

}) (jQuery, window, document);
