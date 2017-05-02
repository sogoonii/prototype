'use strict';

var Sticky = function(content, container) {
    var stickies = [];

    for(var i = 0; i < $(content).length; i++) {
        stickies.push(new Floating($(content)[i], container));
        stickies[i].init();
    }

    $(window).scroll(function() {
        var top;

        for(var i = 0; i < stickies.length; i++) {
            top = stickies[i].getPosition();
            stickies[i].setPosition(top);
        }
    });

    $(window).resize(function() {
        for(var i = 0; i < stickies.length; i++) {
            stickies[i].init();
        }
    });

    $(window).scroll();
};

var Floating = function(content, container) {

    var $content = $(content);
    var $fixable = $(content).find('.fixable');
    var $container = $(content).parents(container);

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

    this.getPosition = function() {
        var scrollTop = $(window).scrollTop();

        if(!this.content.overSize && scrollTop > this.content.top) {
            if(scrollTop + this.content.height > this.container.bottom) {
                return this.container.bottom - this.content.height - scrollTop;
            }
            return 0;
        }
        else if(this.content.overSize && this.browser.height + scrollTop > this.content.bottom) {
            if(scrollTop + this.browser.height > this.container.bottom) {
                return this.container.bottom - this.content.height - scrollTop;
            }
            return this.browser.height - this.content.height;
        }
        else {
            return 'auto';
        }
    };

    this.setPosition = function(top) {
        if(top === 'auto') {
            $fixable.removeClass('fixed');
        } else {
            $fixable.addClass('fixed');
        }
        $fixable.css('top', top);
    }

};
