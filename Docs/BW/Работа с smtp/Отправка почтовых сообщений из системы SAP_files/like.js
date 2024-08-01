$(function ()
{
	"use strict";

	var showTip = false;

	$('.likes-h')

		.on('mouseenter', function ()
		{
			if (!showTip)
				return;

			var plate = $(this).find('>div:first');
			if ($('.photos-h img', plate).length)
			{
				plate.removeClass('slide-hide');
				plate.removeClass('hide-me');
			}
		})

		.on('mouseleave', function ()
		{
			if (!showTip)
				return;

			var plate = $(this).find('>div:first');
			plate.addClass('hide-me');

			setTimeout(function ()
			{
				if ($(plate).hasClass('hide-me'))
					$(plate).addClass('slide-hide');
			}, 1000);
		})

		// Тогглим лайк
		.on(
			'click',
			'.like-material-h, .dislike-material-h',
			function (e)
			{
				e.preventDefault();

				var link  = $(this);
				var delta = link.hasClass('dislike-material-h') ? -1 : 1;

				var material_id  = $(this).closest('.likes-h').data('material-id');
				var plate        = link.closest('.likes-h').find('>div:first');
				var count        = $('.likes-count-h', $(this).closest('.likes-h'));
				var count_plural = $('.likes-count-plural-h', plate);
				var portraits    = $('.photos', plate);
				var img          = $('img', this);

				os.query(
					'/ajax/materialLikes/',
					{
						cmd        : 'toggle like',
						material_id: material_id,
						delta      : delta
					},
					function (data)
					{
						if (!data.success)
						{
							if (data.no_user)
								os.login();
							return;
						}

						var p = $('<div></div>');
						$(data.users).each(
							function ()
							{
								p.append(
									'<div class="p"><a href="/cabinet/' + this.id
									+ '/"><img class="avatar-50" src="/images/r/48x48p/' + this.avatar
									+ '" alt="" /></div>').find('img:last').attr('title',
									this.name + ' ' + this.fio);
							});
						p.append('<div class="clear"></div>');
						portraits.html(p);

						/*
						 if (data.users.length > 0)
						 {
						 plate.removeClass('slide-hide');
						 } else
						 {
						 plate.addClass('slide-hide');
						 }
						 */

						count.removeClass('positive');
						count.removeClass('negative');
						if (data.like.count > 0)
							count.addClass('positive');
						else if (data.like.count < 0)
						{
							count.addClass('negative');
							data.like.count = -data.like.count;
						}
						$('.like-material', link.closest('.likes-h')).removeClass('active');
						if (data.liked > 0 || data.liked < 0) link.addClass('active');

						count.text(data.like.count);
						count_plural.text(data.count ? ('Понравилось ' + data.count + ' ' + os.pluralRu(
							data.count, 'человеку|людям')) : 'Пока никому не понравилось');

					}, true);
			});
});