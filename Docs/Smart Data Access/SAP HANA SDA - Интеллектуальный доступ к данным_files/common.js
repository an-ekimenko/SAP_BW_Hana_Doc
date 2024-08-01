$(function () {
	// Tooltips
	$(".tooltip[title]").each(function () {
		var pos    = $(this).data("tooltip-position"),
			params = {
				show: false,
				hide: false
			};

		switch (pos) {
			case "top":

				params.position = {
					my: "center bottom",
					at: "center top"
				};

				break;
		}

		$(this).tooltip(params);
	});

	// Выпадающие элементы
	if ($(".drop-down-h").length) {
		os.require("jquery/plugins/os.dd-menu/drop-down-menu", function () {
			$(".drop-down-h").filter(":not(\".inactive\")").dropdown();
		});
	}

	// Подгрузка виджета к аватаркам
	var avatars = $("a[href^=\"/cabinet/\"]").filter(function () {
		return /^\/cabinet\/\d+\/$/.test($(this).attr("href"));
	});
	if (avatars.length) {
		os.require("../appearances/sapland-2012/users/widgets/user-profile", function () {
			avatars.userProfile();
		});
	}

	// Подключение bsmSelect к select'ам с множественным выбором
	var $multiple = $("select[multiple]").not(".no-asmselect,.no-auto");
	if ($multiple.length) {
		js.css("../js/jquery/plugins/bsmselect/jquery.bsmselect.css");
		os.require("jquery/plugins/bsmselect/jquery.bsmselect", function () {
			os.require("jquery/plugins/bsmselect/jquery.bsmselect.sortable",
				function () {
					$multiple.not("[disabled]").bsmSelect({
						addItemTarget        : "top",
						sortable             : true,
						removeLabel          : "Убрать",
						highlightAddedLabel  : "Добавлено: ",
						highlightRemovedLabel: "Убрано: ",
						plugins              : [
							$.bsmSelect.plugins.sortable()
						]
					})
						.not(".no-asmselect").filter("[disabled]").attr("rows", 1);
				});
		});
	}

	// Кнопки добавления товара в корзину
	var add_to_bsk = $(".to-basket-h");
	if (add_to_bsk.length) {
		require(["modules/goods/order-links"], function () {
			add_to_bsk.toCart();
		});
	}

	// Добавление реферальной ссылки на киниги SAP Press
	/*
	 $('a[href]').each(function() {
	 var $a = $(this);
	 var $href = $a.attr('href');

	 if ($href.match(/sap-press\.com|sappress\.com/))
	 {
	 if ($href.match(/\.html$/))
	 $a.attr('href', $href + '/ref=2V0lTQUZGS0VZQ0hFQ0tTVU1fTVowODU5T');
	 }
	 });
	 */

	// Подключение qtip к ссылкам, имеющим внутри span.hint
	var $hints = $("a span.hint");
	if ($hints.length > 0) {
		require(["jquery-qtip"], function () {
			$hints.each(function () {
				var $title = $(this).closest("a").clone().remove("img").html();
				var $hint  = $(this).html();
				$(this).parent("a").qtip({
					show    : {
						delay: 1
					},
					content : {
						title: {
							text: $title
						},
						text : $hint
					},
					style   : {
						width : {
							min: 600
						},
						title : {
							"background-color": "#2967a2",
							"color"           : "#fff",
							"font-family"     : "Arial",
							"font-size"       : "14px"
						},
						border: {
							radius: 5
						}
					},
					position: {
						target: "mouse",
						adjust: {
							mouse: true
						}
					}
				}).removeAttr("title");
			});
		});
	}

	// Уменьшение картинок в пользовательском контенте по ширине области контента
	$(".content-inner img").each(function () {
		var $img   = $(this);
		var width  = $img.width();
		var height = $img.height();

		var maxWidth = $img.closest(".content-inner, #hivemind-comments").width() - 30;

		if (width > maxWidth) {
			var c = maxWidth / width;
			width *= c;
			height *= c;

			$img.width(width).height(height).closest("#content table, .content table")
				.removeAttr("width").css({
				width: "auto"
			});
		}
	});

	// Кнопка "Читать позже"
	$(".add-read-btn-h").click(function () {
		//Определяем команду
		var cmd;
		var btn = $(this);
		if (btn.hasClass("outlist")) {
			cmd = "add";
		}
		else {
			cmd = "delete";
		}
		//os.debug($(this).data('material-id'));
		os.query("/ajax/userReadList/", {
				cmd        : "toggle read list button",
				material_id: $(this).data("materialId"),
				command    : cmd
			}, function (data) {
				if (!data.success) {
					return;
				}

				if (btn.hasClass("outlist")) {
					btn.removeClass("outlist").addClass("inlist").text("Отложено для чтения");
				}
				else {
					btn.removeClass("inlist").addClass("outlist").text("Прочитать позже");
				}

			}, true
		);

	});

	$("select.autosubmit").change(function () {
		if (this.form) {
			$(this.form).submit();
		}
	});

	if ($(".slider").length > 0) {
		os.require("jquery/plugins/os.nav-slider/navigation-slider", function () {
			$(".slider").parent().navSlider();
		});
	}

	var $userContent = $(".user-content");
	if ($userContent.length) {
		require(["jquery/plugins/os.nice-tables"], function () {
			$(".user-content").nicetables();
		});
	}
});