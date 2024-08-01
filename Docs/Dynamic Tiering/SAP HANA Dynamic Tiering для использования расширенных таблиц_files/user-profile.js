$.fn.userProfile = function() {
	var avatars = this.filter(function(i) {
		return /^\/cabinet\/\d+\/$/.test($(this).attr('href'));
	});

	if (avatars.length)
	{
		js.css('../lib/qtip2/jquery.qtip.min.css');
		js.css('../appearances/sapland-2012/users/widgets/user-profile.css');
		os.require('../lib/qtip2/jquery.qtip.min', function() {
			avatars.each(function() {
				var elm = $(this);
				elm.qtip({
					content: {
						text: 'Загрузка...',
						ajax: {
							url: '/ajax/users/',
							type: 'POST',
							data: {
								cmd: 'get user profile widget',
								cabinet_url: elm.attr('href')
							},
							dataType: 'json',
							success: function(data) {
								this.set('content.text', data.text);
							}
						}
					},
					position: {
						my: 'bottom left',
						at: 'top center',
						viewport: $(window),
						effect: false,
						adjust: {
							x: -50,
							y: 10
						}
					},
					show: {
						delay: 500,
						solo: true
					},
					hide: {
						delay: 500,
						fixed: true
					},
					style: {
						def: false,
						widget: false,
						width: 436,
						classes: 'no-frame'
					}
				});
			});
		});
	};
	
	return this;
};