$(document).ready(function() {
    var nav = {
        top: $('.nav').offset().top,
        height: $('.nav .floating').height()
    };

    var aside = {
        top: $('.aside').offset().top,
        height: $('.aside .floating').height()
    };

    var browser_height = $(window).height();
    var content_height = $('.wrap').height();
    var position = $(window).scrollTop();

    $('.nav').height( nav.height );
    $('.aside').height( aside.height );

    $(window).scroll(function() {

        var scroll = $(window).scrollTop();

        if (scroll >= position) {

            // nav
            if(scroll >= nav.top) {
                $('.nav .floating').addClass('fixed');
                $('.nav .floating').css('top', 0);

                if(nav.height >= browser_height) {
                    $('.nav .floating').css('top', nav.top - scroll);

                    if(browser_height + scroll >= nav.top + nav.height) {
                        $('.nav .floating').css('top', browser_height - nav.height);
                    }
                }
            }

            // aside
            if(scroll >= aside.top) {
                $('.aside .floating').addClass('fixed');
                $('.aside .floating').css('top', 0);

                if(aside.height >= browser_height) {
                    $('.aside .floating').css('top', aside.top - scroll);

                    if(browser_height + scroll >= aside.top + aside.height) {
                        $('.aside .floating').css('top', browser_height - aside.height);
                    }
                }
            }

        } else {

            // nav
            if($('.nav .floating').offset().top <= nav.top) {
                $('.nav .floating').removeClass('fixed');
                $('.nav .floating').css('top', 0);
            }

            // aside
            if($('.aside .floating').offset().top <= aside.top) {
                $('.aside .floating').removeClass('fixed');
                $('.aside .floating').css('top', 0);
            }

        }

        if($(window).scrollLeft() > 0) {
            $('.nav .floating').removeClass('fixed');
            $('.nav .floating').css('top', 0);

            $('.aside .floating').removeClass('fixed');
            $('.aside .floating').css('top', 0);
        }

        position = scroll;
    });
});
