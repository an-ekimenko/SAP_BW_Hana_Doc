$(document).ready(function ()
{
	if (window.location.pathname.split('/')[1] == 'interviews')
		return false;

	var rubric = $.cookie('rubric');
	var services = $.cookie('services');

	if (services == 'off')
		$('.mvs-menu > ul').addClass('slideoff').css('display', 'none');

	if (rubric == 'off')
		$('.mv-menu > ul').addClass('slideoff').css('display', 'none');

	$('.mvs-menu > h3').click(function ()
	{
		var $mvs = $('.mvs-menu > ul');
		if ($mvs.hasClass('slideoff'))
			$mvs.slideDown(600).removeClass('slideoff');
		else
			$mvs.slideUp(600).addClass('slideoff');

		if ($mvs.hasClass('slideoff'))
			$.cookie('services', 'off', {path: '/'});
		else
			$.cookie('services', 'on', {path: '/'});
	});

	$('.mv-menu > h3').click(function ()
	{
		var $mv = $('.mv-menu > ul');
		if ($mv.hasClass('slideoff'))
			$mv.slideDown(600).removeClass('slideoff');
		else
			$mv.slideUp(600).addClass('slideoff');

		if ($mv.hasClass('slideoff'))
			$.cookie('rubric', 'off', {path: '/'});
		else
			$.cookie('rubric', 'on', {path: '/'});
	});
});
