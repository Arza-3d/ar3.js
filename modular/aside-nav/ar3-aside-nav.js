(function() {
    'use strict';
    var $navTarget = $('.aside-nav-target-r3');
    var $headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    $navTarget.wrap("<div class='relative-container-r3'></div>");
    $navTarget.after('<div style="clear:left">');

    for (var i = 0; i < $navTarget.length; i++) {

        var j = 0;
        while ($headers[j] !== undefined) {

            var $h = $($headers[j]);
                for (var k = 0; k < $h.length; k++) {
                    if ($($h[k]).attr('id') === undefined) {
                        $($h[k]).attr('id', 'h' + (j + 1) + '-' + (k + 1) + '_of_content_'+ (i + 1)).
                            addClass('ar3-h' + (j + 1));
                    }
                }

            j++;
        }
    }

})();
