/*
 * Copyright (c) OpenStart 2016
 */

$.fn.dropdown = function ()
{
	var coll = $(this);

	return coll.each(function ()
	{
		var dropElem  = $(this),
			closeTime = dropElem.data('closeTime') || 300,
			showTime  = dropElem.data('showTime') || 400,
			display   = dropElem.data('drop-down-display') || 'block',
			hideTimer,
			showTimer;

		dropElem.mouseenter(function ()
		{
			if (hideTimer) clearTimeout(hideTimer);

			var $this = this;

			showTimer = setTimeout(function ()
			{
				$('>:last', dropElem).css({'display': display}).addClass('active');
				if(dropElem.children('.submenu').hasClass('active'))
					dropElem.addClass('active');

				coll.not($this).not($($this).parents()).each(function ()
				{
					if ($('>:last input:focus', $(this)).length == 0)
						$('>:last', this).css({'display': 'none'});

				});
			}, showTime);

		}).mouseleave(function ()
		{
			if ($('>:last input:focus', dropElem).length == 0)
			{
				if (showTimer) clearTimeout(showTimer);

				hideTimer = setTimeout(function ()
				{
					if(dropElem.children('.submenu').hasClass('active'))
						dropElem.removeClass('active');
					$('>:last', dropElem).css({'display': 'none'}).removeClass('active');

				}, closeTime);
			}
		});

		$('body').click(function (e)
		{
			var focused = $('>:last input:focus', dropElem),
				target  = $(e.target),
				flag    = true;

			if (target.parents('.drop-down-h').length)
			{
				flag = false;
			}
			if (focused.length == 0 && !$(this).data('close-to') && flag)
				$('>:last', dropElem).css({'display': 'none'});
		});
	});
};