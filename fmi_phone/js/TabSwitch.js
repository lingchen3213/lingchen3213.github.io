
(function ($) {
    $.fn.myTab = function (options) {
        return this.each(function () {
            var defaults = {
                operate: 'click'

            }

            var opts = $.extend(defaults, options),
            self = $(this),
            items = self.children('ul.wm_left_a').children('li'),
            tabBox = self.children('div.wm_main'),
            tabBoxItems = tabBox.children('div.wm_left_b'),
            timer;

            var tabHandle = function (index) {
                items.siblings('li').removeClass('wm_left_a_c').end().eq(index).addClass('wm_left_a_c');
                tabBoxItems.siblings().hide().end().eq(index).show()
            },

            delay = function (elem) {
                opts.delay ? setTimeout(function () { tabHandle(elem); }, opts.delayTime) : tabHandle(elem);
            },

            start = function () {
                if (!opts.auto) return;
                timer = setInterval(autoRun, opts.time);
            },

            autoRun = function () {
                var on = self.find('li.wm_left_a_c'),
                    firstItem = items.eq(0),
                    len = items.length,
                    index = on.index() + 1,
                    item = index === len ? firstItem : on.next('li'),
                    i = index === len ? 0 : index;

                on.removeClass('wm_left_a_c');
                item.addClass('wm_left_a_c');
                tabBoxItems.siblings().hide().end().eq(i).show()
            };

            items.bind(opts.operate, function () {
                var index = items.index($(this));
                delay(index)
            });

            if (opts.auto) {
                start();
                self.hover(function () {
                    clearInterval(timer);
                    timer = undefined;
                }, function () {
                    start();
                })
            }

        })
    }
})(jQuery)