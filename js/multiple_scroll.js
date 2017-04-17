'use strict';

var MultiScroll = function(target, container) {

    var self = this;

    // elements
    var _$target = $(target);
    var _$container = $(container);
    var _$targetContent = _$target.find('.floating');

    // objects
    var _content;
    var _container;
    var _browser;
    var _scroll;

    this.init = function() {
        _browser = {
            height: $(window).height()
        };

        _content = {
            top: _$target.offset().top,
            bottom: _$target.offset().top + _$targetContent.height(),
            height: _$targetContent.height(),
            overSize: _$targetContent.height() > _browser.height
        };

        _container = {
            top: _$container.offset().top,
            bottom: _$container.offset().top + _$container.height()
        };

        _$target.height(_content.height);
    };

    // Fix 적용
    var fixed = function(top) {
        _$targetContent.addClass('fixed');
        _$targetContent.css('top', top);
    };

    // Fix 해제
    var unFixed = function() {
        _$targetContent.removeClass('fixed');
        _$targetContent.css('top', 'auto');
    };

    // 스크롤러 적용
    var scroller = function() {
        var scroll = $(window).scrollTop();

        if(!_content.overSize && scroll > _content.top) { // 컨텐츠가 브라우저보다 작고, 컨텐츠가 브라우저 상단에 닿았을 때
            fixed(0);

            if(scroll + _content.height > _container.bottom) {
                fixed(_container.bottom - _content.height - scroll);
            }
        }
        else if(_content.overSize && _browser.height + scroll > _content.bottom) { // 컨텐츠가 브라우저보다 크고, 컨텐츠가 브라우저 하단에 닿았을 때
            fixed(_browser.height - _content.height);

            if(scroll + _browser.height > _container.bottom) {
                fixed(_container.bottom - _content.height - scroll);
            }
        }
        else {
            unFixed();
        }
    };

    $(window).scroll(function() {
        scroller();
    });

    $(window).resize(function() {
        self.init();
    });
};

$(function () {
    var nav = new MultiScroll('.nav', '.container');
    var aside = new MultiScroll('.aside', '.container');

    nav.init();
    aside.init();

    $(window).scroll();
});
