cpServices.factory('languageService', function() {
	  var languageService = {};

	  var languages = [
			{
				native: 'English',
				code: 'en-US'
			},
	   		{
				native: 'العربية (Arabic)',
				code: 'ar-SA'
					
			},
			{
				native: 'Български (Bulgarian)',
				code: 'bg-BG'
			},
			{
				native: 'Català (Catalan)',
				code: 'ca-ES'
			},
			{
				native: '简体中文 (Chinese Simplified)',
				code: 'zh-CN'
			},
			{
				native: '繁體中文 (Chinese Traditional)',
				code: 'zh-TW'
			},
			{
				native: 'Hrvatski (Croatian)',
				code: 'hr-HR'
			},
			{
				native: 'Čeština (Czech)',
				code: 'cs-CZ'
			},
			{
				native: 'Dansk (Danish)',
				code: 'da-DK'
			},
			{
				native: 'Nederlands (Dutch)',
				code: 'nl-NL'
			},
			{
				native: 'Eesti (Estonian)',
				code: 'et-EE'
			},
			{
				native: 'Suomi (Finnish)',
				code: 'fi-FI'
			},
			{
				native: 'Français (French)',
				code: 'fr-FR'
			},
			{
				native: 'Deutsch (German)',
				code: 'de-DE'
			},
			{
				native: 'Ελληνικά (Greek)',
				code: 'el-GR'
			},
			{
				native: 'עברית (Hebrew)',
				code: 'he-IL'
			},
			{
				native: 'हिन्दी (Hindi)',
				code: 'hi-IN'
			},
			{
				native: 'Magyar (Hungarian)',
				code: 'hu-HU'
			},
			{
				native: 'Italiano (Italian)',
				code: 'it-IT'
			},
			{
				native: 'Bahasa Indonesia (Indonesian)',
				code: 'id-ID'
			},
			{
				native: '日本語 (Japanese)',
				code: 'ja-JP'
			},
			{
				native: 'Қазақ тілі (Kazakh)',
				code: 'kk-KZ'
			},
			{
				native: '한국어 (Korean)',
				code: 'ko-KR'
			},
			{
				native: 'Lietuvių (Lithuanian)',
				code: 'lt-LT'
			},
			{
				native: 'Latviešu (Latvian)',
				code: 'lv-LV'
			},
			{
				native: 'Bahasa Malaysia (Malay)',
				code: 'ms-MY'
			},
			{
				native: 'Norsk (Norwegian)',
				code: 'nb-NO'
			},
			{
				native: 'Polski (Polish)',
				code: 'pl-PL'
			},
			{
				native: 'Português (Portuguese)',
				code: 'pt-BR'
			},
			{
				native: 'Română (Romanian)',
				code: 'ro-RO'
			},
			{
				native: 'Русский (Russian)',
				code: 'ru-RU'
			},
			{
				native: 'Српски (Serbian)',
				code: 'sr-RS'
			},
			{
				native: 'Slovenčina (Slovak)',
				code: 'sk-SK'
			},
			{
				native: 'Slovenščina (Slovenian)',
				code: 'sl-SI'
			},
			{
				native: 'Español (Spanish)',
				code: 'es-ES'
			},
			{
				native: 'Svenska (Swedish)',
				code: 'sv-SE'
			},
			{
				native: 'ไทย (Thai)',
				code: 'th-TH'
			},
			{
				native: 'Türkçe (Turkish)',
				code: 'tr-TR'
			},
			{
	            native: 'Українська (Ukranian)',
	            code: 'uk-UA'
	        },
			{
				native: 'Tiếng Việt (Vietnamese)',
				code: 'vi-VN'
			},
			{
				native: 'Cymraeg (Welsh)',
				code: 'cy-GB'
			},
		];

	  	var secondaryLanguages = [
			{
				native: 'English (United States of America)',
				code: 'en-US'
			},
			{
				native: 'English (Canada)',
				code: 'en-CA'
			},
			{
				native: 'English (United Kingdom)',
				code: 'en-GB'
			},
    		{
    			native: 'العربية (Arabic)',
    			code: 'ar-SA'
    				
    		},
    		{
    			native: 'Български (Bulgarian)',
    			code: 'bg-BG'
    		},
    		{
    			native: 'Català (Catalan)',
    			code: 'ca-ES'
    		},
    		{
    			native: '香港繁體中文 (Chinese Hong Kong)',
    			code: 'zh-HK'
    		},
    		{
    			native: '简体中文 (Chinese Simplified)',
    			code: 'zh-CN'
    		},
    		{
    			native: '繁體中文 (Chinese Traditional)',
    			code: 'zh-TW'
    		},
    		{
    			native: 'Hrvatski (Croatian)',
    			code: 'hr-HR'
    		},
    		{
    			native: 'Čeština (Czech)',
    			code: 'cs-CZ'
    		},
    		{
    			native: 'Dansk (Danish)',
    			code: 'da-DK'
    		},
    		{
    			native: 'Nederlands (Dutch)',
    			code: 'nl-NL'
    		},
    		{
    			native: 'Eesti (Estonian)',
    			code: 'et-EE'
    		},
    		{
    			native: 'Suomi (Finnish)',
    			code: 'fi-FI'
    		},
    		{
    			native: 'Français (French)',
    			code: 'fr-FR'
    		},
    		{
    			native: 'Français Canadien (French for Canada)',
    			code: 'fr-CA'
    		},
    		{
    			native: 'Deutsch (German)',
    			code: 'de-DE'
    		},
    		{
    			native: 'Ελληνικά (Greek)',
    			code: 'el-GR'
    		},
    		{
    			native: 'עברית (Hebrew)',
    			code: 'he-IL'
    		},
    		{
    			native: 'हिन्दी (Hindi)',
    			code: 'hi-IN'
    		},
    		{
    			native: 'Magyar (Hungarian)',
    			code: 'hu-HU'
    		},
    		{
    			native: 'Italiano (Italian)',
    			code: 'it-IT'
    		},
    		{
    			native: 'Bahasa Indonesia (Indonesian)',
    			code: 'id-ID'
    		},
    		{
    			native: '日本語 (Japanese)',
    			code: 'ja-JP'
    		},
    		{
    			native: 'Қазақ тілі (Kazakh)',
    			code: 'kk-KZ'
    		},
    		{
    			native: '한국어 (Korean)',
    			code: 'ko-KR'
    		},
    		{
    			native: 'Lietuvių (Lithuanian)',
    			code: 'lt-LT'
    		},
    		{
    			native: 'Latviešu (Latvian)',
    			code: 'lv-LV'
    		},
    		{
    			native: 'Bahasa Malaysia (Malay)',
    			code: 'ms-MY'
    		},
    		{
    			native: 'Монгол хэл (Mongolian)',
    			code: 'mn-MN'
    		},
    		{
    			native: 'Norsk (Norwegian)',
    			code: 'nb-NO'
    		},
    		{
    			native: 'Polski (Polish)',
    			code: 'pl-PL'
    		},
    		{
    			native: 'Português do Brasil (Portuguese for Brazil)',
    			code: 'pt-BR'
    		},
    		{
    			native: 'Português do Portugal (Portuguese for Portugal)',
    			code: 'pt-PT'
    		},
    		{
    			native: 'Română (Romanian)',
    			code: 'ro-RO'
    		},
    		{
    			native: 'Русский (Russian)',
    			code: 'ru-RU'
    		},
    		{
    			native: 'Српски (Serbian)',
    			code: 'sr-RS'
    		},
    		{
    			native: 'Slovenčina (Slovak)',
    			code: 'sk-SK'
    		},
    		{
    			native: 'Slovenščina (Slovenian)',
    			code: 'sl-SI'
    		},
    		{
    			native: 'Español (Spanish)',
    			code: 'es-ES'
    		},
    		{
    			native: 'Español de Colombia (Spanish for Colombia)',
    			code: 'es-CO'
    		},
    		{
    			native: 'Español de México (Spanish for Mexico)',
    			code: 'es-MX'
    		},
    		{
    			native: 'Svenska (Swedish)',
    			code: 'sv-SE'
    		},
    		{
    			native: 'ไทย (Thai)',
    			code: 'th-TH'
    		},
    		{
    			native: 'Türkçe (Turkish)',
    			code: 'tr-TR'
    		},

    		{
    			native: 'Українська (Ukranian)',
    			code: 'uk-UA'
    		},
    		{
    			native: 'Tiếng Việt (Vietnamese)',
    			code: 'vi-VN'
    		},
    		{
    			native: 'Cymraeg (Welsh)',
    			code: 'cy-GB'
    		},
	  ];

	  languageService.getLanguages = function () {
		  return languages;
	  }

	  languageService.getSecondaryLanguages = function () {
		  return secondaryLanguages;
	  }

	  return languageService;
	  
});