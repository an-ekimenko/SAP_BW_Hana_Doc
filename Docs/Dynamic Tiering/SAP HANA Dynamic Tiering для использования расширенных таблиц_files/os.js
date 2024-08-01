(function ($)
{
	$.fn.nicetables = function ()
	{
		return $(this).each(function ()
		{
			$('table', this).add($(this).filter('table')).each(function ()
			{
				$(this).removeAttr('width').removeAttr('cellspacing').removeAttr('cellpadding').removeAttr('border');
				var head = $('>thead tr', this);
				if (head.length == 0)
					head = $('>tr:first,>tbody>tr:first', this);
				head.addClass('header').find('>td,>th').removeAttr('style');
			});
		});
	};
})(jQuery);