(function() { // ar3-tab-1st version https://arza-3d.github.io/ar3js/
    'use strict';
    var constructNote = 'r3-tab_done',
        isConstructed = $('body').hasClass(constructNote);

    var $contents = $('.tab-r3 > div:nth-child(2) > div'),
        $links = $('.tab-r3 > nav > a');
    if (!isConstructed) {
        for (var i = 0; i < $contents.length; i++) {
            if ($($contents[i]).attr('id') == undefined) {
                $($contents[i]).attr('id', 'r3_tab_content_'+ i);
            }
        }

        var id;
        for (var i = 0; i < $contents.length; i++) {
            id = $($contents[i]).attr('id');
            $links[i].setAttribute('data-tab-r3', id);
        }

        var $1stLink = $('.tab-r3 > nav > a:first-child');
        $1stLink.addClass('r3-active');
    }

    $links.click(function() {
        if (!$(this).hasClass('r3-active')) {
            var id = $(this).attr('data-tab-r3');
            $(this).siblings().removeClass('r3-active');
            $(this).addClass('r3-active');
            $('#'+id).siblings().fadeOut(400);
            $('#'+id).delay(401).fadeIn();
        }
    });

    var $insideLinks = $('.tab-r3 > div:nth-child(2) div.relative-container-r3 > a');
    $insideLinks.click(function() {
        var n = $(this).attr('data-tab-a');
        $(this).parents('.tab-r3')
            .children('nav:first-child')
            .children('a:nth-of-type('+ n +')').click();
    });

    $('body').addClass(constructNote);
})();
