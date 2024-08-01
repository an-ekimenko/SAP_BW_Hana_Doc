jQuery(".h-user-plate").ready(function ($) {

	$(".h-user-plate .profile-link, .image-edit-h").attr("title", "Сменить портрет");

	processAvatarActionButtons();

	// Анимируем выпадающее меню
	var m = $(".h-user-plate .profile-menu");
	var h = 0;
	$(".h-user-plate .uname").hover(function () {
		m.show();
		if (h == 0) {
			h = m.height();
		}
		m.height(0);
		m.stop().animate({height: h}, 250);
	}, function () {
		m.stop().animate({height: 0}, 250, function () {
			$(this).hide();
		});
	});

	$(".h-user-plate .profile-menu li").hover(
		function () {
			$(this).css("background", "#5885aC");
		},
		function () {
			$(this).css("background", "#28558C");
		}
	);

	// Убирание текстов по-умолчанию из формы входа
	$("#login-form input[type=text], #login-form input[type=password]").focus(function () {
		if ($(this).data("changed")) {
			return;
		}
		$(this).data("changed", true).data("val", $(this).val()).val("");
	}).blur(function () {
		if (!$(this).val()) {
			$(this).data("changed", false).val($(this).data("val"));
		}
	});
});