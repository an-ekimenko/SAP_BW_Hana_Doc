$(function() {
	$('.materials-list').on('click', 'a.publish, a.unpublish', function(e) {
		e.preventDefault();
		var link = $(this);

		os.query('/ajax/files/', {
			cmd: 'change file publish status',
			material_id: $(this).data('material-id'),
			publish: $(this).hasClass('publish')
		}, function(data, text){
			if (!data.success)
				return;

			if (data.published_date) { // Файл был опубликован
				os.debug('Опубликован');
				link.text('Снять с публикации').removeClass('publish').addClass('unpublish').prev('span').text(data.published_date);
			} else { // Файл был снят с публикации
				os.debug('Снят с публикации');
				link.text('Опубликовать').removeClass('unpublish').addClass('publish').prev('span').text('[Не опубликован]');
			}
		}, true);
	});

	$('.materials-list').on('click', 'a.recommend, a.unrecommend', function(e) {
		e.preventDefault();
		var link = $(this);

		os.query('/ajax/files/', {
			cmd: 'change file recommended status',
			material_id: $(this).data('material-id'),
			recommend: $(this).hasClass('recommend')
		}, function(data, text){
			if (!data.success)
				return;

			if (data.recommended) { // Файл был рекомендован
				link.text('Больше не рекомендовать').removeClass('recommend').addClass('unrecommend').prev('span').show();
			} else { // Файл больше не рекомендован
				link.text('Рекомендовать').removeClass('unrecommend').addClass('recommend').prev('span').hide();
			}
		}, true);
	});

	$('a.play-h-').click(function(e) {
		e.preventDefault();

		var $t = $(this);
		var id = $t.data('material-id');
		var title = $t.data('material-name');

		$(os.dlg).dialog({
			open: function() {
				os.query('/os-adm/os_docs.php?t=files&play='+id, {
					ajax: true
				}, function(data, errors) {

				});
			},
			close: function() {
				$(this).dialog('destroy').remove();
			}
		});
	});

	$('a.play-h').click(function (e)
	{
		e.preventDefault();

		var $t = $(this);
		var id = $t.data('material-id');
		var title = $t.data('material-name');

		$(os.dlg)
			.dialog({
				title    : title,
				close    : function ()
				{
					$(this).remove();
				},
				width    : 'auto',
				height   : 'auto',
				position : 'auto',
				modal    : true,
				resizable: false,
				autoOpen : true,
				open     : function ()
				{
					var $me = $(this);

					os.query('/ajax/files/get-video/', {
						video_id: id
					}, function (data, text)
					{
						$me.html(data.html);
						$me.dialog('option', 'position', 'auto');
					});
				}
			});
	});
});