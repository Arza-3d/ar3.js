(function() {
    'use strict';

    var $navTarget = $('.aside-nav-target-r3');
    if ($navTarget.length !== 0) {
        var constructNote = 'ar3-aside-nav_done';
        var isConstructed = $('body').hasClass(constructNote);

        var headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

        // create necessary wrap for dynamic aside
        $navTarget.wrap("<div class='relative-container-r3'>");
        $navTarget.after('<div style="clear:left">');

        // add class and id
        for (var i = 0; i < $navTarget.length; i++) {

            // insert aside
            $($navTarget[i]).before('<aside id="r3-aside-nav-' + (i + 1) +'" class="r3-aside-nav">');

            // create id and class for h1-h6
            (function() {
                var j = 0;
                while (headers[j] !== undefined) {
                    var $h = $($navTarget[i]).find(headers[j]);

                        for (var k = 0; k < $h.length; k++) {

                            $($h[k]).addClass('ar3-h' + (j + 1));

                            if ($($h[k]).attr('id') === undefined) {
                                $($h[k]).attr('id', 'h' + (j + 1) + '-' + (k + 1) + '_of_content_'+ (i + 1));
                            }
                        }
                    j++;
                }
            })();

            // create element <a> in aside
            (function() {
                var $hInTarget = $($navTarget[i]).find(headers.toString());
                for(var j = 0; j < $hInTarget.length; j++) {

                    var $prevEl = (j !== 0) ? $($hInTarget[j - 1]) : undefined;

                    $('#r3-aside-nav-' + (i + 1)).append('<a href="#'+ $($hInTarget[j]).attr('id') + '">' + $($hInTarget[j]).html() + '</a>');
                }
            })();
        }

        $('body').addClass(constructNote);
    }

})();
