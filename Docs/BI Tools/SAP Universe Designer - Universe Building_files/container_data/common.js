function run() {


    //Первый экран

    setTimeout(function () {
        $('.banner_left, .banner_right').addClass('banner_active');
    }, 50);

    setTimeout(function () {
        $('.title').addClass('title_active');
    }, 200);

    setTimeout(function () {
        $('.box').addClass('box_active');
    }, 400);

    setTimeout(function () {
        $('.box').addClass('box_scale');
    }, 900);

    //Первый экран-удаление

    setTimeout(function () {
        $('.title').addClass('title_move');
        $('.box').addClass('box_move');

        setTimeout(function () {
            $('.title').removeClass('title_active');
            $('.box').removeClass('box_active');
            $('.box').removeClass('box_scale');
            $('.title').removeClass('title_move');
            $('.box').removeClass('box_move');
        }, 1000);

    }, 2500);


    //Второй экран

    setTimeout(function () {

        $('.girl1').addClass('girl1_active');
        $('.arrow1').addClass('arrow1_active');

        setTimeout(function () {

            $('.girl1').addClass('girl1_scale');

        }, 600);

        //Второй экран-удаление

        setTimeout(function () {
            $('.girl1').addClass('girl1_move');
            $('.arrow1').addClass('arrow1_move');

            setTimeout(function () {
                $('.girl1').removeClass('girl1_active');
                $('.arrow1').removeClass('arrow1_active');
                $('.girl1').removeClass('girl1_scale');
                $('.girl1').removeClass('girl1_move');
                $('.arrow1').removeClass('arrow1_move');
            }, 1000);

        }, 2100);

    }, 3000);

    //Третий экран

    setTimeout(function () {

        $('.girl2').addClass('girl2_active');
        $('.arrow2').addClass('arrow2_active');
        $('.recomend').addClass('recomend_active');

        setTimeout(function () {

            $('.girl2').addClass('girl2_scale');

        }, 600);

        //Третий экран-удаление

        setTimeout(function () {
            $('.girl2').addClass('girl2_move');
            $('.arrow2').addClass('arrow2_move');
            $('.recomend').addClass('recomend_move');

            setTimeout(function () {
                $('.girl2').removeClass('girl2_active');
                $('.arrow2').removeClass('arrow2_active');
                $('.girl2').removeClass('girl2_scale');
                $('.girl2').removeClass('girl2_move');
                $('.arrow2').removeClass('arrow2_move');
                $('.recomend').removeClass('recomend_active');
                $('.recomend').removeClass('recomend_move');
            }, 1000);

        }, 2100);

    }, 5500);


    //Четвертый экран

    setTimeout(function () {

        $('.girl3').addClass('girl3_active');
        $('.arrow3').addClass('arrow3_active');

        setTimeout(function () {

            $('.girl3').addClass('girl3_scale');

        }, 600);

        //Четвертый экран-удаление

        setTimeout(function () {
            $('.girl3').addClass('girl3_move');
            $('.arrow3').addClass('arrow3_move');

            setTimeout(function () {
                $('.girl3').removeClass('girl3_active');
                $('.arrow3').removeClass('arrow3_active');
                $('.girl3').removeClass('girl3_scale');
                $('.girl3').removeClass('girl3_move');
                $('.arrow3').removeClass('arrow3_move');
            }, 1000);

        }, 2100);

    }, 8000);


    //Пятый экран

    setTimeout(function () {

        $('.box2').addClass('box2_active');
        $('.bio').addClass('bio_active');
        $('.addText').addClass('addText_active');
        $('.text').addClass('text_active');
        $('.logo').addClass('logo_active');

        //Пятый экран-удаление

        setTimeout(function () {

            $('.box2').removeClass('box2_active');
            $('.bio').removeClass('bio_active');
            $('.addText').removeClass('addText_active');
            $('.text').removeClass('text_active');
            $('.logo').removeClass('logo_active');


        }, 2000);

    }, 10500);

    setTimeout(function () {

        $('.banner_left, .banner_right').removeClass('banner_active');

    }, 12500);

}

$(window).on('load', function(){

    $(".banner").css("display","block");

    run();

    setInterval(function() {
        run();
    }, 13500);

});


