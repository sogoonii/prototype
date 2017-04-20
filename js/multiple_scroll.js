'use strict';

var MultiScroll = function(content, container) {

    var self = this;

    // elements
    var _$content = $(content);
    var _$container = $(container);
    var _$contentBody = _$content.find('.floating');

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
            top: _$content.offset().top,
            bottom: _$content.offset().top + _$contentBody.height(),
            height: _$contentBody.height(),
            overSize: _$contentBody.height() > _browser.height
        };

        _container = {
            top: _$container.offset().top,
            bottom: _$container.offset().top + _$container.height()
        };

        _$content.height(_content.height);
    };

    // Fix 적용
    var fix = function(top) {
        _$contentBody.addClass('fixed');
        _$contentBody.css('top', top);
    };

    // Fix 해제
    var unFix = function() {
        _$contentBody.removeClass('fixed');
        _$contentBody.css('top', 'auto');
    };

    // 스크롤러 적용
    var scroller = function() {
        var scroll = $(window).scrollTop();

        if(!_content.overSize && scroll > _content.top) {
            fix(0);

            if(scroll + _content.height > _container.bottom) {
                fix(_container.bottom - _content.height - scroll);
            }
        }
        else if(_content.overSize && _browser.height + scroll > _content.bottom) {
            fix(_browser.height - _content.height);

            if(scroll + _browser.height > _container.bottom) {
                fix(_container.bottom - _content.height - scroll);
            }
        }
        else {
            unFix();
        }
    };

    $(window).scroll(function() {
        scroller();
    });

    $(window).resize(function() {
        self.init();
    });
};
