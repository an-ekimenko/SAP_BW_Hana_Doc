function request_post_scan(at_id, button) {
	if(button) {
		button = $(button);
		button.addClass('disabled');
	}

	var req = $.post('/post/scan', {at_id: at_id});
	req.done(function(resp) {
		alert(resp.msg);

		if(button) {
			button.removeClass('disabled');
		}
	});
	req.fail(function() {
		alert('Ошибка отправки запроса на сканирование поста.');

		if(button) {
			button.removeClass('disabled');
		}
	});
}
