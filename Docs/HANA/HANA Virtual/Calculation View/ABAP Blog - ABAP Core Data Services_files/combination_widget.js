

function dsqComboTab(tab) {
	document.getElementById('dsq-combo-people').style.display = "none";
	document.getElementById('dsq-combo-popular').style.display = "none";
	document.getElementById('dsq-combo-recent').style.display = "none";
	document.getElementById('dsq-combo-tab-people').className = "dsq-combo-tab";
	document.getElementById('dsq-combo-tab-popular').className = "dsq-combo-tab";
	document.getElementById('dsq-combo-tab-recent').className = "dsq-combo-tab";

	document.getElementById('dsq-combo-' + tab).style.display = "block";
	document.getElementById('dsq-combo-tab-' + tab).className = "dsq-combo-tab dsq-active";
}

document.write(' \
<style type="text/css" media="screen">\
	 #dsq-combo-widget ul,\
	 #dsq-combo-widget li,\
	 #dsq-combo-widget ol,\
	 #dsq-combo-widget div,\
	 #dsq-combo-widget p,\
	 #dsq-combo-widget a,\
	 #dsq-combo-widget cite,\
	 #dsq-combo-widget img {\
	 border: 0;\
	 padding: 0;\
	 margin: 0;\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 }\
	 #dsq-combo-widget ul,\
	 #dsq-combo-widget li,\
	 #dsq-combo-widget ol {\
	 list-style-type: none;\
	 list-style-image: none;\
	 background: none;\
	 display: block;\
	 }\
	 #dsq-combo-widget #dsq-combo-content ul,\
	 #dsq-combo-widget #dsq-combo-content li,\
	 #dsq-combo-widget #dsq-combo-content ol,\
	 #dsq-combo-widget #dsq-combo-content div,\
	 #dsq-combo-widget #dsq-combo-content p,\
	 #dsq-combo-widget #dsq-combo-content a,\
	 #dsq-combo-widget #dsq-combo-content cite,\
	 #dsq-combo-widget #dsq-combo-content img {\
	 border: 0;\
	 padding: 0;\
	 margin: 0;\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 }\
	 #dsq-combo-widget #dsq-combo-content ul,\
	 #dsq-combo-widget #dsq-combo-content li,\
	 #dsq-combo-widget #dsq-combo-content ol {\
	 list-style-type: none;\
	 list-style-image: none;\
	 background: none;\
	 display: block;\
	 }\
	 .dsq-clearfix:after {\
	 content:".";\
	 display: block;\
	 height: 0;\
	 clear: both;\
	 visibility: hidden;\
	 }\
	 /* end reset */\
	 #dsq-combo-widget { ;\
	 text-align: left;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs {\
	 float: left;\
	 }\
	 #dsq-combo-widget #dsq-combo-content {\
	 position: static;\
	 }\
	 #dsq-combo-widget #dsq-combo-content h3 {\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 padding: 0;\
	 border: 0;\
	 margin: 0 0 10px 0;\
	 font-size: 16px;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs li {\
	 display: inline;\
	 float: left;\
	 margin-right: 2px;\
	 padding: 0px 5px;\
	 text-transform: uppercase;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs li a {\
	 text-decoration: none;\
	 font-weight: bold;\
	 font-size: 10px;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box {\
	 margin: 0 0 20px;\
	 padding: 12px;\
	 clear: both;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box li {\
	 padding-bottom: 10px;\
	 margin-bottom: 10px;\
	 overflow: hidden;\
	 word-wrap: break-word;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-avatar {\
	 float: left;\
	 height: 48px;\
	 width: 48px;\
	 margin-right: 15px;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box cite {\
	 font-weight: bold;\
	 font-size: 14px;\
	 }\
	 span.dsq-widget-clout {\
	 background-color:#FF7300;\
	 color:#FFFFFF;\
	 padding:0pt 2px;\
	 }\
	 #dsq-combo-logo { text-align: right; }\
	 /* Blue */\
	 #dsq-combo-widget.blue #dsq-combo-tabs li.dsq-active { background: #E1F3FC; }\
	 #dsq-combo-widget.blue #dsq-combo-content .dsq-combo-box { background: #E1F3FC; }\
	 #dsq-combo-widget.blue #dsq-combo-tabs li { background: #B5E2FD; }\
	 #dsq-combo-widget.blue #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #B5E2FD; }\
	 /* Grey */\
	 #dsq-combo-widget.grey #dsq-combo-tabs li.dsq-active { background: #f0f0f0; }\
	 #dsq-combo-widget.grey #dsq-combo-content .dsq-combo-box { background: #f0f0f0; }\
	 #dsq-combo-widget.grey #dsq-combo-tabs li { background: #ccc; }\
	 #dsq-combo-widget.grey #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #ccc; }\
	 /* Green */\
	 #dsq-combo-widget.green #dsq-combo-tabs li.dsq-active { background: #f4ffea; }\
	 #dsq-combo-widget.green #dsq-combo-content .dsq-combo-box { background: #f4ffea; }\
	 #dsq-combo-widget.green #dsq-combo-tabs li { background: #d7edce; }\
	 #dsq-combo-widget.green #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #d7edce; }\
	 /* Red */\
	 #dsq-combo-widget.red #dsq-combo-tabs li.dsq-active { background: #fad8d8; }\
	 #dsq-combo-widget.red #dsq-combo-content .dsq-combo-box { background: #fad8d8; }\
	 #dsq-combo-widget.red #dsq-combo-tabs li { background: #fdb5b5; }\
	 #dsq-combo-widget.red #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #fdb5b5; }\
	 /* Orange */\
	 #dsq-combo-widget.orange #dsq-combo-tabs li.dsq-active { background: #fae6d8; }\
	 #dsq-combo-widget.orange #dsq-combo-content .dsq-combo-box { background: #fae6d8; }\
	 #dsq-combo-widget.orange #dsq-combo-tabs li { background: #fddfb5; }\
	 #dsq-combo-widget.orange #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #fddfb5; }\
	 </style>\
	 <div id="dsq-combo-widget" class="grey">\
	 <ul id="dsq-combo-tabs">\
	 <li id="dsq-combo-tab-people" ><a href="#" onclick="dsqComboTab(\'people\'); return false">People</a></li>\
	 <li id="dsq-combo-tab-recent" class="dsq-active"><a href="#" onclick="dsqComboTab(\'recent\'); return false">Recent</a></li>\
	 <li id="dsq-combo-tab-popular" ><a href="#" onclick="dsqComboTab(\'popular\'); return false">Popular</a></li>\
	 </ul>\
	 <div id="dsq-combo-content">\
	 <div id="dsq-combo-people" class="dsq-combo-box" style="display:none">\
	 <h3>Top Commenters</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Astrafox/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/10510/4964/avatar92.jpg?1593697743">\
	 </a>\
	 <cite><a href="https://disqus.com/by/Astrafox/">Сидорочкин Михаил</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;78 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/svirinstel/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/16400/8911/avatar92.jpg?1435904997">\
	 </a>\
	 <cite><a href="https://disqus.com/by/svirinstel/">Тюменьев Иван</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;20 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/mikesidorochkin/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/forums/298/6206/avatar92.jpg?1569760761">\
	 </a>\
	 <cite><a href="https://disqus.com/by/mikesidorochkin/">Mike Sidorochkin</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;13 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/IlyaKaznacheev/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/5826/9837/avatar92.jpg?1563176022">\
	 </a>\
	 <cite><a href="https://disqus.com/by/IlyaKaznacheev/">Ilya Kaznacheev</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;7 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_odk0P6eVwT/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/8068/4408/avatar92.jpg?1561130524">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_odk0P6eVwT/">Андрей</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;5 posts</div>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="https://disqus.com"><img src="//a.disquscdn.com/1596763802/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-recent" class="dsq-combo-box" >\
	 <h3>Recent Comments</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_QT6X7kWEkh/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/forums/298/6206/avatar92.jpg?1569760761"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/disqus_QT6X7kWEkh/">Алексей Борейко</a>\
	 <span class="dsq-widget-comment"><p>Здравствуйте, а вашу базу можно как то скачать?<br>Может, торрент есть? Спасибо.</p></span>\
	 <p class="dsq-widget-meta"><a href="https://abap-blog.ru/others/baza-znanij-abap-programmista/">База знаний ABAP программиста</a>&nbsp;&middot;&nbsp;<a href="https://abap-blog.ru/others/baza-znanij-abap-programmista/#comment-5029998244">6 days ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Astrafox/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/10510/4964/avatar92.jpg?1593697743"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/Astrafox/">Сидорочкин Михаил</a>\
	 <span class="dsq-widget-comment"><p>SRP можно распространять и на методы и на подсистемы. <a href="https://clean-swift.com/single-responsibility-principle-for-methods/" rel="nofollow noopener" title="https://clean-swift.com/single-responsibility-principle-for-methods/">https://clean-swift.com/sin...</a>...</p></span>\
	 <p class="dsq-widget-meta"><a href="https://abap-blog.ru/abap-best-practice/">ABAP Best Practice</a>&nbsp;&middot;&nbsp;<a href="https://abap-blog.ru/abap-best-practice/#comment-4976730627">1 month ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/dimitrystepanov/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/35238/3263/avatar92.jpg?1593691262"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/dimitrystepanov/">Dimitry Stepanov</a>\
	 <span class="dsq-widget-comment"><p>Разделение на несколько методов в классе это не single responsibility (SOLID). single responsibility - инкапсуляция ответственности на уровне класса. разделение на методы не является принципом S....</p></span>\
	 <p class="dsq-widget-meta"><a href="https://abap-blog.ru/abap-best-practice/">ABAP Best Practice</a>&nbsp;&middot;&nbsp;<a href="https://abap-blog.ru/abap-best-practice/#comment-4976620530">1 month ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/forums/298/6206/avatar92.jpg?1569760761">\
	 Александр\
	 <span class="dsq-widget-comment"><p>Вот ещё в дополнение видео о селекционном экране. Возможно будет полезно:<br><a href="https://www.youtube.com/watch?v=IJvA2Iemq-0&amp;list=PLcaW8IEDpScvohdm7Cjt2kzBs_t84NGOj&amp;index=2&amp;t=1s" rel="nofollow noopener" title="https://www.youtube.com/watch?v=IJvA2Iemq-0&amp;list=PLcaW8IEDpScvohdm7Cjt2kzBs_t84NGOj&amp;index=2&amp;t=1s">https://www.youtube.com/wat...</a></p></span>\
	 <p class="dsq-widget-meta"><a href="https://abap-blog.ru/sap-dynpro/abaphr-ru-sokrytie-polej-vvoda-na-selekcionnom-ekrane/">Сокрытие полей ввода на селекционном экране</a>&nbsp;&middot;&nbsp;<a href="https://abap-blog.ru/sap-dynpro/abaphr-ru-sokrytie-polej-vvoda-na-selekcionnom-ekrane/#comment-4935803508">2 months ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/Astrafox/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/10510/4964/avatar92.jpg?1593697743"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/Astrafox/">Сидорочкин Михаил</a>\
	 <span class="dsq-widget-comment"><p>Если метод разделен на несколько логических частей значит метод следует разделить на несколько методов, иначе это уже нарушение single responsibility (SOLID)</p></span>\
	 <p class="dsq-widget-meta"><a href="https://abap-blog.ru/abap-best-practice/">ABAP Best Practice</a>&nbsp;&middot;&nbsp;<a href="https://abap-blog.ru/abap-best-practice/#comment-4923447005">2 months ago</a></p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="https://disqus.com"><img src="//a.disquscdn.com/1596763802/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-popular" class="dsq-combo-box" style="display:none">\
	 <h3>Most Discussed</h3>\
	 <ul>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="https://disqus.com"><img src="//a.disquscdn.com/1596763802/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 </div>\
	 </div>\
');
