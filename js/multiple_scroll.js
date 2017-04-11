$(document).ready(function() {
    var nav = {
        top: $('.nav').offset().top,
        height: $('.nav .floating').height(),
        bottom: $('.nav').offset().top + $('.nav .floating').height()
    };

    var aside = {
        top: $('.aside').offset().top,
        height: $('.aside .floating').height(),
        bottom: $('.aside').offset().top + $('.aside .floating').height()
    };

    var container = {
        top: $('.container').offset().top,
        bottom: $('.container').offset().top + $('.container').height()
    }

    var position = $(window).scrollTop();

    $('.nav').height( nav.height );
    $('.aside').height( aside.height );

    $(window).scroll(function() {

        var browser_height = $(window).height();
        var scroll = $(window).scrollTop();
        var nav_top;
        var aside_top;

        if (scroll >= position) {
            // nav
            if(nav.height >= browser_height) { // nav의 height가 브라우저의 height보다 클 경우
                if(browser_height + scroll >= nav.bottom) {
                    $('.nav .floating').addClass('fixed');
                    nav_top = browser_height - nav.height;
                }
                if(scroll >= container.bottom - browser_height) {
                    $('.nav .floating').addClass('fixed');
                    nav_top = container.bottom - nav.height - scroll ;
                }
            }
            else { // nav의 height가 브라우저의 height보다 작을 경우
                if(scroll >= container.top) {
                    $('.nav .floating').addClass('fixed');
                    nav_top = 0;
                }
                if(scroll >= container.bottom - nav.height) {
                    $('.nav .floating').addClass('fixed');
                    nav_top = container.bottom - nav.height - scroll ;
                }
            }

            // aside
            if(aside.height >= browser_height) { // aside의 height가 브라우저의 height보다 클 경우
                if(browser_height + scroll >= aside.bottom) {
                    $('.aside .floating').addClass('fixed');
                    aside_top = browser_height - aside.height;
                }
                if(scroll >= container.bottom - browser_height) {
                    $('.aside .floating').addClass('fixed');
                    aside_top = container.bottom - aside.height - scroll ;
                }
            }
            else { // aside의 height가 브라우저의 height보다 작을 경우
                if(scroll >= container.top) {
                    $('.aside .floating').addClass('fixed');
                    aside_top = 0;
                }
                if(scroll >= container.bottom - aside.height) {
                    $('.aside .floating').addClass('fixed');
                    aside_top = container.bottom - aside.height - scroll ;
                }
            }
        } else {
            // nav
            if(nav.height >= browser_height) { // nav의 height가 브라우저의 height보다 클 경우
                nav_top = container.bottom - nav.height - scroll ; // 따라다니다가
                if(container.bottom >= browser_height + scroll) {
                    nav_top = browser_height - nav.height; // 하단 고정
                }
                if(nav.top + nav.height > browser_height + scroll) {
                    $('.nav .floating').removeClass('fixed'); // 다시 따라다님(fixed 해제)
                    nav_top = 'auto';
                }
            }
            else { // nav의 height가 브라우저의 height보다 작을 경우
                console.log(scroll >= container.bottom - nav.height);
                if(scroll >= container.bottom - nav.height) {
                    nav_top = container.bottom - nav.height - scroll ;
                }
                if(container.top > scroll) {
                    $('.nav .floating').removeClass('fixed'); // 다시 따라다님(fixed 해제)
                    nav_top = 'auto';
                }
            }

            // aside
            if(aside.height >= browser_height) { // aside의 height가 브라우저의 height보다 클 경우
                aside_top = container.bottom - aside.height - scroll ; // 따라다니다가
                if(container.bottom >= browser_height + scroll) {
                    aside_top = browser_height - aside.height; // 하단 고정
                }
                if(aside.top + aside.height > browser_height + scroll) {
                    $('.aside .floating').removeClass('fixed'); // 다시 따라다님(fixed 해제)
                    aside_top = 'auto';
                }
            }
            else { // aside의 height가 브라우저의 height보다 작을 경우
                console.log(scroll >= container.bottom - aside.height);
                if(scroll >= container.bottom - aside.height) {
                    aside_top = container.bottom - aside.height - scroll ;
                }
                if(container.top > scroll) {
                    $('.aside .floating').removeClass('fixed'); // 다시 따라다님(fixed 해제)
                    aside_top = 'auto';
                }
            }
        }
        $('.nav .floating').css('top', nav_top);
        $('.aside .floating').css('top', aside_top);

        position = scroll;
    });

    $(window).resize(function() {
        $(window).scroll();
    });
});
