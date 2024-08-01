jQuery(function(){
jQuery("#aviewform").click(function(){jQuery("#answermeform").fadeToggle("fast");});

jQuery("#ame_cls").click(function(){jQuery("#aviewform").click();});

jQuery("#aviewform").hover(
	function () {jQuery(this).addClass("answermeform_hover");},
	function () {jQuery(this).removeClass("answermeform_hover");}
);
});

function saveform (data)
{
var name = data.name.value;
    var email = data.email.value;
	var ftext = data.ftext.value;
jQuery("#jaloba-to-me .callme_result").html('<div>Отправка....</div>');
	
	
    $.post('https://upread.ru/saveser.php',{name:name,email:email,ftext:ftext},function(data){
        $('#enter_name').html(data);
    },'json');
jQuery("#jaloba-to-me .callme_result").html('<div class="c_success">Отправлено!</div>');
alert ("Спасибо! Ваш вопрос уже у меня в ящике. Очень скоро я вам отвечу.");

}

function saveformkomm (data)
{
var name = data.name.value;
var ftext = data.ftext.value;
$.post('https://upread.ru/saveser.php',{name:name,ftext:ftext},function(data){
},'json');

alert ("Спасибо! После модерации ваш комментарий будет размещен.");

}