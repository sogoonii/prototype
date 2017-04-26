'use strict';

var Sticky = function(content, container) {
    var stickies = [];

    for(var i = 0; i < $(content).length; i++) {
        stickies.push(new Scroll($(content)[i], container));
        stickies[i].init();
    }

    $(window).scroll(function() {
        for(var i = 0; i < stickies.length; i++) {
            stickies[i].setPosition();
        }
    });

    $(window).resize(function() {
        for(var i = 0; i < stickies.length; i++) {
            stickies[i].init();
        }
    });

    $(window).scroll();
};

var Scroll = function(content, container) {

    var $content = $(content);
    var $fixable = $(content).find('.fixable');
    var $container = $(content).parents(container);

    // Fix 적용
    var fix = function(top) {
        $fixable.addClass('fixed');
        $fixable.css('top', top);
    };

    // Fix 해제
    var unFix = function() {
        $fixable.removeClass('fixed');
        $fixable.css('top', 'auto');
    };

    this.init = function() {
        this.browser = {
            height: $(window).height()
        };

        this.content = {
            top: $content.offset().top,
            bottom: $content.offset().top + $fixable.height(),
            height: $fixable.height(),
            overSize: $fixable.height() > this.browser.height
        };

        this.container = {
            top: $container.offset().top,
            bottom: $container.offset().top + $container.height()
        };

        $content.height(this.content.height);
    };

    this.setPosition = function() {
        var scrollTop = $(window).scrollTop();

        if(!this.content.overSize && scrollTop > this.content.top) {
            fix(0);

            if(scroll + this.content.height > this.container.bottom) {
                fix(this.container.bottom - this.content.height - scrollTop);
            }
        }
        else if(this.content.overSize && this.browser.height + scrollTop > this.content.bottom) {
            fix(this.browser.height - this.content.height);

            if(scrollTop + this.browser.height > this.container.bottom) {
                fix(this.container.bottom - this.content.height - scrollTop);
            }
        }
        else {
            unFix();
        }
    };

};
