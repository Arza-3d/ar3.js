//ar3-tab.js
//##########
// .tab-r3 #
//##########
(function() {

    var $tabGroup = $('.tab-r3'),
        //$div2 = $tabGroup.children('div:nth-child(2)'),
        //$divContent = $div2.children('div'),
        $divContent = $('.tab-r3 > div:nth-of-type(2)');
        divContentL = $divContent.length;

    (function() { //<div>2nd content
        for (i = 0; i < divContentL; i++) {
            $($divContent[i]).attr('id', 'r3_tab_content_'+ i);
        }
    })();

    (function() { //<div>1st (links)
        var $div1 = $tabGroup.children('div:first-child'),
            $a = $div1.children('a');

        (function() { //create href attribute to <a>
            if (newElement) {
                for (i = 0; i < divContentL; i++) {
                    var id = $($divContent[i]).attr('id');
                    $a[i].setAttribute('href', '#'+id);
                }
            }
        })();

        //first <a> is activated by default
        if (newElement) {$div1.children('a:first-child').addClass('r3-active');}

        $a.click(function() { // <a> # attach click event
            var id = this.href.slice(this.href.indexOf('#') + 1, this.href.length);
            $(this).siblings().removeClass('r3-active');
            $(this).addClass('r3-active');
            $('#'+id).siblings().fadeOut(400);
            $('#'+id).delay(401).fadeIn();
        });
    })();
})();
