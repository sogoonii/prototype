'use strict';

function Scroller() {
    var _$target;
    var _$targetContent;
    var _top;
    var _height;
    var _bottom;
    var _browserHeight;
    var _scrollUtil;
    var _container;

    // 초기화 및 실행
    this.init = function(selector, container) {
        var self = this;

        // 프라이빗 변수 할당
        _$target = $(selector);
        _$targetContent = $(selector).find('.floating');
        _top = _$target.offset().top;
        _height = _$targetContent.height();
        _bottom = _top + _$targetContent.height();
        _browserHeight = $(window).height();
        _scrollUtil = new this.ScrollUtil();
        _container = container;

        // 레이아웃 적용
        this.setLayout();

        // 이벤트 바인드
        $(window).scroll(function() {
            self.setScroller();
            _scrollUtil.setBeforeScroll();
        });
    };

    // 레이아웃 적용
    this.setLayout = function() {
        _$target.height(_height);
    };

    // 스크롤 상태 관련 우틸
    this.ScrollUtil = function() {
        var _beforeScroll;

        // 현재 스크롤 위치 획득
        this.getCurrentScroll = function() {
            return $(window).scrollTop();
        };

        // 이전 스크롤 상태 저장
        this.setBeforeScroll = function() {
            _beforeScroll = this.getCurrentScroll();
        };

        // 스크롤 방향 여부
        this.isScrollDown = function() {
            var currentScroll = this.getCurrentScroll();

            return currentScroll >= _beforeScroll;
        };
    };

    // 스크롤러 적용
    this.setScroller = function() {
        var scroll = _scrollUtil.getCurrentScroll();
        var result;

        // 선택된 UI가 없을 경우 함수 통과
        if (_$target.length > 0 === false) return false;

        // 스크롤 다운
        if (_scrollUtil.isScrollDown()) {

            if (_height >= _browserHeight) {
                if (_browserHeight + scroll >= _bottom) {
                    _$targetContent.addClass('fixed');
                    result = _browserHeight - _height;
                }
                if (scroll >= _container.bottom - _browserHeight) {
                    _$targetContent.addClass('fixed');
                    result = _container.bottom - _height - scroll;
                }
            } else {
                if (scroll >= _container.top) {
                    _$targetContent.addClass('fixed');
                    result = 0;
                }
                if (scroll >= _container.bottom - _height) {
                    _$targetContent.addClass('fixed');
                    result = _container.bottom - _height - scroll;
                }
            }

        }

        // 스크롤 업
        else {

            if (_height >= _browserHeight) {
                result = _container.bottom - _height - scroll; // 따라다니다가
                if (_container.bottom >= _browserHeight + scroll) {
                    result = _browserHeight - _height; // 하단 고정
                }
                if (_top + _height > _browserHeight + scroll) {
                    _$targetContent.removeClass('fixed'); // 다시 따라다님(fixed 해제)
                    result = 'auto';
                }
            } else {
                if (scroll >= _container.bottom - _height) {
                    result = _container.bottom - _height - scroll;
                }
                if (_container.top > scroll) {
                    _$targetContent.removeClass('fixed'); // 다시 따라다님(fixed 해제)
                    result = 'auto';
                }
            }

        }

        // 결과값 바인딩
        _$targetContent.css('top', result);
    }
}


$(function () {
    var $container = $('.container');
    var container = {
        top: $container.offset().top,
        bottom: $container.offset().top + $container.height()
    };

    var navScroller = new Scroller().init('.nav', container);
    var asideScroller = new Scroller().init('.aside', container);
});
