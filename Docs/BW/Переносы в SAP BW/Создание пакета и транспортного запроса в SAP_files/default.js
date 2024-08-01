$(function(){
$(".ul-dropfree").find("li:has(ul) a.cat-link").prepend('<i class="cat-drop icon-chevron-right" style="margin-right: 5px;"></i>');
    $("a.cat-link").click(function(e) {
        e.preventDefault();
        if ($(this).nextAll("ul").css('display')=='none') {
            $(this).nextAll("ul").slideDown(400);

            $(this).find("i.cat-drop").remove("icon-chevron-right");
            $(this).find("i.cat-drop").addClass("icon-chevron-down");
        } else {
            var test=$(this).parent().nextAll("ul");
            $(this).nextAll("ul").slideUp(400);
            $(this).find("i.cat-drop").removeClass("icon-chevron-down");
            $(this).find("i.cat-drop").addClass("icon-chevron-right");
        }
    });
    $(".ul-dropfree").find("ul").slideUp(400).parents("li");//.children("div.cat-drop").css({'background-position':"0 0"});
});