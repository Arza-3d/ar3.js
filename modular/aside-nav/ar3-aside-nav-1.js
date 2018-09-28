/*######################
// ar3-aside-nav-1.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3js/master/modular/tab/ar3-aside-nav-1.js"></script>
--------------------------*/

(function() {
    'use strict';

    var $navTarget = $('.aside-nav-target-r3');
    if ($navTarget.length !== 0) {
        var constructNote = 'ar3-aside-nav_done';
        var isConstructed = $('body').hasClass(constructNote);

        var headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

        // create necessary wrap for dynamic aside
        if (!isConstructed) {
            $navTarget.wrap("<div class='relative-container-r3'>");
            $navTarget.after('<div style="clear:left">');
        } else {
            $navTarget.parent().children('.r3-aside-nav').remove();
        }

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
                            $($h[k]).addClass('r3-h' + (j + 1));
                            if ($($h[k]).attr('id') === undefined) {
                                $($h[k]).attr('id', 'h' + (j + 1) + '-' + (k + 1) + '_of_content_'+ (i + 1));
                            }
                        }
                    j++;
                }
            })();

            (function() {
                var $allH = $($navTarget[i]).find(headers.toString());
                var $h1st = $($allH[0]);
                var $targetLinkParent = $('#r3-aside-nav-' + (i + 1));
                var $linkParent0 = $targetLinkParent;
                $targetLinkParent.append('<a href="#'+ $h1st.attr('id') + '">' + $h1st.html() + '</a>');

                function createLink($header) {
                    return $targetLinkParent.append('<a href="#'+ $header.attr('id') + '">' + $header.html() + '</a>');
                }
                var $hPrev = $h1st;
                var hPrevClass = $hPrev.attr('class');
                var hPrevHierarchy = parseInt(hPrevClass.slice(4));
                for(var j = 1; j < $allH.length; j++) {
                    var $h = $($allH[j]);
                    var hClass = $h.attr('class');
                    var hHierarchy = parseInt(hClass.slice(4));

                    var hierarchyDiff = hPrevHierarchy - hHierarchy;

                    if (hierarchyDiff  == 0) {
                        createLink($h);
                    } else if (hierarchyDiff  == -1) {
                        $targetLinkParent.append('<nav class="r3-hierarchy-' + hPrevHierarchy + '"></nav>');
                        $targetLinkParent = $targetLinkParent.find('nav:last-child');
                        createLink($h);
                    } else if (hierarchyDiff > 0) {

                        if (hHierarchy == 1) {
                            $targetLinkParent = $linkParent0;
                            createLink($h);
                        } else {

                            var test = '.r3-hierarchy-' + (hHierarchy - 1) + ':last-child';
                            $targetLinkParent = $linkParent0.find(test);
                            createLink($h);
                        }

                    }
                    $hPrev = $h;
                    hPrevHierarchy = hHierarchy;
                }
            })();
        }

        $('body').addClass(constructNote);
    }

})();
