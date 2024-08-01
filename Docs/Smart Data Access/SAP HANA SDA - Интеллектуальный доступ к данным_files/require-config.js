/**
 * Created by cyberex on 13.08.15.
 */
"use strict";

require.config({
	waitSeconds: 0, // Без таймаута
	baseUrl    : "/os/js",
	shim       : {
		"web-cola/cola": {
			exports: "cola"
		},
		"select2"      : {
			deps: ["css!Select2/css/select2"]
		},
		"select2-ru"   : {
			deps: ["select2"]
		},
		"jquery-qtip"  : {
			deps: ["jquery"]
		},
		"jstree"       : {
			deps: ["css!b/jstree/dist/themes/default/style.min"]
		},
		"remodal-lib": {
			deps: ["css!/os/js/lib/remodal/remodal.css", "css!/os/js/lib/remodal/remodal-default-theme.css"]
		}
	},
	paths      : {
		"select2"    : "Select2/js/select2",
		"select2-ru" : "Select2/js/i18n/ru",
		"handlebars" : ["//cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.min"/*, 'lib/handlebars/handlebars.min'*/],
		"jquery-qtip": "jquery.qtip.min",
		"jstree"     : "b/jstree/dist/jstree.min",
		"react"      : ["https://fb.me/react-with-addons-15.2.0.min"],
		"react-dom"  : ["https://fb.me/react-dom-15.2.0.min"],
		"jquery-form": ["lib/jquery.form.min"],
		"block-ui"   : ["jquery/plugins/blockUI/jquery.blockUI"],
		"remodal-lib": ["lib/remodal/remodal.min"]
	},
	map        : {
		"*"           : {
			select2: "select2-init"
		},
		"select2-init": {
			select2: "select2"
		},
		"select2-ru"  : {
			select2: "select2"
		}
	}
});
define("jquery", [], function () {
	return window.jQuery;
});
define("jquery/ui", ["jquery"], function ($) {
	return $;
});
define("jquery-ui", ["jquery"], function ($) {
	return $;
});
define("os", [], function () {
	return window.os;
});

// Инициализация select2
define("select2-init", ["jquery", "select2/optgroup-matcher", "select2", "select2-ru"], function ($, matcher, s2) {
	// Устанавливаем matcher, который поддерживает otpgroup и неверную раскладку
	$.fn.select2.defaults.set("matcher", matcher);
	// Делаем select2 шириной 100%, чтобы он подстраивался при изменении размера окна
	$.fn.select2.defaults.set("width", "100%");
	// Подсказка по-умолчанию
	$.fn.select2.defaults.set("placeholder", "Начните набирать");

	return s2;
});