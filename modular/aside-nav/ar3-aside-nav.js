(function() {
    'use strict';

    var $navTarget = $('.aside-nav-target-r3');
    if ($navTarget.length !== 0) {
        var constructNote = 'ar3-aside-nav_done';
        var isConstructed = $('body').hasClass(constructNote);

        var $headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

        // create necessary wrap for dynamic aside
        $navTarget.wrap("<div class='relative-container-r3'>");
        $navTarget.after('<div style="clear:left">');

        // add class and id
        for (var i = 0; i < $navTarget.length; i++) {
            var j = 0;

            // insert aside
            $($navTarget[i]).before('<aside id="r3-aside-nav' + (i + 1) +'" class="r3-aside-nav">');

            while ($headers[j] !== undefined) {
                var $h = $($navTarget[i]).find($headers[j]);
                    for (var k = 0; k < $h.length; k++) {

                        $($h[k]).addClass('ar3-h' + (j + 1));

                        if ($($h[k]).attr('id') === undefined) {
                            $($h[k]).attr('id', 'h' + (j + 1) + '-' + (k + 1) + '_of_content_'+ (i + 1));
                        }

                        // create element
                        $('').;
                    }

                j++;
            }
        }

        $('body').addClass(constructNote);
    }

})();
