(function ($) {
	'use strict';
	/*----------------------------------------*/
	/*  WOW
/*----------------------------------------*/
	new WOW().init();

	/*---------------------------------------
		Sticky Menu Activation
---------------------------------*/
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 300) {
			$('.header-sticky').addClass('sticky');
		} else {
			$('.header-sticky').removeClass('sticky');
		}
	});

	/*----------------------------------------*/
	/*  Toolbar Button
/*----------------------------------------*/
	var $overlay = $('.global-overlay');
	$('.toolbar-btn').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		var target = $this.attr('href');
		var prevTarget = $this.parent().siblings().children('.toolbar-btn').attr('href');
		$(target).toggleClass('open');
		$(prevTarget).removeClass('open');
		$($overlay).addClass('overlay-open');
	});

	/*----------------------------------------*/
	/*  Click on Documnet
	/*----------------------------------------*/
	var $body = $('.global-overlay');

	$body.on('click', function (e) {
		var $target = e.target;
		var dom = $('.main-wrapper').children();

		if (!$($target).is('.toolbar-btn') && !$($target).parents().is('.open')) {
			dom.removeClass('open');
			dom.find('.open').removeClass('open');
			$overlay.removeClass('overlay-open');
		}
	});

	/*----------------------------------------*/
	/*  Close Button Actions
	/*----------------------------------------*/
	$('.btn-close, .btn-close-2').on('click', function (e) {
		var dom = $('.main-wrapper').children();
		e.preventDefault();
		var $this = $(this);
		$this.parents('.open').removeClass('open');
		dom.find('.global-overlay').removeClass('overlay-open');
	});
	/*----------------------------------------*/
	/*  Offcanvas
	/*----------------------------------------*/
	/*Variables*/
	var $offcanvasNav = $('.offcanvas-menu, .offcanvas-minicart_menu, .offcanvas-search_menu, .mobile-menu'),
		$offcanvasNavWrap = $(
			'.offcanvas-menu_wrapper, .offcanvas-minicart_wrapper, .offcanvas-search_wrapper, .mobile-menu_wrapper'
		),
		$offcanvasNavSubMenu = $offcanvasNav.find('.sub-menu'),
		$menuToggle = $('.menu-btn'),
		$menuClose = $('.btn-close');

	/*Close Off Canvas Sub Menu*/
	$offcanvasNavSubMenu.slideUp();

	/*Category Sub Menu Toggle*/
	$offcanvasNav.on('click', 'li a, li .menu-expand', function (e) {
		var $this = $(this);
		if (
			$this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
			($this.attr('href') === '#' || $this.attr('href') === '' || $this.hasClass('menu-expand'))
		) {
			e.preventDefault();
			if ($this.siblings('ul:visible').length) {
				$this.siblings('ul').slideUp('slow');
			} else {
				$this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
				$this.closest('li').siblings('li').removeClass('menu-open');
				$this.siblings('ul').slideDown('slow');
				$this.parent().siblings().children('ul').slideUp();
			}
		}
		if ($this.is('a') || $this.is('span') || $this.attr('class').match(/\b(menu-expand)\b/)) {
			$this.parent().toggleClass('menu-open');
		} else if ($this.is('li') && $this.attr('class').match(/\b('menu-item-has-children')\b/)) {
			$this.toggleClass('menu-open');
		}
	});


	$('.btn-close').on('click', function (e) {
		e.preventDefault();
		$('.mobile-menu .sub-menu').slideUp();
		$('.mobile-menu .menu-item-has-children').removeClass('menu-open');
	})
	/*----------------------------------------*/
	/*  Nice Select
/*----------------------------------------*/
	$(document).ready(function () {
		$('.nice-select').niceSelect();
	});
	/*----------------------------------------*/
	/* Ademy's Countdown
	/*----------------------------------------*/
	// Check if element exists
	$.fn.elExists = function () {
		return this.length > 0;
	};

	function makeTimer($endDate, $this, $format) {

		var today = new Date();

		var BigDay = new Date($endDate),
			msPerDay = 24 * 60 * 60 * 1000,
			timeLeft = (BigDay.getTime() - today.getTime()),
			e_daysLeft = timeLeft / msPerDay,
			daysLeft = Math.floor(e_daysLeft),
			e_hrsLeft = (e_daysLeft - daysLeft) * 24,
			hrsLeft = Math.floor(e_hrsLeft),
			e_minsLeft = (e_hrsLeft - hrsLeft) * 60,
			minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60),
			e_secsLeft = (e_minsLeft - minsLeft) * 60,
			secsLeft = Math.floor((e_minsLeft - minsLeft) * 60);

		var yearsLeft = 0;
		var monthsLeft = 0
		var weeksLeft = 0;

		if ($format != 'short') {
			if (daysLeft > 365) {
				yearsLeft = Math.floor(daysLeft / 365);
				daysLeft = daysLeft % 365;
			}

			if (daysLeft > 30) {
				monthsLeft = Math.floor(daysLeft / 30);
				daysLeft = daysLeft % 30;
			}
			if (daysLeft > 7) {
				weeksLeft = Math.floor(daysLeft / 7);
				daysLeft = daysLeft % 7;
			}
		}

		var yearsLeft = yearsLeft < 10 ? "0" + yearsLeft : yearsLeft,
			monthsLeft = monthsLeft < 10 ? "0" + monthsLeft : monthsLeft,
			weeksLeft = weeksLeft < 10 ? "0" + weeksLeft : weeksLeft,
			daysLeft = daysLeft < 10 ? "0" + daysLeft : daysLeft,
			hrsLeft = hrsLeft < 10 ? "0" + hrsLeft : hrsLeft,
			minsLeft = minsLeft < 10 ? "0" + minsLeft : minsLeft,
			secsLeft = secsLeft < 10 ? "0" + secsLeft : secsLeft,
			yearsText = yearsLeft > 1 ? 'years' : 'year',
			monthsText = monthsLeft > 1 ? 'months' : 'month',
			weeksText = weeksLeft > 1 ? 'weeks' : 'week',
			daysText = daysLeft > 1 ? 'days' : 'day',
			hourText = hrsLeft > 1 ? 'hrs' : 'hr',
			minsText = minsLeft > 1 ? 'mins' : 'min',
			secText = secsLeft > 1 ? 'secs' : 'sec';

		var $markup = {
			wrapper: $this.find('.countdown__item'),
			year: $this.find('.yearsLeft'),
			month: $this.find('.monthsLeft'),
			week: $this.find('.weeksLeft'),
			day: $this.find('.daysLeft'),
			hour: $this.find('.hoursLeft'),
			minute: $this.find('.minsLeft'),
			second: $this.find('.secsLeft'),
			yearTxt: $this.find('.yearsText'),
			monthTxt: $this.find('.monthsText'),
			weekTxt: $this.find('.weeksText'),
			dayTxt: $this.find('.daysText'),
			hourTxt: $this.find('.hoursText'),
			minTxt: $this.find('.minsText'),
			secTxt: $this.find('.secsText')
		}

		var elNumber = $markup.wrapper.length;
		$this.addClass('item-' + elNumber);
		$($markup.year).html(yearsLeft);
		$($markup.yearTxt).html(yearsText);
		$($markup.month).html(monthsLeft);
		$($markup.monthTxt).html(monthsText);
		$($markup.week).html(weeksLeft);
		$($markup.weekTxt).html(weeksText);
		$($markup.day).html(daysLeft);
		$($markup.dayTxt).html(daysText);
		$($markup.hour).html(hrsLeft);
		$($markup.hourTxt).html(hourText);
		$($markup.minute).html(minsLeft);
		$($markup.minTxt).html(minsText);
		$($markup.second).html(secsLeft);
		$($markup.secTxt).html(secText);
	}

	if ($('.countdown').elExists) {
		$('.countdown').each(function () {
			var $this = $(this);
			var $endDate = $(this).data('countdown');
			var $format = $(this).data('format');
			setInterval(function () {
				makeTimer($endDate, $this, $format);
			}, 0);
		});
	}

	/*----------------------------------------*/
	/*  Cart Plus Minus Button
	/*----------------------------------------*/
	$('.cart-plus-minus').append(
		'<div class="dec qtybutton"><i class="zmdi zmdi-chevron-down"></i></div><div class="inc qtybutton"><i class="zmdi zmdi-chevron-up"></i></div>'
	);
	$('.qtybutton').on('click', function () {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 1) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 1;
			}
		}
		$button.parent().find('input').val(newVal);
	});

	/*---------------------------------------------*/
	/*  Ademy's CounterUp
	/*----------------------------------------------*/
	$('.count').counterUp({
		delay: 10,
		time: 1000
	});

	/*----------------------------------------*/
	/*  Slick Carousel
	/*----------------------------------------*/
	var $html = $('html');
	var $body = $('body');
	var $elementCarousel = $('.ademy-element-carousel');
	// Check if element exists
	$.fn.elExists = function () {
		return this.length > 0;
	};

	/*For RTL*/
	if ($html.attr('dir') == 'rtl' || $body.attr('dir') == 'rtl') {
		$elementCarousel.attr('dir', 'rtl');
	}

	if ($elementCarousel.elExists()) {
		var slickInstances = [];

		/*For RTL*/
		if ($html.attr('dir') == 'rtl' || $body.attr('dir') == 'rtl') {
			$elementCarousel.attr('dir', 'rtl');
		}

		$elementCarousel.each(function (index, element) {
			var $this = $(this);

			// Carousel Options

			var $options = typeof $this.data('slick-options') !== 'undefined' ? $this.data('slick-options') : '';

			var $spaceBetween = $options.spaceBetween ? parseInt($options.spaceBetween, 10) : 0,
				$spaceBetween_xl = $options.spaceBetween_xl ? parseInt($options.spaceBetween_xl, 10) : 0,
				$rowSpace = $options.rowSpace ? parseInt($options.rowSpace, 10) : 0,
				$rows = $options.rows ? $options.rows : false,
				$vertical = $options.vertical ? $options.vertical : false,
				$focusOnSelect = $options.focusOnSelect ? $options.focusOnSelect : false,
				$pauseOnHover = $options.pauseOnHover ? $options.pauseOnHover : false,
				$pauseOnFocus = $options.pauseOnFocus ? $options.pauseOnFocus : false,
				$asNavFor = $options.asNavFor ? $options.asNavFor : '',
				$fade = $options.fade ? $options.fade : false,
				$autoplay = $options.autoplay ? $options.autoplay : false,
				$autoplaySpeed = $options.autoplaySpeed ? parseInt($options.autoplaySpeed, 10) : 5000,
				$swipe = $options.swipe ? $options.swipe : true,
				$swipeToSlide = $options.swipeToSlide ? $options.swipeToSlide : true,
				$touchMove = $options.touchMove ? $options.touchMove : false,
				$verticalSwiping = $options.verticalSwiping ? $options.verticalSwiping : true,
				$draggable = $options.draggable ? $options.draggable : true,
				$arrows = $options.arrows ? $options.arrows : false,
				$dots = $options.dots ? $options.dots : false,
				$adaptiveHeight = $options.adaptiveHeight ? $options.adaptiveHeight : true,
				$infinite = $options.infinite ? $options.infinite : false,
				$centerMode = $options.centerMode ? $options.centerMode : false,
				$centerPadding = $options.centerPadding ? $options.centerPadding : '',
				$variableWidth = $options.variableWidth ? $options.variableWidth : false,
				$speed = $options.speed ? parseInt($options.speed, 10) : 500,
				$appendArrows = $options.appendArrows ? $options.appendArrows : $this,
				$prevArrow =
				$arrows === true ?
				$options.prevArrow ?
				'<span class="' +
				$options.prevArrow.buttonClass +
				'"><i class="' +
				$options.prevArrow.iconClass +
				'"></i></span>' :
				'<button class="tty-slick-text-btn tty-slick-text-prev"><i class="ion-ios-arrow-left"></i></span>' :
				'',
				$nextArrow =
				$arrows === true ?
				$options.nextArrow ?
				'<span class="' +
				$options.nextArrow.buttonClass +
				'"><i class="' +
				$options.nextArrow.iconClass +
				'"></i></span>' :
				'<button class="tty-slick-text-btn tty-slick-text-next"><i class="ion-ios-arrow-right"></i></span>' :
				'',
				$rows = $options.rows ? parseInt($options.rows, 10) : 1,
				$rtl = $options.rtl || $html.attr('dir="rtl"') || $body.attr('dir="rtl"') ? true : false,
				$slidesToShow = $options.slidesToShow ? parseInt($options.slidesToShow, 10) : 1,
				$slidesToScroll = $options.slidesToScroll ? parseInt($options.slidesToScroll, 10) : 1;

			/*Responsive Variable, Array & Loops*/
			var $responsiveSetting =
				typeof $this.data('slick-responsive') !== 'undefined' ? $this.data('slick-responsive') : '',
				$responsiveSettingLength = $responsiveSetting.length,
				$responsiveArray = [];
			for (var i = 0; i < $responsiveSettingLength; i++) {
				$responsiveArray[i] = $responsiveSetting[i];
			}

			// Adding Class to instances
			$this.addClass('slick-carousel-' + index);
			$this.parent().find('.slick-dots').addClass('dots-' + index);
			$this.parent().find('.slick-btn').addClass('btn-' + index);

			if ($spaceBetween != 0) {
				$this.addClass('slick-gutter-' + $spaceBetween);
			}
			if ($spaceBetween_xl != 0) {
				$this.addClass('slick-gutter-xl-' + $spaceBetween_xl);
			}
			var $slideCount = null;
			$this.on('init', function (event, slick) {
				$this.find('.slick-active').first().addClass('first-active');
				$this.find('.slick-active').last().addClass('last-active');
				$slideCount = slick.slideCount;
				if ($slideCount <= $slidesToShow) {
					$this.children('.slick-dots').hide();
				}
				var $firstAnimatingElements = $('.slick-slide').find('[data-animation]');
				doAnimations($firstAnimatingElements);
			});

			$this.slick({
				slidesToShow: $slidesToShow,
				slidesToScroll: $slidesToScroll,
				asNavFor: $asNavFor,
				autoplay: $autoplay,
				autoplaySpeed: $autoplaySpeed,
				speed: $speed,
				infinite: $infinite,
				rows: $rows,
				arrows: $arrows,
				dots: $dots,
				adaptiveHeight: $adaptiveHeight,
				vertical: $vertical,
				focusOnSelect: $focusOnSelect,
				pauseOnHover: $pauseOnHover,
				pauseOnFocus: $pauseOnFocus,
				centerMode: $centerMode,
				centerPadding: $centerPadding,
				variableWidth: $variableWidth,
				swipe: $swipe,
				swipeToSlide: $swipeToSlide,
				touchMove: $touchMove,
				draggable: $draggable,
				fade: $fade,
				appendArrows: $appendArrows,
				prevArrow: $prevArrow,
				nextArrow: $nextArrow,
				rtl: $rtl,
				customPaging: function (slider, i) {
					var thumb = $(slider.$slides[i]).data();
					var number = i + 1;
					if (number < 10) {
						return '<button type="button" class="dot">' + '0' + number + '</button>';
					}
					return '<button type="button" class="dot">' + number + '</button>';
				},
				responsive: $responsiveArray
			});

			$this.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
				$this.find('.slick-active').first().removeClass('first-active');
				$this.find('.slick-active').last().removeClass('last-active');
				var $animatingElements = $('.slick-slide[data-slick-index="' + nextSlide + '"]').find(
					'[data-animation]'
				);
				doAnimations($animatingElements);
			});

			function doAnimations(elements) {
				var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
				elements.each(function () {
					var $el = $(this);
					var $animationDelay = $el.data('delay');
					var $animationDuration = $el.data('duration');
					var $animationType = 'animated ' + $el.data('animation');
					$el.css({
						'animation-delay': $animationDelay,
						'animation-duration': $animationDuration
					});
					$el.addClass($animationType).one(animationEndEvents, function () {
						$el.removeClass($animationType);
					});
				});
			}

			$this.on('afterChange', function (e, slick) {
				$this.find('.slick-active').first().addClass('first-active');
				$this.find('.slick-active').last().addClass('last-active');
			});

			// Updating the sliders in tab
			$('body').on('shown.bs.tab', 'a[data-toggle="tab"], a[data-toggle="pill"]', function (e) {
				$this.slick('setPosition');
			});
		});
		// Added mousewheel for specific slider
		$('.single-blog_slider, .mousewheel-slider').on('wheel', function (e) {
			e.preventDefault();

			if (e.originalEvent.deltaY < 0) {
				$(this).slick('slickNext');
			} else {
				$(this).slick('slickPrev');
			}
		});
	}

	/*----------------------------------------*/
	/*  Offcanvas Inner Nav
/*----------------------------------------*/
	$('.offcanvas-inner_nav li.has-sub > a').on('click', function () {
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		} else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});

	/*--------------------------------
    Scroll To Top
-------------------------------- */
	function scrollToTop() {
		var $scrollUp = $('.scroll-to-top'),
			$lastScrollTop = 0,
			$window = $(window);

		$window.on('scroll', function () {
			var topPos = $(this).scrollTop();
			if (topPos > $lastScrollTop) {
				$scrollUp.removeClass('show');
			} else {
				if ($window.scrollTop() > 200) {
					$scrollUp.addClass('show');
				} else {
					$scrollUp.removeClass('show');
				}
			}
			$lastScrollTop = topPos;
		});

		$scrollUp.on('click', function (evt) {
			$('html, body').animate({
				scrollTop: 0
			}, 600);
			evt.preventDefault();
		});
	}

	scrollToTop();

	/*------------------------------------
	    Magnific Popup
	    ------------------------------------- */
	$('.popup-vimeo').magnificPopup({
		type: 'iframe',
		disableOn: function () {
			if ($(window).width() < 600) {
				return false;
			}
			return true;
		}
	});
	/*------------------------------------
	    datetimepicker
	    ------------------------------------- */
	jQuery('#datetimepicker').datetimepicker();

	/*------------------------------------
	    Progress Bar Effect
	    ------------------------------------- */
    $(window).on('scroll', function () {
        function winScrollPosition() {
            var scrollPos = $(window).scrollTop(),
                winHeight = $(window).height();
            var scrollPosition = Math.round(scrollPos + (winHeight / 1.2));
            return scrollPosition;
        }
        var trigger = $('.progress-bar');
        if (trigger.length) {
            var triggerPos = Math.round(trigger.offset().top);
            if (triggerPos < winScrollPosition()) {
                trigger.each(function () {
                    $(this).addClass('fill');
                });
            }
        }
	});
	
	/*-----------------------
        Search Box 
    ------------------------- */
    $('.search-btn').on('click', function(e) {
        e.preventDefault();
		$('.search-body').slideToggle();
	})

})(jQuery);
