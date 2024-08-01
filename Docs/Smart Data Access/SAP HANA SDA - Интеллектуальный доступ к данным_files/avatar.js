/*
 * Copyright (c) OpenStart 2018
 */

/**
 * Created by PhpStorm.
 * User: globox
 * Date: 24.09.18
 * Time: 12:52
 */

function processAvatarActionButtons(extraDialogOptions, extraAjaxOptions)
{
	$(".h-user-plate .profile-link, .image-edit-h").click(function (e) {
		e.preventDefault();
		e.stopPropagation();

		var dlg = $("<div style=\"text-align: center\"><img src=\"/images/ajax/bigcircle-loader.gif\" alt=\"Загрузка...\" />").dialog(
			$.extend(
				{
					title    : "",
					width    : 500,
					height   : 305,
					buttons  : {
						"Загрузить фото / Сохранить область": function () {
							$("form", dlg).submit();
						}
					},
					close    : function () {
						$(this).dialog("destroy").remove();

					},
					modal    : true,
					resizable: false,

					open: function () {
						var dlg = $(this);
						os.query("/ajax/users/", $.extend(
							{
								cmd: "portrait edit dialog"
							},
							extraAjaxOptions
						), function (data) {
							if (!data.success) {
								os.alert("Произошла ошибка. Приносим извинения.");
								dlg.dialog("close");
								return;
							}

							dlg.html(data.dialog).dialog("option", {title: "Портрет"}).css({"text-align": "left"});

							setTimeout(function () {
								dlg.find(".resize-area").show();
							}, 0);

							var processing = false;
							$("form", dlg).submit(function (e) {
								e.preventDefault();
								if (processing) {
									return;
								}
								var file = $("input[type=file]", this);
								if (!file.val() && !(os.coord || false)) {
									return;
								}

								processing = true;

								os.query("/ajax/users/",
									$.extend(
										{
											cmd     : "upload portrait",
											portrait: file.get(0),
											coord   : os.coord
										},
										extraAjaxOptions
									), function (data) {
										processing = false;
										if (!data.success) {
											if (data.error) {
												os.alert(data.error);
											}
											else {
												os.alert("Произошла ошибка. Приносим извинения.");
											}
											return;
										}

										var oldImage = data["old_image"];

										$("img[src*=\"" + (oldImage.replace(/^.*?\/r\/[^\/]*?\/(.*)$/, "$1")) + "\"]").each(function () {
											var src = $(this).attr("src") + "";

											if (src.replace(/^.*?\/r\/[^\/]*?\/(.*)$/, "$1").split("?")[0] === oldImage) {
												$(this).attr("src",
													src.replace(/\/r\/([^\/]*?)\/.*$/, "/r/$1/" + data.portrait + "?" + Math.random()));
											}
										});

										file.val("");
										$(".image-delete").removeClass("hide");
										dlg.dialog("close");
									}, true);
							});
						});
					}
				},
				extraDialogOptions
			)
		);

		$(".ui-front").css({"z-index": 2});
	});

	$(".image-delete").click(function (e) {
		os.queryWithConfirmation(e, "users", $.extend(
			{
				cmd: "delete portrait"
			},
			extraAjaxOptions
		));
	});
}