jQuery('.h-user-plate').ready(function ($)
{
	var link = $('.h-user-plate .profile-link, .image-edit-h').attr('title', 'Сменить портрет');

	link.click(function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		var dlg = $('<div style="text-align: center"><img src="/images/ajax/bigcircle-loader.gif" alt="Загрузка..." />').dialog({
			title    : '',
			width    : 500,
			height   : 305,
			buttons  : {
				'Загрузить фото / Сохранить область': function ()
				{
					$('form', dlg).submit();
				}
			},
			close    : function ()
			{
				ias.cancelSelection();
				ias.setOptions({remove: true});
				$(this).dialog('destroy').remove();

			},
			modal    : true,
			resizable: false,

			open: function ()
			{
				var dlg = $(this);
				os.query('/ajax/users/', {
					cmd: 'portrait edit dialog'
				}, function (data)
				{
					if (!data.success)
					{
						os.alert('Произошла ошибка. Приносим извинения.');
						dlg.dialog('close');
						return;
					}

					dlg.html(data.dialog).dialog('option', {title: 'Портрет'}).css({'text-align': 'left'});
					dlg.find('.resize-area').show();

					var processing = false;
					$('form', dlg).submit(function (e)
					{
						e.preventDefault();
						if (processing) return;
						var file = $('input[type=file]', this);
						if (!file.val() && !(os.coord || false)) return;

						var submit = $('button[type=submit]', this);
						processing = true;

						os.query('/ajax/users/', {
							cmd     : 'upload portrait',
							portrait: file.get(0),
							coord   : os.coord
						}, function (data)
						{
							processing = false;
							if (!data.success)
							{
								if (data.error)
									os.alert(data.error);
								else
									os.alert('Произошла ошибка. Приносим извинения.');
								return;
							}

							var selector = 'img[src*="' + (data['old_image'].replace(/^.*?\/r\/[^\/]*?\/(.*)$/, '$1')) + '"]';
							$(selector).each(function ()
							{
								var src = $(this).attr('src') + '',
									old = src.replace(/^.*?\/r\/[^\/]*?\/(.*)$/, '$1');

								if (old == data['old_image'])
								{
									src = src.replace(/\/r\/([^\/]*?)\/.*$/, '/r/$1/' + data.portrait + '?' + Math.random());
									$(this).attr('src', src);
								}
							});

							file.val('');
							dlg.dialog('close');
						}, true);
					});
				});
			}
		});

		$('.ui-front').css({'z-index': 2});
	});

	// Анимируем выпадающее меню
	var m = $('.h-user-plate .profile-menu');
	var h = 0;
	$('.h-user-plate .uname').hover(function ()
	{
		m.show();
		if (h == 0)
			h = m.height();
		m.height(0);
		m.stop().animate({height: h}, 250);
	}, function ()
	{
		m.stop().animate({height: 0}, 250, function ()
		{
			$(this).hide();
		});
	});

	$('.h-user-plate .profile-menu li').hover(
		function ()
		{
			$(this).css('background', '#5885aC');
		},
		function ()
		{
			$(this).css('background', '#28558C');
		}
	);

	// Убирание текстов по-умолчанию из формы входа
	$('#login-form input[type=text], #login-form input[type=password]').focus(function ()
	{
		if ($(this).data('changed')) return;
		$(this).data('changed', true).data('val', $(this).val()).val('');
	}).blur(function ()
	{
		if (!$(this).val())
			$(this).data('changed', false).val($(this).data('val'));
	});
});