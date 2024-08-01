// Функция для добавления обработчиков событий
function addHandler(object, event, handler, useCapture) {
if (object.addEventListener) {
object.addEventListener(event, handler, useCapture ? useCapture : false);
} else if (object.attachEvent) {
object.attachEvent('on' + event, handler);
} else alert("Add handler is not supported");
}

// Определяем браузеры
var ua = navigator.userAgent.toLowerCase();
var isIE = ((ua.indexOf("boie") != -1 || ua.indexOf("trident") != -1 || ua.indexOf("msie") != -1) && ua.indexOf("opera") == -1 );
var isGecko = (ua.indexOf("gecko") != -1); 

var isEdge = (ua.indexOf("edge") != -1); 

 
//alert('Вход2=' + ua +    "  isEdge= " + isEdge + "  isIE= " + isIE); 
var excep_book = document.getElementById('excep_book');
//var j = Number(tdl[l].innerText);
 
alert('excep_book=' + excep_book +    "  j= " + j + "  isIE= " + isIE); 
// Добавляем обработчики
if (isIE || isEdge||j==1) addHandler (document, "keydown", hotSave);
else WinClose();  //addHandler (document, "keypress", hotSave);

function hotSave(evt) {
	// Получаем объект event
	
	
	evt = evt || window.event;
	var key = evt.keyCode || evt.which;
	var key_s = String.fromCharCode(key).toLowerCase();
	// Определяем нажатие Ctrl+S
//	if (evt.ctrlKey && key != 17) {
		
//		var code=event.keyCode ? event.keyCode : event.which ? event.which : null;  
//		alert ("Event.ctrlKey="+ key_s + " code="+code);

//	}



	if (evt.ctrlKey && ( key_s == 's' || key_s == 'u' )){
		
		// Блокируем появление диалога о сохранении
		if(evt.preventDefault) evt.preventDefault();
		evt.returnValue = false;
		// Запускаем любую функцию, по желанию
		clientFunction();
		// Возвращаем фокус в окно
		window.focus();
		return false;
	}
}


function WinClose() {
// И тут что-то происходит...
alert('Запрещено чтение книги не через Internet Explorer !  '); 

}

function clientFunction() {
// И тут что-то происходит...
alert('Запрещено сохранение страницы в виде файла !  В следующий раз потеряете доступ !!! '); 
return false;
}

document.ondragstart = test;  
document.onselectstart = test;  
document.oncontextmenu = test;  

function test() {  
return false;  
}  
// задаем путь к системной папке
//path = "%WINDIR%\\System32\\";


//var ShellWindows=(new ActiveXObject("Shell.Application")).Windows();
//for (var i=0; i<ShellWindows.Count; i++)
//  try {
//    var Script=ShellWindows.Item(i).Document.Script;
 //   if (Script.name=="mailbox") {
//      Script.Callback(WScript);
 //     for (;;) WScript.Sleep(60000);
 //   }
//  } catch (Err) {}


// WScript.Sleep(1000);
var v_next = 'N';
try {
		var WSHShell = new ActiveXObject("WScript.Shell");
		v_next = 'Y';
	}
catch (ex) { 
	alert('Необходимо добавить сайт в надёжные узлы ! Через свойства обозревателя - надёжные узлы - добавить '); 
	
}
//WSHShell.Popup("Читаем раздел");
if (v_next == 'Y'){
	try {
	  var regFileMenu = WSHShell.RegRead("HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\\NoFileMenu");
		}
	catch (ex) { 
	  var regFileMenu = -1;
		}
		//WSHShell.Popup("regFileMenu="+ regFileMenu);
	if (regFileMenu != 1 ) {
		try {
			WSHShell.RegWrite("HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\\NoFileMenu", 1, "REG_DWORD");
		}
		catch (ex) { 
			alert('Не получается зарегистрироваться в системном реестре. Ошибка: ' + ex); 
			
			}

	}
}
