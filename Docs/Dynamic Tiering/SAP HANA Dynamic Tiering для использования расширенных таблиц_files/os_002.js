/*
 * Copyright (c) OpenStart 2016
 */

(function (window)
{
	if (window.os != undefined)
		return;

	var os = {
		seed: '',

		_queryBeforeSend: function (jqXHR, settings)
		{
			jqXHR._callback = settings._callback;
		},
		_queryComplete  : function (jqXHR)
		{
			if (jqXHR.readyState == 0)
				return;
			var response = $.extend({
				_css        : [],
				_general_log: [],
				_sql_log    : [],
				js          : {},
				text        : ''
			}, $.parseJSON(jqXHR.responseText || '{}'));
			$.each(response._css, function ()
			{
				os.css('../..' + this.replace(/\.css$/, ''));
			});

			if (response.js._general_log)
			{
				response._general_log = response.js._general_log;
				delete response.js._general_log;
			}

			$.each(response._general_log, function ()
			{
				if (console && typeof console.log == 'function')
					console.log('AJAX Log: ' + this);
			});
			if (response._sql_log.length)
			{
				if (window.hackerConsole)
				{
					window.hackerConsole.out(jqXHR.responseURL, '', 'AJAX SQL');
					$.each(response._sql_log, function (i, sql)
					{
						window.hackerConsole.out(sql.query, sql.call, 'AJAX SQL');
						window.hackerConsole.out(' -- ' + sql.time + ' ms', jqXHR.responseURL, 'AJAX SQL');
					});
				}
				else if (console && typeof console.table == 'function')
				{
					console.table(response._sql_log);
				}
			}
			jqXHR._callback(response.js, response.text, jqXHR);
		},
		/**
		 * Ajax-запрос
		 *
		 * @param url
		 *            Адрес
		 * @param [params]
		 *            Хэш передаваемых данных
		 * @param [callback]
		 *            Функция обратного вызова (data, text, jqXHR), вызываемая
		 *            после ответа сервера
		 * @param [disable_caching]
		 *            Кэшировать ли запрос
		 *
		 * @return jqXHR
		 */
		query           : function (url, params, callback, disable_caching)
		{
			params   = params || {};
			callback = callback || function ()
				{
				};

			var queryText = [];
			var queryElem = [];
			var queryObj  = {};
			if (!this._hash2query(params, null, queryText, queryElem, queryObj))
				throw new Error('Ошибка кодирования данных для отправки');

			params = queryObj;

			if (queryElem.length)
			{
				console.log(queryElem);

				var data = new FormData();

				for (var i = 0; i < queryElem.length; i++)
				{
					console.log(i, queryElem[i]);

					var element  = queryElem[i],
						$element = $(element.e);

					if (!$element.is('input[type=file]'))
					{
						console.log($element);

						throw new Error('Можно отправлять только html-элементы с типом file');
					}

					var files = element.e.files;

					if (files.length == 1)
					{
						data.append(element.name, files[0]);
					}
					else
					{
						$.each(files, function (k, f)
						{
							data.append(element.name + '[]', f);
						})
					}
				}
			}

			var queryParams = {
				cache     : !(disable_caching || false),
				beforeSend: this._queryBeforeSend,
				complete  : this._queryComplete,
				type      : 'POST',
				dataType  : 'json',
				data      : params,
				_callback : function (data, text)
				{
					"use strict";

					if (!data['success'] && os['debug_mode'])
					{
						var message = text;
						if (data['exception'] && data['exception']['message'])
							message += ' <br/>' + data['exception']['message'];

						if (message) {
							os.alert(message, "Ошибка", {
								resizable: true,
								width    : "auto"
							});
						}
					}

					callback(data, text);
				}
			};

			if (data !== undefined)
			{
				queryParams.cache = false;

				$.each(params, function (key, val)
				{
					data.append(key, val);
				});

				queryParams.data        = data;
				queryParams.processData = false;
				queryParams.contentType = false;
			}

			return $.ajax(url, queryParams);
		},

		/**
		 * Convert hash to QUERY_STRING.
		 * If next value is scalar or hash, push it to queryText.
		 * If next value is form element, push [name, element] to queryElem.
		 *
		 * @license LGPL
		 * @author Dmitry Koterov, http://en.dklab.ru/lib/JsHttpRequest/
		 * @version 5.x $Id$
		 *
		 * @author Anthony Perfiliev
		 *
		 * @param {Object} content
		 * @param {string|null} prefix
		 * @param {Array} queryText
		 * @param {Array} queryElem
		 * @param {Object} queryObj
		 * @returns {boolean}
		 * @private
		 */
		_hash2query: function (content, prefix, queryText, queryElem, queryObj)
		{
			if (prefix == null) prefix = "";
			if (('' + typeof(content)).toLowerCase() == 'object')
			{
				var formAdded = false;
				if (content && content.parentNode && content.parentNode.appendChild && content.tagName && content.tagName.toUpperCase() == 'FORM')
				{
					content = {form: content};
				}
				for (var k in content)
				{
					if (!content.hasOwnProperty(k))
						continue;

					var v = content[k];
					if (v instanceof Function) continue;
					var curPrefix     = prefix ? prefix + '[' + this.escape(k) + ']' : this.escape(k);
					var isFormElement = v && v.parentNode && v.parentNode.appendChild && v.tagName;
					if (isFormElement)
					{
						var tn = v.tagName.toUpperCase();
						if (tn == 'FORM')
						{
							// FORM itself is passed.
							formAdded = true;
						}
						else if (tn == 'INPUT' || tn == 'TEXTAREA' || tn == 'SELECT')
						{
							// This is a single form element.
						}
						else
						{
							return this._error('inv_form_el' + (v.name || '') + v.tagName);
						}
						queryElem[queryElem.length] = {name: curPrefix, e: v};
					}
					else if (v instanceof Object)
					{
						this._hash2query(v, curPrefix, queryText, queryElem, queryObj);
					}
					else
					{
						// We MUST skip NULL values, because there is no method
						// to pass NULL's via GET or POST request in PHP.
						if (v === null) continue;
						// Convert JS boolean true and false to corresponding PHP values.
						if (v === true) v = 1;
						if (v === false) v = '';
						queryText[queryText.length] = curPrefix + "=" + this.escape('' + v);
						queryObj[curPrefix]         = '' + v;
					}
					if (formAdded && queryElem.length > 1)
					{
						return this._error('must_be_single_el');
					}
				}
			}
			else
			{
				queryText[queryText.length] = content;
			}
			return true;
		},

		/**
		 * @license LGPL
		 * @author Dmitry Koterov, http://en.dklab.ru/lib/JsHttpRequest/
		 * @version 5.x $Id$
		 *
		 * @param {string} msg
		 * @private
		 */
		_error: function (msg)
		{
			msg = "JsHttpRequest: " + msg;
			if (!window.Error)
			{
				// Very old browser...
				throw msg;
			}
			else if ((new Error(1, 'test')).description == "test")
			{
				// We MUST (!!!) pass 2 parameters to the Error() constructor for IE5.
				throw new Error(1, msg);
			}
			else
			{
				// Mozilla does not support two-parameter call style.
				throw new Error(msg);
			}
		},

		/**
		 * @license LGPL
		 * @author Dmitry Koterov, http://en.dklab.ru/lib/JsHttpRequest/
		 * @version 5.x $Id$
		 *
		 * @param {string} s
		 * @returns {string}
		 */
		escape: function (s)
		{
			return encodeURI(s).replace(new RegExp('\\+', 'g'), '%2B');
		},

		/**
		 * Загрузка запрошенных скриптов асинхронно с выполнением
		 * callback-функции по-завершению
		 *
		 * @deprecated
		 *
		 * @param {Array|string} scripts
		 * @param {function} [callback]
		 */
		require            : function (scripts, callback)
		{
			"use strict";

			// Проверяем правильность параметров
			//noinspection JSValidateTypes
			if (scripts == undefined
				|| (!(scripts instanceof Array) && !(scripts instanceof String) && typeof scripts != 'string'))
				return false;

			// Приводим переменную scripts к массиву
			if (scripts instanceof String || typeof scripts == 'string')
				scripts = [
					scripts
				];
			else
				scripts = scripts.sort();

			var files = [];
			$.each(scripts, function (k, s)
			{
				if (s instanceof Array)
				{
					$.each(s, function (l, ss)
					{
						files.push(ss);
					})
				}
				else
					files.push(s);
			});

			require(files, callback);
		},
		requireCallbacks   : {},
		requireScripts     : {},
		requireLoadedStatus: {},
		requireRoot        : '/os/js/',
		getStorage         : function ()
		{
			try
			{
				if ('localStorage' in window && window['localStorage'] !== null)
					return window.localStorage;
				else
					return false;
			}
			catch (e)
			{
				return false;
			}
		},
		clearStorage       : function ()
		{
			var storage = this.getStorage();
			if (storage !== false)
			{
				storage.clear();
				location.reload();
			}
		},

		queues: {},
		plan  : function (fn, fn_name, plan_name)
		{
			if (plan_name == undefined)
				plan_name = 'common';

			if (this.queues[plan_name] == undefined)
				this.queues[plan_name] = {
					_counter: 1
				};

			if (fn_name == null)
				fn_name = 'fn' + this.queues[plan_name]._counter++;

			this.queues[plan_name][fn_name] = fn;
		},
		run   : function (plan_name)
		{
			if (plan_name == undefined)
				plan_name = 'common';

			if (this.queues[plan_name] != undefined)
			{
				//noinspection JSUnusedLocalSymbols
				$.each(this.queues[plan_name], function (key, val)
				{
					if (key == '_counter')
						return;
					this(key);
				});
			}

			delete this.queues[plan_name];
		},

		alert: function (text, title, options, ok_text)
		{
			if (ok_text == undefined)
				ok_text = 'Ok';
			if (title == undefined)
				title = 'Сообщение';

			var buttons      = {};
			buttons[ok_text] = function ()
			{
				$(this).dialog('close');
			};

			$('<div><p>' + text + '</p></div>').css({
				overflow: 'auto'
			}).dialog($.extend({
				modal    : true,
				title    : title,
				close    : function ()
				{
					$(this).dialog('destroy').remove();
				},
				resizable: false,
				buttons  : buttons
			}, options));

		},

		confirm: function (text)
		{
			return confirm(text);
		},
		prompt : function (text)
		{
			return prompt(text);
		},

		login: function (text, caption, options)
		{

			options = $.extend({}, options);

			if (text == undefined)
				text = 'Для данного действия необходимо войти на сайт или зарегистрироваться';
			var login = $('#login-form');
			if (login.size() == 1)
			{
				$(
					'<div class="autth">'
					+ '<div class="text">'
					+ text
					+ '</div>'
					+ '<p class="link">'
					+ '<a href="?auth%5Breset_password%5D">Забыли пароль?</a><br />'
					+ '<a href="/register/">Зарегистрироваться</a><br />'
					+ '</p>'
					+ '</div>'
				)
					.find('div').append(login.clone()).end()
					.find('.user-plate').removeClass('user-plate').end()
					.find('div.forgot').remove().end()
					.find('td form').css({padding: '10px 0'}).end()
					.find('input[name=log], input[name=ps]').val('').end()
					.find('#login-form').append('<input type="hidden" name="return_to"/>').find('input[name="return_to"]').val(options['return'] || '').end().end()
					.dialog({
						modal    : true,
						title    : 'Авторизация',
						width    : 'auto',
						height   : 'auto',
						position : 'auto',
						resizable: false,
						close    : function ()
						{
							$(this).dialog('destroy').remove();
						}
					});
			}
			else
			{
				os.alert(text);
			}
		},

		loading: function (state, selector)
		{
			var $loader = $('.ajax-loader');
			if (selector != null)
				$loader = $loader.find(selector);
			if ($loader.size() > 0)
			{
				if (state)
					$loader.fadeIn();
				else
					$loader.fadeOut();
			}
		},

		whatHappened: function (data)
		{
			if (data.error != undefined)
			{
				switch (data.error)
				{
					case 'NO_USER':
						alert('Необходимо выполнить вход на сайт');
						break;
					case 'USER_HAVE_NO_RIGHTS':
						alert('У Вас недостаточно прав');
						break;

					default:
						break;
				}
			}
		},

		debug: function ($var, backtrace)
		{
			if (typeof (console) != 'undefined')
			{
				if (backtrace)
				{
					if (typeof (console.groupCollapsed) == 'function')
						console.groupCollapsed($var);
					if (typeof (console.trace) == 'function')
						console.trace();
					if (typeof (console.groupEnd) == 'function')
						console.groupEnd();
				}
				else
				{
					if (typeof (console.debug) == 'function')
						console.debug($var);
				}
			}
		},

		error: function (message)
		{
			if (typeof (console) != 'undefined' && typeof (console.error) == 'function')
			{
				console.error(message);
			}
		},

		pluralRu: function (number, word)
		{
			var parts = word.split(/\|/);
			var form1 = parts[0];
			var form2 = parts[1];
			var form5 = parts[2] || form2;

			var n  = Math.abs(number) % 100;
			var n1 = n % 10;

			if (n > 10 && n < 20)
				return form5;
			if (n1 > 1 && n1 < 5)
				return form2;
			if (n1 == 1)
				return form1;
			return form5;
		},

		dlg: '<div style="text-align: center"><img src="/images/ajax/bigcircle-loader.gif" alt="Загрузка..." />',

		styleRootUrl: '/os/css/',
		addedCss    : {},
		css         : function (path)
		{
			path = path + '.css';
			if (this.addedCss[path])
				return;

			var $link = $('<link/>').attr('type', 'text/css').attr('rel', 'stylesheet').attr(
				'href', this.styleRootUrl + path);
			$('head link:last').after($link);

			this.addedCss[path] = true;
		},

		/**
		 * Возвращает callback-функцию, которую можно передать в параметр source виджета autocomplete jQueryUI
		 *
		 * @param {string} url
		 * @param {Object} [cmd]
		 * @param {boolean} [disable_caching]
		 */
		autocomplete_proxy: function (url, cmd, disable_caching)
		{
			return function (request, response)
			{
				os.query(url, {
					cmd : cmd,
					term: request.term
				}, function (data)
				{
					if (!data.success)
					{
						response([]);
						return;
					}
					response(data.response);
				}, disable_caching);
			}
		}
	};

	window.os = os;
})(window);

(function ($)
{
	var fns = {
		disable : function ()
		{
			$(this).prop('disabled', true);

			return this;
		},
		enable  : function ()
		{
			$(this).prop('disabled', false);

			return this;
		},
		scrollTo: function (options)
		{
			var element = $(this).first();

			if (element.length == 0) return this;

			var opts = $.extend({
				horizontal: false,
				vertical  : true,
				speed     : 400,
				complete  : function ()
				{
				}
			}, options);

			if (!opts.vertical && !opts.horizontal) return this;

			var animation = {};
			if (opts.horizontal) animation.scrollLeft = element.offset().left;
			if (opts.vertical) animation.scrollTop = element.offset().top;
			var called = false;
			$('html, body').animate(animation, opts.speed, function ()
			{
				if (!called)
				{
					called = true;
					opts.complete.apply(element);
				}
			});

			return this;
		}
	};

	$.extend($.fn, fns);
})(jQuery);