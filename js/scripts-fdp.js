;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
//	var navigation = '<ul class="nav-teritary"><li><a href="#">Maison</a></li><li><a href="#">Shopping</a></li><li><a href="#">Gourmand</a></li><li><a href="#">Innovation</a></li></ul>';
	var sliderArrows = '<a href="#" class="slider-prev"/><a href="#" class="slider-next"/>';
	var pentagonFirst = '<svg width="354" height="354" viewBox="-1 0 101 100"><defs><clipPath id="shape';
	var pentagonSecond = '"><path d="M20,0 L80,0 L100,60 L50,100 L0,60z" /></clipPath></defs>';
	var num = 1;
	var searchPlaceholder = $('html').attr('lang') === 'fr' ? 'Recherche, produit, exposant...' : 'Search, products, exhibitors…';
	var player;
	
	$('.gsf-input-line input').attr('placeholder', searchPlaceholder);
	$('body').addClass('loaded');
	
	

	//Homepage big slider 
	function initSlider($selector) {
		var $clone = $selector.find('.cxp-swiper').clone();

		$selector.find('.cxp-swiper').detach();

		$selector.append($clone);

		var $selector = $selector.find('.cxp-swiper');

		$selector.find('.slider-content').carouFredSel({
			items: {
				visible: 1
			},
			auto: 5000,
			width: '100%',
			responsive: true,
			scroll:{
				fx: 'crossfade',
				onBefore: function(data) {
					data.items.visible.addClass('faded');
				},
				onAfter: function(data) {
					data.items.visible.removeClass('faded');
				}
			},
			swipe: {
				options: {
					excludedElements: "button, input, select, textarea, .noSwipe"
				},
				onTouch: true,
				onMouse: false
			},
			pagination: {
				container: $selector.find('.slider-pagin')
			}
		});

		$win.on('resize', function(){
			fixFullHeight($('.block-page.list-articles .la-item'));
		});
	}

	function shapes($selector, pentagonIndx, squareIndx) {
		$selector
			.children()
			.addClass('shapes');

		$selector.find('.shapes:nth-child(' + pentagonIndx + ')').each(function(){
			var imageSrc = $('img', this).attr('src');
			var image = '<image clip-path="url(#shape' + (num) + ')" xlink:href="' + imageSrc + '" width="100%" height="100%"></image></svg>';

			if ($('> a', this).length) {
				$('> a', this).prepend(pentagonFirst + (num++) + pentagonSecond + image);
			} else {
				$(this).prepend(pentagonFirst + (num++) + pentagonSecond + image);
			}
		});

		$selector
			.find('.shapes:nth-child(' + squareIndx + ')')
			.addClass('square');

		$selector
			.find('.square img')
			.wrap('<div class="shape"/>');
	}

	//Home lemag slider inits
	function initSliderSec($selector) {
		$selector
			.closest('.lemag')
			.find('.list-grids-with-pagin')
			.append('<div class="slider-holder"><div class="slider-paging"/></div>');

		//Shapes
		shapes($selector, 1, 2);

		$selector.carouFredSel({
			items: 1,
			auto: 5000,
			width: '100%',
			responsive: true,
			scroll : {
	           easing: "quadratic",
	           duration: 1000,
	           pauseOnHover: true
	       },
			       
			       
//			scroll: {
//				fx: 'crossfade'
//			},
			swipe: {
				options: {
					excludedElements: "button, input, select, textarea, .noSwipe"
				},
				onTouch: true,
				onMouse: false
			},
			pagination: {
				container: $selector.closest('.lemag').find('.slider-paging')
			}
		});

		$selector
			.closest('.lemag')
			.find('.slider-holder')
			.append('<a href="/Le-Mag/" class="link-secondary">Accéder au Mag...</a>');
	}

	function fixHeight($selector) {
		var newHeight = $selector.find('img').height();

		$selector.find('.caroufredsel_wrapper').height(newHeight);
	}

	//Scroll down to content aimation
	function scrollTo($selector) {
		var trgt = $selector.attr('href');

		$('html, body').animate({
			scrollTop: $(trgt).offset().top - 72
		}, 1000);
	}

//	function addNav($selector) {
//		$selector.find('.main-title-with-link').after(navigation);
//	}

	//Slider 3d 
	function fixNext(data) {
		data
			.items
			.visible
			.parent()
			.find('.roundabout:first-child')
			.addClass('last-left')
			.siblings()
			.removeClass('last-left');

		data
			.items
			.visible
			.parent()
			.find('.last-right')
			.next('.roundabout')
			.addClass('last-right')
			.siblings()
			.removeClass('last-right');

		data
			.items
			.visible
			.parent()
			.find('.center')
			.next('.roundabout')
			.addClass('center')
			.siblings()
			.removeClass('center');
	}

	function fixPrev(data) {
		data
			.items
			.visible
			.parent()
			.find('.roundabout:last-child')
			.addClass('last-left')
			.siblings()
			.removeClass('last-left');

		data
			.items
			.visible
			.parent()
			.find('.last-right')
			.prev('.roundabout')
			.addClass('last-right')
			.siblings()
			.removeClass('last-right');

		data
			.items
			.visible
			.parent()
			.find('.center')
			.prev('.roundabout')
			.addClass('center')
			.siblings()
			.removeClass('center');
	}

	//slider 3d initis
	function initRoundaboutSlider($selector) {
		$selector.children().addClass('roundabout');

		$selector.css('transform', '');

		var itemsNum = $selector.find('.roundabout').length;

		if (itemsNum < 5) {
			for (itemsNum; itemsNum < 5; itemsNum++) {
				var $clone = $selector.find('.roundabout:nth-last-child(2)').clone();
				
				$selector.append($clone);
			};
		}

		$selector
			.parent()
			.append(sliderArrows);

		$selector
			.find('.roundabout:nth-child(2)')
			.addClass('center');

		$selector.each( function (){
			
		$(this).carouFredSel({
			width: '100%',
			items: {
				visible: 3,
				width: '285'
			},
			prev: {
				button: $(this).parent().find('.slider-prev'),
				onBefore: function(data) {
					fixPrev(data);
				}
			},
			next: {
				button: $(this).parent().find('.slider-next'),
			},
			scroll: {
				items: 1,
				onBefore: function(data) {
					fixNext(data);
				}
			},
			swipe: {
				options: {
					excludedElements: "button, input, select, textarea, .noSwipe"
				},
				onTouch: true
			},
			auto: 6000,
			onCreate: function(data) {
				data
					.items
					.parent()
					.find('.roundabout:last-child')
					.addClass('last-left');

				data
					.items
					.parent()
					.find('.roundabout:nth-child(4)')
					.addClass('last-right');
			}
		});

		$(this).find('.roundabout').on('click', function(e){
			if (!$(this).hasClass('center')) {
				e.preventDefault();

				var indx = $(this).index();

				if (indx < 1) {
					$(this).trigger('slideTo', 'prev');
				} else {
					$(this).trigger('slideTo', [$(this), -1]);
				}

			}
		});
	})

		
	}

	//Counter
	function eventDays($element) {
		var date = new Date();
		var eventDate = new Date($element.data('date'));
		var timeDiff = Math.abs(date.getTime() - eventDate.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		var prefix = $element.data('prefix') || 'j-';
		$element.text(prefix + diffDays);
	};

	//Slider in html order
	function fixItems($selector) {
		var $cloneLast = $selector.find('.gla-item:last-child').clone();
		
		$selector.prepend($cloneLast);
	}

	function fixBG($selector) {
		$selector.each(function(){
			var imgSrc = $('img', this).attr('src');



			$(this).css({
				'backgroundImage': 'url(' + imgSrc + ')'
			});
		});
	}

	function fixFullHeight($selector) {
		$selector.each(function(){
			$(this).height($win.height() - $('.site-banner').height());
		});
	}

	$doc.ready(function() {
		// Video
		var tag = document.createElement('script');
		tag.src = "//www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
		//espace pro forms 
		
		if ($('body').is('.content83097, .content46805')) {
		  $('body').addClass('pro');  
		}
		

		onYouTubeIframeAPIReady = function () {
		    player = new YT.Player('player', {
		        events: {
		            'onStateChange': onPlayerStateChange
		        },
		        playerVars: {
		        	controls: 0
		        }
		    });
		}

		onPlayerStateChange = function (event) {
		    if (event.data == YT.PlayerState.ENDED) {
		        $('.start-video').fadeIn('normal');
		    }
		}


		$('.event-days').each(function() {
			eventDays($(this));
		});

		//article h2 lines 
		if ($('.article-wrapper').length) {
			$('.article-wrapper h2, .article-wrapper h3').each(function(){
				$(this).wrapInner('<span/>')
			});
		}

		if ($('.lemag').length && !($('body').hasClass('pro')) && !($('body').hasClass('lemag'))) {

			initSliderSec($('.lemag .grid-la-list'));
		}

		$doc.on('click', function(e){
			var trgt = $(e.target);

			if ($(trgt).is('.link-toggle')) {
				e.preventDefault();

				$('.socials-quaternary').closest('.social-sharing').addClass('active');
			} else if (!$(trgt).is('.socials-quaternary *')) {
				$('.socials-quaternary').closest('.social-sharing').removeClass('active');
			}

		});

		$('.counter-teritary').on('mouseenter', function(){
			$(this).parent().addClass('active');
		});

		$('.counter-teritary').on('mouseleave', function(){
			$(this).parent().removeClass('active');
		});

		$('.scroll').on('click', function(e){
			e.preventDefault();

			scrollTo($(this));
		});

		// Quiz Steps
		$('.btn-advance').on('click', function(e){
			e.preventDefault();

			$(this)
				.closest('.quiz-step')
				.removeClass('current')
				.next('.quiz-step')
				.addClass('current');
		});

		$('.btn-redirect').on('click', function(e){
			e.preventDefault();

			var trgt = $(this)
							.closest('.quiz-step')
							.find('input:checked')
							.attr('data-href');

			var loc = window.location.href;

			loc = loc.substr(0, loc.indexOf('/Espace'));

			loc += trgt;

			window.location = loc;
		});

		$('.quiz-back').on('click', function(e){
			e.preventDefault();

			$(this)
				.closest('.quiz-step')
				.removeClass('current')
				.prev('.quiz-step')
				.addClass('current');
		});

		fixFullHeight($('.block-page.list-articles .la-item'));

		if ($('.list-articles.tpsfort').length) {
			fixItems($('.list-articles.tpsfort .grid-la-list'));
		}

		if ($('#zone1 + .layout-2-col #zone2 .cxp-swiper').length) {
			fixItems($('#zone1 + .layout-2-col #zone2 .list-articles .swiper-wrapper'));
		}


		//Initialization of sliders
		$win.on('load', function(){
			// Masonry
			// if ($('.liste-produit').length) {
			// 	$('.catal-ex-item').parent().masonry({
			// 		itemSelector: '.catal-ex-item',
			// 		columnWidth: 313,
			// 		gutter: 42
			// 	});
			// }

			if ($('body.lemag').length) {
				shapes($('#zone2 .list-articles:first-child .la-list'), '3n + 1', 3);
			}

			if ($('.front .block-page.list-articles:first-child .cxp-swiper').length && (!$('body').hasClass('pro')) || $('.rub-fda .block-page.full.list-articles:first-child .cxp-swiper').length) {
				initSlider($('.block-page.list-articles:first-child'));
			}

			fixBG($('.block-page.list-articles:first-child .la-item'));

			if ($('.list-articles.tpsfort').length && (!$('body').hasClass('pro'))) {
				initRoundaboutSlider($('.list-articles.tpsfort .grid-la-list'));
			}

			if ($('.list-articles.univers').length && $('body').hasClass('pro')) {
			
				$('.list-articles.univers').each( function (){
					var sliderClone = $(this).find('.slider-content');

					$(this).find('.cxp-pagination').detach();
					$(this).prepend(sliderClone);

					initRoundaboutSlider(sliderClone);
				})				
			}

			if ($('#zone1 + .layout-2-col #zone2 .cxp-swiper').length && (!$('body').hasClass('pro'))) {
				var slider = $('#zone1 + .layout-2-col #zone2 .cxp-swiper .swiper-wrapper');

				$('#zone1 + .layout-2-col #zone2 .cxp-swiper').detach();

				$('#zone1 + .layout-2-col #zone2 .list-articles .inside').append(slider);

				initRoundaboutSlider($('#zone1 + .layout-2-col #zone2 .list-articles .swiper-wrapper'));
			}

//			$('body').addClass('loaded');

			if ($('#player').length) {
				player.playVideo();
			}
		});

		//placeholders IE9 fix
		$.fn.doPlaceholders = function() {
		    if ($.support.placeholder) {
		        return this;
		    }
		 
		    var $fields = this.filter(function () {
		        return !$(this).data('didPlaceholders');
		    });
		 
		    $fields.on('focus blur', function(event) {
		        var placeholder = this.getAttribute('placeholder');
		 
		        if (event.type === 'focus' && placeholder === this.value) {
		            this.value = '';
		        } else if (event.type === 'blur' && this.value === '') {
		            this.value = placeholder;
		        }
		    });
		 
		    $fields.each(function() {
		        if (this.value === '') {
		            this.value = this.getAttribute('placeholder');
		        }
		    });
		 
		    $fields.data('didPlaceholders', true);
		 
		    return $fields;
		};
		 
		$.support.placeholder = (function() {
		    return 'placeholder' in document.createElement('input');
		})();
		 
		/* Don't select elements if placeholder supported*/
		if (!$.support.placeholder) {
		    $('input[placeholder], textarea[placeholder]').doPlaceholders();
		}

		function descReadMore() {
			$('.exhibitor-details .mod-catal .catal-ed-main-desc-content, .product-details .mod-catal .catal-prd-main-desc-content, .brand-details .mod-catal .catal-prd-main-desc-content').each(function(){
				var letters = $(this).text().length;

				if (letters > 400) {
					$(this).parent().addClass('long').append('<div class="desc-read-more-wrapper"><a href="#" class="desc-read-more">Lire la suite</a></div>');
				}
			});

			$('.desc-read-more').click(function(e){
				e.preventDefault();

				var $this = $(this);

				$this.closest('.catal-ed-main-desc, .catal-prd-main-desc').toggleClass('expanded');
			});

			// Exhibitor
			$('.product-details .mod-catal .catal-prd-exhibitor .catal-prd-exhibitor-content, .product-details .mod-catal .catal-prd-brand .catal-prd-brand-content').each(function(){
				$(this).append('<div class="details-read-more-wrapper"><a href="#" class="details-read-more">Lire la suite</a></a>');
			});

			$('.details-read-more').click(function(e){
				e.preventDefault();

				var $this = $(this);

				$this.closest('.catal-prd-exhibitor-content, .catal-prd-brand-content').toggleClass('expanded');
			});
		}

		function moveAddToCartButton() {
			var button = $('.exhibitor-details .catal-ex-item-buttons').detach();
			button.appendTo('.exhibitor-details .catal-ed-main');
			
			var button2 = $('.brand-details .catal-pr-item-buttons').detach();
			button2.appendTo('.brand-details .catal-prd-main');

			$('.produit .mod-catal .catal-ex-item-buttons, .front .mod-catal .catal-ex-item-buttons').each(function(){
				var $this = $(this);
				var $holder = $this.closest('.catal-ex-item-content').find('.catal-ex-item-desc');
				var button2 = $this.detach();

				button2.appendTo($holder);
			});
		}

		function moveProductDetailsInfo() {
			var info = $('.product-details .catal-prd-infos').detach();

			info.appendTo('.product-details .catal-prd-main-content');

			var button = $('.product-details .catal-pr-item-buttons').detach();

			button.appendTo('.product-details .catal-prd-main-content');
		}

		// points dans Pagination
		function paginationDots() {
			var $pagination = $('.pagination');
			var $pageItem = $pagination.find('.pagin-item');
			var $pagePrev = $pagination.find('.pagin-prev');
			var $pageNext = $pagination.find('.pagin-next');

			if ($pagePrev.length && $pageNext.length) {
			// both arrows exist
				if ($pageItem.length > 7) {  // items > 7
					insertDots(2, true, true); // insert dots before last 2 items
				}
			} else if ($pagePrev.length && !$pageNext.length) {
			// only prev arrow exist
				if ($pageItem.length > 6) {  // items > 6
					insertDots(1, true, false);  // insert dots before last item
				}

			} else if (!$pagePrev.length && $pageNext.length) {
			// only next arrow exist
				if ($pageItem.length > 6) {  // items > 6
					insertDots(2, false, true);  // insert dots before last 2 item
				}
			}

			function insertDots(nthLastChild, first, last) {
				var calcLastChild = $pageItem.length - nthLastChild;

				if (first == true && last == true) {
					$pageItem.eq(3).nextAll().not($pageItem.slice(-2)).addClass('hide');
				} else if (first == true && last == false) {
					$pageItem.eq(3).nextAll().not($pageItem.slice(-1)).addClass('hide');
				} else if (first == false && last == true) {
					$pageItem.eq(2).nextAll().not($pageItem.slice(-2)).addClass('hide');
				}

				$('<li class="pagin-item pagin-dots">').text('...').insertAfter($pageItem.eq(calcLastChild - 1));
			}
		}

		function changeFilterHTML() {
			$('.esf-as-list-filters li').each(function(){
				var $this = $(this);
				var targetID = $this.find('a').attr('href') + '_tree';
				var targetHTML = $(targetID).closest('.esf-as-filter-panel').detach();

				targetHTML.appendTo($this);
			});
		}

		function filter() {
			$('.mod-catal .esf-as-list-filters > li > a').addClass('expanded');

			$('.mod-catal .esf-as-list-filters > li > a').click(function(e){
				var $this = $(this);

				e.preventDefault();

				//stop scrolling animation
				$("html, body").stop();

				$this.parent().addClass('expanded').siblings().removeClass('expanded');
			});

			$('.esf-as-header').click(function(){
				$(this).removeClass('is-closed');
				$('.esf-as-filters').stop(true, true);
			});
		}

		function customScrollBar() {
			if ($('.mod-catal .esf-es-panel-content').length) {
				$('.mod-catal .esf-as-panel-content').mCustomScrollbar();
			}
		}

		function wrapProductDetails() {
			$('.product-details .mod-catal .catal-prd-exhibitor > img, .product-details .mod-catal .catal-prd-brand > img').wrap('<div class="image-wrapper">');

			$('.product-details .mod-catal .catal-prd-group').each(function(){
				$(this).find('p:not(.catal-prd-exhibitor-view-all)').wrapAll('<div class="item-entry">');
			});
		}

		filter();
		paginationDots();
		changeFilterHTML();
		customScrollBar();
		descReadMore();
		moveAddToCartButton();
		moveProductDetailsInfo();
		wrapProductDetails();
	});
})(jQuery, window, document);
