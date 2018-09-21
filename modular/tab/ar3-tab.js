(function() {
    'use strict';
    var newElement = !$('body').hasClass('r3-tab_done');

    //##########
    // .tab-r3 # contain 1st div that will be the links, and 2nd div that will be the content
    //##########
    (function() {

        var $tabGroup = $('.tab-r3'),
            $div2 = $tabGroup.children('div:nth-child(2)'),
            $divContent = $div2.children('div'),
            divContentL = $divContent.length;

        //###########
        // <div>2nd # access div content
        //###########
        (function() {
            if (newElement) {
                for (i = 0; i < divContentL; i++) {
                    $($divContent[i]).attr('id', 'r3_tab_content_'+ i);
                }
            }
        })();

        //###########
        // <div>1st #
        //###########
        (function() {
            var $div1 = $tabGroup.children('div:first-child'),
                $a = $div1.children('a');

            //######
            // <a> # create href attribute to <a>
            //######
            (function() {
                if (newElement) {
                    for (i = 0; i < divContentL; i++) {
                        var id = $($divContent[i]).attr('id');
                        $a[i].setAttribute('href', '#'+id);
                    }
                }
            })();

            //##################
            // <a>:first-child # first <a> is activated by default
            //##################
            (function() {
                if (newElement) {
                    $div1.children('a:first-child').addClass('r3-active');
                }
            })();

            //######
            // <a> # attach click event
            //######
            $a.click(function() {
                var id = this.href.slice(this.href.indexOf('#') + 1, this.href.length);
                $(this).siblings().removeClass('r3-active');
                $(this).addClass('r3-active');
                $('#'+id).siblings().fadeOut(400);
                $('#'+id).delay(401).fadeIn();
            });

        })();

    })();

    $('body').addClass('r3-tab_done');

})();
