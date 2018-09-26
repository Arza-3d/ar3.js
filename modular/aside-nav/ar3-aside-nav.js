(function() {
    'use strict';
    var constructNote = 'ar3-aside-nav_done';
    var isConstructed = $('body').hasClass(constructNote);

    var $navTarget = $('.aside-nav-target-r3');
    var $headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    $navTarget.wrap("<div class='relative-container-r3'></div>");
    $navTarget.after('<div style="clear:left">');

    for (var i = 0; i < $navTarget.length; i++) {
        var j = 0;
        while ($headers[j] !== undefined) {

            var $h = $($navTarget[i]).find($headers[j]);
                for (var k = 0; k < $h.length; k++) {

                    $($h[k]).addClass('ar3-h' + (j + 1));

                    if ($($h[k]).attr('id') === undefined) {
                        $($h[k]).attr('id', 'h' + (j + 1) + '-' + (k + 1) + '_of_content_'+ (i + 1));
                        console.log('h' + (j + 1) + '-' + (k + 1) + '_of_content_'+ (i + 1));
                    }
                }

            j++;
        }
    }

    $('body').addClass(constructNote);
})();
