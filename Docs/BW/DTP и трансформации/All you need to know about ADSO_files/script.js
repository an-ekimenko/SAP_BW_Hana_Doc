/* Retina
 *******************************/
var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
jQuery(window).on("load", function () {
	if (pixelRatio > 1) {
		jQuery('.logo img, .entry-title img, .postdate strong.day img').each(function () {

			if (jQuery(this).data('retina') != '') {
				jQuery(this).css({
					"max-height": jQuery(this).height(),
					"max-width": jQuery(this).width()
				});
				jQuery(this).attr('src', jQuery(this).data('retina'));
			}
		});
	}
	jQuery(window).resize().scroll();
});


//placeholders
(function (a) {
	a(function () {
		var b = Modernizr.input.placeholder;
		if (!b) {
			var c = a("input[placeholder], textarea[placeholder]"),
					d = c.length,
					e, f = "placeholder";
			while (d--)
				c[d].value = c[d].value ? c[d].value : c.eq(d).addClass(f).attr("placeholder"), c.eq(d).focus(function () {
					var b = a(this);
					this.value == b.attr("placeholder") && (b.removeClass(f), this.value = "");
				}).blur(function () {
					var b = a(this);
					this.value == "" && (b.addClass(f), this.value = b.attr("placeholder"));
				}),
						function (b) {
							a(b.form).bind("submit", function () {
								b.value == a(b).attr("placeholder") && (b.value = "");
							});
						}(c[d]);
		}
	});
})(jQuery);

//pretty mobile menu
// prepend menu icon
jQuery('.main_menu').find('li.dropdown').prepend('<em class="display-child-ul"></em>');
// toggle nav
jQuery("#menu-icon").on("click", function () {
	jQuery(".mobile-menu").slideToggle(400, function () {
		if (jQuery(this).hasClass('opened')) {
			jQuery(this).css('display', '');
			jQuery(this).removeClass('opened')
		} else {
			jQuery(this).addClass('opened');
		}
	});
	jQuery(this).toggleClass("active");
});

jQuery(".display-child-ul").on("click", function () {
	jQuery(this).parent().find('ul').first().slideToggle(0, 'swing');
	jQuery(this).parent().toggleClass("active");
});

var flexsliders = {};

var History_inited = false;
var slider_was_run = false;
var slideshowVideo = {
	playing: false,
	play: function () {
		this.playing = true;
	},
	pause: function () {
		this.playing = false;
	},
	end: function () {
		this.playing = false;
	},
	isPlaing: function () {
		return this.playing;
	}
};

jQuery(window).load(function () {
	initHistory();
	//Isotope
	var isotopeit = jQuery('.filters').next('.row');

	if (isotopeit.length) {
		isotopeit.each(function () {
			jQuery(this).find('.gallery_wrap').isotope({
				layoutMode: 'fitRows'
			});
		});
	}

	jQuery('.filters a').click(function (e) {
		e.preventDefault();

		jQuery(this).closest('ul').find('.selected').removeClass('selected');
		jQuery(this).addClass('selected');

		jQuery(this).closest("li").removeClass("cat-item");
		var selector = jQuery(this).closest("li").attr('class');

		jQuery(this).closest('.filters').next('.row').find('.gallery_wrap').isotope({
			filter: function () {
				var itemcat = jQuery(this).attr('class');
				return itemcat.match(selector);
			}
		});
	});
	clearFlickerSize();
});

jQuery(document).ready(function () {


	positionFooter();

	jQuery(window).scroll(positionFooter).resize(positionFooter).load(positionFooter);

	function positionFooter() {
		var docHeight = jQuery(document.body).height() - jQuery("#sticky-footer-push").height();
		if (docHeight < jQuery(window).height()) {
			var diff = jQuery(window).height() - docHeight;
			if (!jQuery("#sticky-footer-push").length > 0) {
				jQuery("footer").before('<div id="sticky-footer-push"></div>');
			}
			jQuery("#sticky-footer-push").height(diff);
		}
	}

	jQuery('ul.sf-menu').superfish({
		hoverClass: 'sfHover',
		delay: 'false',
		animation: {
			opacity: 'show',
			height: 'auto'
		},
		speed: '1',
		autoArrows: false,
		dropShadows: false,
		disableHI: true
	}).supposition();

	jQuery('.main_menu_select select').change(function () {
		window.location = jQuery(this).find("option:selected").val();
	});

	jQuery('ul.sf-menu li:not(".dropdown") > a').on('touchend', function (event) {
		var el = jQuery(this);
		var link = el.attr('href');
		window.location = link;
	});

	jQuery('article.posts_listing:last .post_title_area').css({
		'background': 'none'
	});

	jQuery(".offer:last-child").not(':odd').closest('.offer_group').addClass('offer_group_even');

	/* Toggles and Tabs */
	jQuery(".toggle_container:not('.active')").hide();
	jQuery("h4.trigger").click(function () {
		jQuery(this).toggleClass("active").next().slideToggle("normal");

		return false;
	});

	if (jQuery('.tabgroup').length) {
		jQuery(".tabgroup").tabs().show();
	}

	/* ToC */

	jQuery('div.toc a.toc_hide').click(function () {

		var hide = '[' + jQuery(this).data('hide') + ']';
		var show = '[' + jQuery(this).data('show') + ']';
		if (jQuery(this).html() == hide) {
			jQuery(this).html(show);
		} else {
			jQuery(this).html(hide);
		}
		jQuery(this).closest('h4').next().slideToggle("normal");


		return false;
	});

	jQuery(".shipping-calculator-button").click(function () {
		jQuery(this).toggleClass("hover");
	});

	/* Lightbox */
	jQuery("a.zoom, a[data-rel^='prettyPhoto']").prettyPhoto({
		hook: 'data-rel',
		theme: 'light_square',
		overlay_gallery: false,
		social_tools: false,
		deeplinking: false,
		show_title: false /*hide title in lightbox*/

	});


	jQuery("a[data-pp^='lightbox']").prettyPhoto({
		theme: 'light_square',
		overlay_gallery: false,
		social_tools: '',
		deeplinking: false,
		hook: 'data-pp',
		show_title: false /*hide title in lightbox*/

	});

	jQuery("a img").filter('.alignleft').css('margin', '0').closest('a').css({
		'float': 'left',
		'margin': '0 15px 15px 0'
	});
	jQuery("a img").filter('.alignright').css('margin', '0').closest('a').css({
		'float': 'right',
		'margin': '0 0 15px 15px'
	});

	jQuery('p').find('img.aligncenter').closest('a').wrap('<div class="aligncenter">');

	jQuery('.grid_bg').find('.woocommerce-ordering').closest('.grid_bg').addClass('woo-ordering-on');



	jQuery("a[data-pp^='lightbox'], a.thumb").hover(function () {

		jQuery(this).prepend("<span class='imghover'><span></span></span>");
		jQuery(this).find("span.imghover").stop().animate({
			opacity: 0
		}, 0)
		var sh = jQuery(this).find("img").innerHeight() + 2;
		var sw = jQuery(this).find("img").innerWidth() + 2;
		if (sh > sw) {
			var hw = sw / 2;
		} else {
			var hw = sh / 2;
		}

		jQuery(this).find("span.imghover").height('0').width('0').css({
			'top': sh / 2,
			'left': sw / 2,
			'borderRadius': '100%'
		}).stop().animate({
			opacity: 1,
			height: hw,
			width: hw,
			top: (sh / 2 - hw / 2),
			left: (sw / 2 - hw / 2)
		}, 300,
				function () {

					jQuery(this).find("span").css({
						opacity: 1,
						height: hw,
						width: hw
					});

				}
		);


	}, function () {
		jQuery(this).find("span.imghover span").css({
			opacity: 0
		});
		jQuery(this).find("span.imghover").stop().animate({
			opacity: 0
		}, 300,
				function () {
					jQuery(this).remove();
				}

		);

	});

	/*filters */
	jQuery('.filters').find('ul a').click(function () {
		if (!jQuery(this).hasClass('selected')) {
			jQuery(this).parents('ul').find('.selected').removeClass('selected');
			jQuery(this).addClass('selected');
		}
	});



	/* smooth fade rollovers */
	jQuery('.main_menu>.sf-menu>li.current-menu-item, .main_menu>.sf-menu>li.current-menu-ancestor').prepend('<span class="hover"><span class="hoverL"><span class="hoverR"></span></span></span>').find(".hover").css('opacity', 0).stop().fadeTo(300, 1);
	jQuery(".main_menu>.sf-menu>li>a").on({
		mouseenter: function () {
			jQuery(this).closest('li:not(.current-menu-item)').find(".hover").remove();
			jQuery(this).closest('li:not(.current-menu-item)').prepend('<span class="hover"><span class="hoverL"><span class="hoverR"></span></span></span>').find(".hover").css('opacity', 0).stop().fadeTo(300, 1);
		},
		mouseleave: function () {
			jQuery(this).closest('li:not(.current-menu-item)').find(".hover").stop().fadeTo(700, 0, function () {
				jQuery(this).closest('li:not(.current-menu-item)').find(".hover").remove()
			});
		},
		touchstart: function () {
			jQuery(this).closest('li:not(.current-menu-item)').prepend('<span class="hover"><span class="hoverL"><span class="hoverR"></span></span></span>').find(".hover").css('opacity', 0).stop().fadeTo(300, 1);
		}
	});

	/////// events calendar
	jQuery('.day').height(jQuery('.day').width());



	jQuery('#previous_month').live('click', function () {
		sendCalendarData(jQuery(this), 'previous');
		return false;
	});

	jQuery('#next_month').live('click', function () {
		sendCalendarData(jQuery(this), 'next');
		return false;
	});



	function sendCalendarData(obj, month_to_show) {
		var form = obj.closest('form');
		var form_data = {};
		if (form && form.length) {
			var month = parseInt(jQuery('#calendar_month', form).val(), 10);
			var year = parseInt(jQuery('#calendar_year', form).val(), 10);
			var new_month = new_year = 0;

			if (month_to_show == 'previous') {
				if (month == 1) {
					new_month = 12;
					new_year = year - 1;
				} else {
					new_month = month - 1;
					new_year = year;
				}
			} else {
				if (month == 12) {
					new_month = 1;
					new_year = year + 1;
				} else {
					new_month = month + 1;
					new_year = year;
				}
			}

			form_data.calendar = true;
			form_data.month = new_month;
			form_data.year = new_year;
			form_data.layout = jQuery('#calendar_layout', form).val();
			form_data.category = jQuery('#calendar_category', form).val();
			form_data.from = jQuery('#calendar_from', form).val();
			form_data.to = jQuery('#calendar_to', form).val();

			form_data.action = 'calendar_walker';

			jQuery.ajax({
				type: "POST",
				url: ThemeData.admin_url,
				data: form_data,
				dataType: 'json',
				success: function (response) {
					if (response && typeof response == 'object') {
						form.parents('.events_calendar').html(response.html);
						pushToHistory(response.html);
						jQuery('.day').height(jQuery('.day').width());
					}
				}
			});
		}
	}


	if (typeof (jQuery.fn.validate) !== 'undefined') {

		jQuery("#commentform p.comment-form-rating").prependTo('#commentform');


		jQuery("#commentform").validate({
			submitHandler: function (form) {
				jQuery(".form-submit input[type='submit']").attr('disabled', 'disabled');
				form.submit();
			},
			rules: {
				author: "required",
				email: "required email",
				comment: "required",
				rating: {
					required: function () {

						if (typeof wc_single_product_params === 'undefined') {
							return false;
						} else {
							return  wc_single_product_params.review_rating_required === 'yes';
						}
					}
				}
			},
			messages: {
				author: Theme_i18n.error_author,
				comment: Theme_i18n.error_comment,
				rating: function () {

					if (typeof wc_single_product_params === 'undefined') {
						return '';
					} else {
						return wc_single_product_params.i18n_required_rating_text;
					}

				},
				email: {
					required: Theme_i18n.error_email_required,
					email: Theme_i18n.error_email_wrong
				}
			}
		});


	}



});
/////// events calendar
jQuery(window).resize(function () {
	jQuery('.day').height(jQuery('.day').width());
});

// WooCommerce demo store
jQuery(window).on('ready resize', function () {
	jQuery('body.woocommerce-demo-store').css({'padding-top': jQuery('p.demo_store').outerHeight() + 'px'});
});


var computedM;

jQuery(window).load(function () {
	// WooCommerce

	// Products per page
	jQuery('.woocommerce-per-page').on('change', 'select.products_per_page', function () {
		//set cookie			
		jQuery.cookie('products_per_page', jQuery(this).val());
		jQuery(this).closest('form').submit();

	});


	var hash = window.location.hash;


	if (hash.toLowerCase().indexOf("comment-") >= 0 || hash == '#review_form' || hash == '#reviews') {
		jQuery('body.woocommerce .reviews_tab a').click();
	}

	if (typeof (jQuery.fn.flexslider) !== 'undefined') {

		computedM = Math.ceil(jQuery('.product_image_wrap').width() / (parseInt(ThemeData.woo_product_thumbs_width) + 31));

		jQuery('body.woocommerce #product_thumbnails').flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			itemWidth: parseInt(ThemeData.woo_product_thumbs_width) + 20,
			itemMargin: 11,
			maxItems: computedM,
			minItems: computedM,
			asNavFor: 'body.woocommerce #product_image',
			start: function (slider) {
				flexsliders['product_thumbnails'] = slider;
			}
		});

		jQuery('body.woocommerce #product_image').flexslider({
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			sync: "body.woocommerce #product_thumbnails",
			start: function (slider) {
				flexsliders['product_images'] = slider;
				jQuery('.product_image_wrap').velocity({opacity: 1}, 300);
			}
		});


		computedM = Math.ceil((jQuery('body.woocommerce div.upsells.products').width() + 20) / (parseInt(ThemeData.woo_catalog_image_width) + 40));

		jQuery('body.woocommerce div.upsells.products').flexslider({
			selector: "ul.products > li.product",
			customDirectionNav: jQuery("div.upsells.products div.flex-direction-nav a"),
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			itemWidth: parseInt(ThemeData.woo_catalog_image_width) + 40,
			itemMargin: 0,
			maxItems: computedM,
			minItems: computedM,
			start: function (slider) {
				flexsliders['product_upsells'] = slider;
				jQuery('.products .flex-direction-nav').velocity({opacity: 1}, 300);
				jQuery(window).resize();
			}
		});

		computedM = Math.ceil((jQuery('body.woocommerce div.related.products').width() + 20) / (parseInt(ThemeData.woo_catalog_image_width) + 40));

		jQuery('body.woocommerce div.related.products').flexslider({
			selector: "ul.products > li.product",
			customDirectionNav: jQuery("div.related.products div.flex-direction-nav a"),
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			itemWidth: parseInt(ThemeData.woo_catalog_image_width) + 40,
			itemMargin: 0,
			maxItems: computedM,
			minItems: computedM,
			start: function (slider) {
				flexsliders['product_related'] = slider;
				jQuery('.products .flex-direction-nav').velocity({opacity: 1}, 300);
				jQuery(window).resize();
			}
		});


		computedM = Math.ceil((jQuery('div.cross-sells').width() + 20) / (parseInt(ThemeData.woo_catalog_image_width) + 40));

		jQuery('div.cross-sells').flexslider({
			selector: "ul.products > li.product",
			customDirectionNav: jQuery("div.cross-sells div.flex-direction-nav a"),
			animation: "slide",
			controlNav: false,
			animationLoop: false,
			slideshow: false,
			itemWidth: parseInt(ThemeData.woo_catalog_image_width) + 40,
			itemMargin: 0,
			maxItems: computedM,
			minItems: computedM,
			start: function (slider) {
				flexsliders['product_cross_sells'] = slider;
				jQuery('.products .flex-direction-nav').velocity({opacity: 1}, 300);
				jQuery(window).resize();
			}
		});



	}

	var variations_select_delay;

	jQuery('body.woocommerce form.variations_form select').on('change', function () {

		if (jQuery(this).find('option:selected').hasClass("enabled")) {
			jQuery(this).addClass('dark');
		} else {
			jQuery(this).removeClass('dark');
		}





		var $product = jQuery(this).closest('.product'),
				$product_img = $product.find('div.images img:eq(0)'),
				$o_src = $product_img.attr('data-o_src'),
				$product_link = $product.find('div.images a.zoom:eq(0)'),
				$product_thumb_img = $product.find('div.thumbnails img:eq(0)'),
				$product_thumb_link = $product.find('div.thumbnails a:eq(0)');


		if ($o_src === undefined) {
			$o_src = (!$product_img.attr('src')) ? '' : $product_img.attr('src');
			$product_img.attr('data-o_src', $o_src);
		}






		clearTimeout(variations_select_delay);

		variations_select_delay = setTimeout(function () {



			if ($product_img.attr('src') !== $o_src) {

				jQuery.ajax({
					type: 'post',
					url: ThemeData.admin_url,
					data: {
						action: "get_variation_thumb",
						img_url: $product_img.attr('src')
					},
					success: function (response) {						
						
						var o_src = response,
								o_title = $product_img.attr('title'),
								o_alt = $product_img.attr('alt'),
								o_href = $product_link.attr('href');


						if (o_src !== undefined) {
							$product_thumb_img
									.attr('src', o_src);
						}

						if (o_href !== undefined) {
							$product_thumb_link
									.attr('href', o_href);
						}

						if (o_title !== undefined) {
							$product_thumb_img
									.attr('title', o_title);
							$product_thumb_link
									.attr('title', o_title);
						}

						if (o_alt !== undefined) {
							$product_thumb_img
									.attr('alt', o_alt);
						}
						if (typeof (jQuery.fn.flexslider) !== 'undefined') {
							if (flexsliders['product_images'] && flexsliders['product_images'].length) {
								flexsliders['product_images'].flexslider(0);
							}
							if (flexsliders['product_thumbnails'] && flexsliders['product_thumbnails'].length) {
								flexsliders['product_thumbnails'].flexslider(0);
							}
						}


					}

				});
			}

		}, 100);
	}).trigger('change');





	/* jCycle */
	if (jQuery("#jcyclemain").length) {


		if (typeof slider_padding != 'undefined' && (slider_padding == '1')) {
			jQuery('.bgimage').css('padding', '0');
		}

		if (jQuery("#jcyclemain .jcyclemain:first img").length) {
			jQuery('#jcyclemain .jcyclemain:first img').each(function () {
				var new_image_source = (jQuery(this).attr('src'));

				jQuery(this).load(function () {
					if (!window.slider_was_run) {
						sliderRun();
					}
				})
						.attr('src', new_image_source);
			});

			if (!window.slider_was_run) {
				sliderRun();
			}
		} else {
			if (!window.slider_was_run) {
				sliderRun();
			}
		}
	}
});


jQuery(window).resize(function () {

	if (flexsliders['product_thumbnails']) {
		computedM = Math.ceil(jQuery('.product_image_wrap').width() / (parseInt(ThemeData.woo_product_thumbs_width) + 31));

		flexsliders['product_thumbnails'].vars.minItems = computedM;
		flexsliders['product_thumbnails'].vars.maxItems = computedM;
		flexsliders['product_thumbnails'].flexAnimate(0);
		flexsliders['product_thumbnails'].update(flexsliders['product_thumbnails'].pagingCount);
		flexsliders['product_thumbnails'].setProps();
	}


	if (flexsliders['product_upsells']) {
		computedM = Math.ceil((jQuery('body.woocommerce div.upsells.products').width() + 20) / (parseInt(ThemeData.woo_catalog_image_width) + 40));

		flexsliders['product_upsells'].vars.minItems = computedM;
		flexsliders['product_upsells'].vars.maxItems = computedM;
		flexsliders['product_upsells'].flexAnimate(0);
		flexsliders['product_upsells'].update(flexsliders['product_upsells'].pagingCount);
		flexsliders['product_upsells'].setProps();
	}

	if (flexsliders['product_related']) {
		computedM = Math.ceil((jQuery('body.woocommerce div.related.products').width() + 20) / (parseInt(ThemeData.woo_catalog_image_width) + 40));

		flexsliders['product_related'].vars.minItems = computedM;
		flexsliders['product_related'].vars.maxItems = computedM;
		flexsliders['product_related'].flexAnimate(0);
		flexsliders['product_related'].update(flexsliders['product_related'].pagingCount);
		flexsliders['product_related'].setProps();
	}

	if (flexsliders['product_cross_sells']) {
		computedM = Math.ceil((jQuery('body.woocommerce-cart div.cross-sells').width() + 20) / (parseInt(ThemeData.woo_catalog_image_width) + 40));

		flexsliders['product_cross_sells'].vars.minItems = computedM;
		flexsliders['product_cross_sells'].vars.maxItems = computedM;
		flexsliders['product_cross_sells'].flexAnimate(0);
		flexsliders['product_cross_sells'].update(flexsliders['product_cross_sells'].pagingCount);
		flexsliders['product_cross_sells'].setProps();
	}



});



function validateCaptcha(form, callback) {
	jQuery.ajax({
		type: 'post',
		url: ThemeData.admin_url,
		data: {
			action: "captcha_check",
			recaptcha_challenge_field: jQuery('#recaptcha_challenge_field', form).val(),
			recaptcha_response_field: jQuery('#recaptcha_response_field', form).val()
		},
		success: function (response) {
			if (typeof response != 'undefined' && typeof response.is_valid != 'undefined') {
				if (typeof Recaptcha != 'undefined') {
					Recaptcha.reload();
				}

				if (response.is_valid) {
					if (typeof callback == 'function') {
						callback(form);
					}
				}

				return response.is_valid

			}
			return false;
		},
		error: function () {
			if (typeof Recaptcha != 'undefined') {
				Recaptcha.reload();
			}
			return false;
		}
	});
}


function ajaxContact(theForm) {
	var $ = jQuery;
	var name, el, label, html;
	var form_data = {};



	$('input, select, textarea', theForm).each(function (n, element) {
		el = $(element);

		{
			name = el.attr('name');
			//
			switch (el.attr('type')) {
				case 'radio':
					if (el.prop('checked')) {
						label = $('label:first', el.parent('div'));
					}
					break;
				case 'checkbox':
					label = $("label[for='" + name + "']:not(.error)", theForm);
					break;
				default:
					label = $("label[for='" + name + "']", theForm);
			}

			// Widget contact form skip this step!
			if (!($(theForm).hasClass('contactformWidget')) && label && label.length) {
				if (name != 'recaptcha_response_field') {
					html = label.html();
					html = html.replace(/<span>.*<\/span>/, '');
					html = html.replace(/<br>/, '');

					if (el.attr('type') == 'checkbox') {
						if (el.prop('checked')) {
							form_data[html] = 'yes';
						} else {
							form_data[html] = 'no';
						}
					} else {
						form_data[html] = el.val().replace(/\n/g, '<br/>');
					}
				}
			} else {
				/**
				 * to, subject .....
				 */
				if (name != undefined && name != '_wp_http_referer' && name != '_wpnonce' && name != 'contact-form-id' && name != 'recaptcha_challenge_field' // IGNORE CAPTCH FORM ELEMENTS
						&& name != 'recaptcha_response_field' && name != 'use-captch'
						) {
					if (el.attr('type') != 'radio') {
						/**
						 * email reply to:
						 */
						if (name == 'th-email-from') {
							if (form_data[name] == undefined) {
								/**
								 * first of reply
								 */
								var email_from = null;
								jQuery('[name="' + name + '"]').each(function () {

									email_from = jQuery(this).closest('div').find('input.email').val();
									if (email_from && email_from.length) {
										return false;
									}
								});

								if (email_from && email_from.length) {
									form_data[name] = email_from;
								}
							}
						} else {
							form_data[name] = el.val();
						}
					}
				}
			}
			name = label = html = null;
		}
		el = null;
	});



	var showMessage = function (msg) {
		jQuery(theForm).find('div').fadeOut(500);
		setTimeout(function () {
			jQuery(theForm)
					.append('<p class="note">' + msg + '</p>')
					.slideDown('fast');
		}, 500);
		hideMessage(jQuery(theForm));
	};

	var hideMessage = function ($form) {
		setTimeout(function () {
			$form.find('.note').html('').slideUp('fast');
			$form.find("button, .churchope_button").removeAttr('disabled');
			$form.find("input[type=text], textarea").val('');
			$form.find('div').fadeIn(500);
		}, 3000);
	};

	form_data.action = 'send_contact_form';

	jQuery.ajax({
		type: "POST",
		url: ThemeData.admin_url,
		data: form_data,
		success: showMessage,
		error: function () {
			showMessage(Theme_i18n.wrong_connection);
		}
	});

	return false;
}

function handlePlayerStateChange(state) {
	switch (state) {
		case 1:
		case 3:
			// Video has begun playing/buffering
			slideshowVideo.play();
			jQuery('#jcyclemain').cycle('pause');
			break;
		case 2:
		case 0:
			// Video has been paused/ended
			slideshowVideo.pause();
			if (typeof slider_pause != 'undefined') {
				if (!slider_pause) {
					jQuery('#jcyclemain').cycle('resume')
				}
			}
			break;
	}
}

function onYouTubePlayerReady(id) {
	var player = jQuery('#jcyclemain #' + id).get(0);
	if (player) {
		if (player.addEventListener) {
			player.addEventListener('onStateChange', 'handlePlayerStateChange');
		} else {
			player.attachEvent('onStateChange', 'handlePlayerStateChange');
		}
	}
}

function initHistory() {
	if (History_inited == false) {
		History_inited = true;

		// Prepare
		History = window.History; // Note: We are using a capital H instead of a lower h

		if (typeof History != 'undefined' && History !== null) {
			if (!History.enabled) {
				// History.js is disabled for this browser.
				// This is because we can optionally choose to support HTML4 browsers or not.
				return false;
			}
			// initial state
			pushToHistory(jQuery('.events_calendar').html());

			// Bind to StateChange Event
			History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
				var State = History.getState(); // Note: We are using History.getState() instead of event.state

				if (typeof State.data.html != 'undefined' && State.data.html.length > 0) {
					jQuery('.events_calendar').html(State.data.html);
				}
			});
		}
	}
}

function pushToHistory(data) {
	//		console.log('pushToHistory'); 
	if (typeof History != 'undefined' && History !== null) {
		History.pushState({
			html: data
		}, document.title, document.URL);
	}
}

function sliderRun() {
	// set slider run flag
	window.slider_was_run = true;

	/* Swipe Variables */
	jQuery.fn.cycle.transitions.scrollHorzTouch = function ($cont, $slides, opts) {
		$cont.css('overflow', 'hidden').width();
		opts.before.push(function (curr, next, opts, fwd) {
			if (opts.rev)
				fwd = !fwd;
			positionNext = jQuery(next).position();
			positionCurr = jQuery(curr).position();

			$.fn.cycle.commonReset(curr, next, opts);
			if ((positionNext.left > 0 && fwd) || (positionNext.left < 0 && !fwd)) {
				opts.cssBefore.left = positionNext.left;
			} else {
				opts.cssBefore.left = fwd ? (next.cycleW - 1) : (1 - next.cycleW);
			}
			if ((positionCurr.left > 0 && fwd) || (positionCurr.left < 0 && !fwd)) {
				opts.animOut.left = positionCurr.left;
			} else {
				opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
			}
		});
		opts.cssFirst.left = 0;
		opts.cssBefore.top = 0;
		opts.animIn.left = 0;
		opts.animOut.top = 0;
	};

	jQuery("#jcyclemain").css('display', 'block');
	var winWidth = jQuery(window).width(),
			winHeight = jQuery(window).height();
	var resizeTimeout = null;
	jQuery(window).resize(function () {
		onResize = function () {
			//			console.log('resize');
			jQuery('#jcyclemain div[data-contsize]').removeAttr('data-contsize');
			var cw = jQuery('#jcyclemain .jcyclemain:visible .bgimage').innerWidth();
			var pad = parseInt((typeof slider_padding != 'undefined' && (slider_padding == '1')) ? '0' : '110');
			if (jQuery('#jcyclemain .jcyclemain:visible .cycle_content').length) {
				var ch = jQuery('#jcyclemain .jcyclemain:visible .cycle_content').innerHeight();
			} else {
				var ch = 0;
			}
			if (cw > 767) {
				if (jQuery('#jcyclemain .jcyclemain:visible .cycle_image').length) {
					var ih = jQuery('#jcyclemain .jcyclemain:visible .cycle_image').height();
				} else {
					if (jQuery('#jcyclemain .jcyclemain:visible ').attr('data-slidesize')) {
						var ih = (jQuery('#jcyclemain .jcyclemain:visible ').attr('data-slidesize') - pad);
						jQuery('#jcyclemain .jcyclemain:visible .bgimage').css({
							'background-image': 'url(' + jQuery('#jcyclemain .jcyclemain:visible ').attr('data-background') + ')'
						});
					} else {
						var ih = 0;
					}
				}
				var nh = null;
				if (ih > ch) {
					fh = (typeof slider_fixedheight != 'undefined' && (slider_fixedheight != "0")) ? slider_fixedheight : '0';

					if ((ih > fh) && (typeof slider_fixedheight != 'undefined' && (slider_fixedheight != "0"))) {
						if (fh > ch) {
							jQuery(nextElement).find('.cycle_content').css({
								'paddingTop': (fh - ch) / 2 + 'px'
							});
						}

					} else {
						if (typeof nextElement !== 'undefined') {
							jQuery(nextElement).find('.cycle_content').css({
								'paddingTop': (ih - ch) / 2 + 'px'
							});
						}
					}
					nh = ih;
				} else {
					nh = ch;
				}
			} else {
				var nh = null;
				if (jQuery('#jcyclemain .jcyclemain:visible .cycle_image').length) {
					var ih = jQuery('#jcyclemain .jcyclemain:visible .cycle_image').height();
					nh = ch + ih;
				} else {
					if (jQuery('#jcyclemain .jcyclemain:visible ').attr('data-slidesize')) {
						var ih = (jQuery('#jcyclemain .jcyclemain:visible ').attr('data-slidesize') - pad);

						if (ih > ch) {
							//jQuery('#jcyclemain .jcyclemain:visible .cycle_content').css({'paddingTop':(ih-ch)/2+'px'});
							nh = ih;
						} else {
							nh = ch;
						}

						jQuery('#jcyclemain .jcyclemain:visible .bgimage').css({
							'background-image': 'url(' + jQuery('#jcyclemain .jcyclemain:visible ').attr('data-background') + ')'
						});
					} else {
						var ih = 0;
						nh = ch + ih;
					}
				}

			}
			nh = (typeof slider_fixedheight != 'undefined' && (slider_fixedheight != "0")) ? slider_fixedheight : parseInt(nh);
			jQuery('#jcyclemain .jcyclemain:visible .bgimage').css({
				'height': nh + 'px'
			});
			jQuery("#slide_next, #slide_prev").animate({
				top: (nh + pad) / 2 - 50
			});
			jQuery("#jcyclemain").stop().animate({
				height: (nh + pad) + 'px'
			});
		}
		var winNewWidth = jQuery(window).width(),
				winNewHeight = jQuery(window).height();

		// compare the new height and width with old one
		if (winWidth != winNewWidth || winHeight != winNewHeight) {
			if (resizeTimeout) {
				window.clearTimeout(resizeTimeout);
			}

			resizeTimeout = window.setTimeout(onResize, 65);
		}
		//Update the width and height
		winWidth = winNewWidth;
		winHeight = winNewHeight;
	});

	var currenSlide = null;
	var slideNumber = 0;
	var currentLeft = 0;
	var leftStart = 0;
	var sliderExpr;
	var slideFlag = false;
	var slideshow_iterator = 1;
	var slider_next = (typeof slider_navigation != 'undefined' && (slider_navigation != "0")) ? "#slide_next" : null;
	var slider_prev = (typeof slider_navigation != 'undefined' && (slider_navigation != "0")) ? "#slide_prev" : null;
	if (typeof slider_navigation == 'undefined' || (slider_navigation == "0")) {
		jQuery('#jcyclemain_navigation').remove();
	}
	jQuery('#jcyclemain').cycle({
		fx: (typeof slider_fx != 'undefined' && (slider_fx != "")) ? slider_fx : 'fade', //
		timeout: (typeof slider_timeout != 'undefined') ? slider_timeout : '6000', //
		pager: '#navjcycle span',
		speed: (typeof slider_speed != 'undefined') ? slider_speed : '1000', //
		pagerEvent: 'click',
		//				pauseOnPagerHover:true,
		//    			pauseOnPagerHover: (typeof slider_pauseOnHover != 'undefined')?!!slider_pauseOnHover:true,//
		cleartypeNoBg: true,
		cleartype: true,
		pause: (typeof slider_pause != 'undefined') ? !!slider_pause : 1, //
		next: slider_next,
		prev: slider_prev,
		before: animateSlide,
		after: animateSlideContent,
		slideResize: true,
		containerResize: false,
		width: '100%',
		fit: 1,
		autostop: (typeof autoscroll != 'undefined') ? !!autoscroll : false,
		autostopCount: 1
	});

	jQuery('#jcyclemain').hover(function () {

		if (slideshowVideo.isPlaing()) {
			jQuery('#jcyclemain').cycle('pause');
		}
	}, function () {

		if (slideshowVideo.isPlaing()) {
			jQuery('#jcyclemain').cycle('pause');
		}
	});

	jQuery('#color_header, .rev_slider_wrapper').hover(function () {
		//console.log('over');
		jQuery("#jcyclemain_navigation").fadeIn();
	}, function () {
		jQuery("#jcyclemain_navigation").fadeOut();
	});


	jQuery('#jcyclemain').css("display", "block");
	jQuery('#navjcycle').css("display", "block");
	jQuery('#navjcycle a:only-child').remove();

	if (typeof jQuery('#jcyclemain').swipe !== 'undefined') {
		jQuery('#jcyclemain').swipe({
			swipeMoving: function (pageX) {

				if (slideFlag)
					return;

				var newLeft = currentLeft - pageX;

				currenSlide.css('left', newLeft + 'px');

				var $slides = jQuery(sliderExpr, jQuery('#jcyclemain'));
				var scrollSlide;

				nextSlideLeft = newLeft > 0 ? newLeft - currenSlide.width() : newLeft + currenSlide.width();
				flag = newLeft > 0 ? -1 : 1;
				scrollSlide = slideNumber + flag;
				if (scrollSlide < 0 || scrollSlide > ($slides.length - 1)) {
					scrollSlide = scrollSlide < 0 ? $slides.length - 1 : 0;
				}
				$slides.eq(scrollSlide).css('left', nextSlideLeft + 'px');
				$slides.eq(scrollSlide).show();
			},
			swipeLeft: function () {
				jQuery('#jcyclemain').cycle('next');
			},
			swipeRight: function () {
				jQuery('#jcyclemain').cycle('prev');
			}
		});
	}


	function animateSlide(currElement, nextElement, opts, isForward) {
		sliderExpr = opts.slideExpr;
		slideFlag = true;

		jQuery(nextElement).find('.bgimage').css({
			opacity: 0
		});
		if (Modernizr.canvas) {
			jQuery(currElement).find('.cycle_content .entry-title, .cycle_content .entry-content, .cycle_image, .bgimage').animate({
				'visibility': 'hidden',
				'opacity': '0'
			});
		}
	}


	function animateSlideContent(currElement, nextElement, opts, isForward) {
		currenSlide = jQuery(nextElement);
		slideNumber = opts.currSlide;
		currentLeft = jQuery(nextElement).position().left;
		slideFlag = false;

		var cw = jQuery(nextElement).find('.bgimage').innerWidth();
		var pad = parseInt((typeof slider_padding != 'undefined' && (slider_padding == '1')) ? '0' : '110');
		if (jQuery(nextElement).find('.cycle_content').length) {
			var ch = parseInt(jQuery(nextElement).attr('data-contsize'), 10);

			if (isNaN(ch)) {
				var ch = jQuery(nextElement).find('.cycle_content').innerHeight();
				//				if(slideshow_iterator>1)
				{
					jQuery(nextElement).attr('data-contsize', ch);
				}
			}
		} else {
			var ch = 0;
		}
		if (cw > 767) {
			if (jQuery(nextElement).find('.cycle_image').length) {
				var ih = jQuery(nextElement).find('.cycle_image').height();
			} else {
				if (jQuery(nextElement).attr('data-slidesize')) {
					var ih = (jQuery(nextElement).attr('data-slidesize') - pad);
					jQuery(nextElement).find('.bgimage').css({
						'background-image': 'url(' + jQuery(nextElement).attr('data-background') + ')'
					});
				} else {
					var ih = 0;
				}
			}
			var nh = null;
			if (ih > ch) {
				fh = (typeof slider_fixedheight != 'undefined' && (slider_fixedheight != "0")) ? slider_fixedheight : '0';

				if ((ih > fh) && (typeof slider_fixedheight != 'undefined' && (slider_fixedheight != "0"))) {
					if (fh > ch) {
						jQuery(nextElement).find('.cycle_content').css({
							'paddingTop': (fh - ch) / 2 + 'px'
						});
					}

				} else {
					jQuery(nextElement).find('.cycle_content').css({
						'paddingTop': (ih - ch) / 2 + 'px'
					});

				}
				nh = ih;
			} else {
				nh = ch;
			}
		} else {
			var nh = null;
			if (jQuery(nextElement).find('.cycle_image').length) {
				var ih = jQuery(nextElement).find('.cycle_image').height();
				nh = ch + ih;
			} else {
				if (jQuery(nextElement).attr('data-slidesize')) {
					var ih = (jQuery(nextElement).attr('data-slidesize') - pad);
					if (ih > ch) {
						//jQuery(nextElement).find('.cycle_content').css({'paddingTop':(ih-ch)/2+'px'});
						nh = ih;
					} else {
						nh = ch;
					}
					jQuery(nextElement).find('.bgimage').css({
						'background-image': 'url(' + jQuery(nextElement).attr('data-background') + ')'
					});
				} else {
					var ih = 0;
					nh = ch + ih;
				}
			}
		}
		nh = (typeof slider_fixedheight != 'undefined' && (slider_fixedheight != "0")) ? slider_fixedheight : parseInt(nh);
		jQuery(nextElement).find('.bgimage').css({
			'height': nh + 'px'
		});
		jQuery("#slide_next, #slide_prev").animate({
			top: (nh + pad) / 2 - 50
		});
		jQuery("#jcyclemain").stop().animate({
			height: (nh + pad) + 'px'
		}, {
			complete: function () {
				jQuery(nextElement).find('.cycle_content .entry-title, .cycle_content .entry-content, .cycle_image, .bgimage').css({
					'visibility': 'visible'
				});
				jQuery(nextElement).find('.bgimage').animate({
					opacity: 1
				});
				if (jQuery(nextElement).find('.cycle_image').length) {
					jQuery(nextElement).find('.cycle_image').stop().animate({
						opacity: 1
					}, 400, function () {
						if (jQuery(nextElement).find('.cycle_content .entry-title').length) {
							jQuery(nextElement).find('.cycle_content .entry-title').stop().animate({
								opacity: 1
							}, 400, function () {
								jQuery(nextElement).find('.cycle_content .entry-content').stop().animate({
									opacity: 1
								}, 400, function () {
								});
							});
						} else {
							jQuery(nextElement).find('.cycle_content .entry-content').stop().animate({
								opacity: 1
							}, 400, function () {
							});
						}
					});
				} else {
					if (jQuery(nextElement).find('.cycle_content .entry-title').length) {
						jQuery(nextElement).find('.cycle_content .entry-title').stop().animate({
							opacity: 1
						}, 400, function () {
							jQuery(nextElement).find('.cycle_content .entry-content').stop().animate({
								opacity: 1
							}, 400, function () {
							});
						});
					} else {
						jQuery(nextElement).find('.cycle_content .entry-content').stop().animate({
							opacity: 1
						}, 400, function () {
						});
					}
				}
			}
		});
		slideshow_iterator++;

	}

}


/**
 * remove width and height attr from Flicker img
 */
function clearFlickerSize() {
	var CLASS = '.flickr_badge_image';

	jQuery(CLASS).each(function () {
		jQuery(this).find('img').removeAttr('width').removeAttr('height');
	});


}

//WooCommerce quiantity

jQuery(function ($) {

	// Quantity buttons
	$('div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)').addClass('buttons_added').append('<input type="button" value="+" class="plus" /><input type="button" value="-" class="minus" />');

	$(document).on('click', '.plus, .minus', function () {

		// Get values
		var $qty = $(this).closest('.quantity').find('.qty'),
				currentVal = parseFloat($qty.val()),
				max = parseFloat($qty.attr('max')),
				min = parseFloat($qty.attr('min')),
				step = $qty.attr('step');

		// Format values
		if (!currentVal || currentVal === '' || currentVal === 'NaN')
			currentVal = 0;
		if (max === '' || max === 'NaN')
			max = '';
		if (min === '' || min === 'NaN')
			min = 0;
		if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN')
			step = 1;

		// Change the value
		if ($(this).is('.plus')) {

			if (max && (max == currentVal || currentVal > max)) {
				$qty.val(max);
			} else {
				$qty.val(currentVal + parseFloat(step));
			}

		} else {

			if (min && (min == currentVal || currentVal < min)) {
				$qty.val(min);
			} else if (currentVal > 0) {
				$qty.val(currentVal - parseFloat(step));
			}

		}

		// Trigger change event
		$qty.trigger('change');

	});

});

//Woo products grid 
function fixGridSizes() {
	jQuery('ul.products').each(function () {


		var items_in_row = Math.ceil(jQuery(this).width() / (jQuery('li.product', this).data('pwidth') + 40));
		//console.log('items per row:' + items_in_row);

//		var pwidth = Math.floor((jQuery(this).width() - items_in_row) / items_in_row - 22);
		var pwidth = Math.floor(jQuery(this).width()/ items_in_row -20) ;

		//console.log('item width:' + pwidth);


		var height = [],
				row = 0;
		jQuery('li.product', this).each(function (i, v) {
			if (!jQuery(this).closest('div.flex-viewport').length) {
				jQuery(this).width(pwidth);
			}
			jQuery(this).css('height', 'auto');
			jQuery('div.product-meta', this).css('height', 'auto');
			var h = Math.ceil(1 + jQuery(this).height());
			if (!height[row]) {
				height[row] = h;
			} else if (height[row] && h > height[row]) {
				height[row] = h;
			}
			if ((i + 1) % items_in_row === 0)
				row++;

		});
		row = 0;

		jQuery('li.product', this).each(function (i, v) {
//				console.log('(' + i + ') height of item at row #' + row + ':' + height[row]);


			jQuery(this).height(height[row]);

			if ((height[row] - 1) > jQuery('div.product-item-wrap', this).outerHeight(true)) {
				var hd = height[row] - 1 - jQuery('div.product-item-wrap', this).outerHeight(true);
				jQuery('div.product-meta', this).css('height', '+=' + hd);
			}


			if ((i + 1) % items_in_row === 0) {
				row++;
			}
			jQuery(this).velocity({opacity: 1}, 200);
		});

	});
}




jQuery(window).on('ready resize', function () {
	fixGridSizes();
});



//Grid item animation

jQuery(document).ready(function () {

	if (ThemeData['woo_catalog_animation'] !== 'false') {
		var delayVhov = 100, setTimeoutVhov;

		jQuery('li.product:not(".product-category")').on('mouseenter', function () {
			var $this = jQuery(this);
			setTimeoutVhov = setTimeout(function () {

				var oHeight = $this.data('oheight');

				$this.height(oHeight);
				$this.addClass('vhov');

				var el = jQuery('.vhov .product-meta');
				var wrap = jQuery('.vhov .product-item-wrap');

				el.velocity('stop').velocity({opacity: 0}, 0).velocity({opacity: 1}, 400);

			}, delayVhov);

		}).on('mouseleave', function () {
			clearTimeout(setTimeoutVhov);

			var el = jQuery('.vhov .product-meta');
			var wrap = jQuery('.vhov .product-item-wrap');

			wrap.velocity('stop');
			jQuery('.product-item-wrap').css({'opacity': '1'});

			el.velocity('stop').velocity({opacity: 0}, 0).velocity({opacity: 1}, 400);


			jQuery(this).removeClass('vhov');
		});
	}

});

// Woocomerce product badge text scale

jQuery(window).resize(function () {

	jQuery('.product-badge.round').each(function () {
		jQuery(this).outerHeight(jQuery(this).outerWidth());
		jQuery(this).css('line-height', jQuery(this).outerWidth() - 1 + "px");
	});

});


// Scroll to reviews tab	

jQuery(window).load(function () {
	jQuery('.woocommerce-review-form').click(function (e) {
		e.preventDefault();
		var $tab = jQuery('.woocommerce-tabs ul.tabs li.reviews_tab a');
		var $tabs_wrapper = $tab.closest('.woocommerce-tabs');

		jQuery('ul.tabs li', $tabs_wrapper).removeClass('active');
		jQuery('div.panel', $tabs_wrapper).hide();
		jQuery('div' + $tab.attr('href'), $tabs_wrapper).show();
		$tab.parent().addClass('active');


		jQuery('html, body').animate({
			scrollTop: jQuery('#review_form').offset().top - 50
		}, 200);


		return false;
	});
});


jQuery(window).load(function () {

	/*Top line shopping cart*/
	var top_cart_config = {
		over: function () {
			jQuery('.topline_shopping_cart').css('display', 'block').animate({opacity: 1, top: 0}, 350);
		},
		interval: 0,
		timeout: 100,
		out: function () {

			jQuery('.topline_shopping_cart').animate({opacity: 0}, 150, function () {
				jQuery(this).css({'display': 'none', 'top': '-15px'});
			});
		}
	};
	jQuery(".topline-cart").hoverIntent(top_cart_config);


	jQuery('.add_to_cart_button').click(function () {

		jQuery('.topline_shopping_cart.widget_shopping_cart').fadeIn('1000', function () {
			setTimeout(function () {
				jQuery('.topline_shopping_cart.widget_shopping_cart').fadeOut('1000');
			}, 5000);
		});
	});

	jQuery("#rating").css({'display': 'block', 'opacity': 0, 'position': 'absolute'});
});

// Remove br tag after sale bafge on woocomerce product shortcode

jQuery(window).ready(function () {
	jQuery('span.onsale + br').remove();
});


// Hide empty space under product title if price not available

jQuery(window).ready(function () {
	if (jQuery('.summary').children().hasClass("woocommerce-product-rating")) {

		if (jQuery('.summary p.price').text() == "") {
			jQuery('.summary p.price').css('padding-bottom', '0px');
		}
	} else {
		if (jQuery('.summary p.price').text() == "") {
			jQuery('.summary p.price').css('padding-bottom', '7px');
		}
	}
});

// Add class to body if content width more than 1200px

jQuery(window).ready(function () {
	if (jQuery('#main > .row').width() >= 1200 || jQuery('body > .wrapper').width() >= 1200) {
		jQuery('body').addClass('wider');
	}
});

// Open review_tab

jQuery(' a.open_review_tab').click(function (e) {
	e.preventDefault();
	var $tab = jQuery('.woocommerce-tabs ul.tabs li.reviews_tab a');
	var $tabs_wrapper = $tab.closest('.woocommerce-tabs');

	jQuery('ul.tabs li', $tabs_wrapper).removeClass('active');
	jQuery('div.panel', $tabs_wrapper).hide();
	jQuery('div' + $tab.attr('href'), $tabs_wrapper).show();
	$tab.parent().addClass('active');


	jQuery('html, body').animate({
		scrollTop: jQuery('.woocommerce-tabs').offset().top - 50
	}, 200);


	return false;
});

// Woocommerce product preloader when added item to cart

jQuery(window).load(function () {
	jQuery('.products .product .add_to_cart_button.product_type_simple').click(function (e) {
		var $add_to_cart_button = jQuery(this);

		$add_to_cart_button.closest('.product').find('.product_preloader').find('i').removeClass('fa-check').addClass('fa-cog fa-spin').hide().fadeIn(600);
		$add_to_cart_button.closest('.product').find('.product_preloader').fadeIn(600);
		setTimeout(function () {
			$add_to_cart_button.closest('.product').find('.product_preloader').find('i').hide().removeClass('fa-cog fa-spin').addClass('fa-check').fadeIn();

			setTimeout(function () {
				$add_to_cart_button.closest('.product').find('.product_preloader').find('i').fadeOut();
				$add_to_cart_button.closest('.product').find('.product_preloader').fadeOut();
			}, 2000);
		}, 2000);
	});
});