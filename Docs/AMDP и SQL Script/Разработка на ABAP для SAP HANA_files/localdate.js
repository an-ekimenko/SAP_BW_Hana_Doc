$(function() {
	moment.locale('ru');

	$('.localdate').each(function(i, elm) {
		elm = $(elm);


		var today = moment().startOf('day');
		var yesterday = today - moment.duration(1, 'days');


		var date = elm.data('date');
		var humanly = (elm.data('humanly') !== undefined ? elm.data('humanly') : true);
		var show_time = (elm.data('showtime') !== undefined ? elm.data('showtime') : true);

		var not_show_date = elm.data('notshowdate');

		if(date === undefined) {
			return;
		} else {
			date = moment(date, 'DD-MM-YYYY HH:mm:ss ZZ');
			date = date.tz(moment.tz.guess());
		}
		if(not_show_date !== undefined) {
			not_show_date = moment(not_show_date, 'DD-MM-YYYY ZZ');
			not_show_date = not_show_date.tz(moment.tz.guess());
		}


		var str = '';

		if(!humanly || date.isBefore(yesterday, 'day')) {
			var fmt = [];
			if(not_show_date === undefined || !date.isSame(not_show_date, 'day')) {
				fmt.push('D MMMM');

				if(!humanly || date.year() != today.year()) {
					fmt.push('YYYY')
				}
			}
			if(show_time) {
				fmt.push('[в] H:mm');
			}
			str = date.format(fmt.join(' '));
		} else {
			str = date.calendar().toLowerCase();
		}


		elm.text(str);
	});
});
