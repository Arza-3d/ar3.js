'use strict';

/*######################
// ar3-aside-nav-2.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-2.js"></script>
--------------------------*/

{
    var $navTarget = $('.aside-nav-target-r3');
    if ($navTarget.length !== 0) {
        var constructNote = 'ar3-aside-nav_done',
            isConstructed = $('body').hasClass(constructNote);

        // update 2 start
        var headers = void 0;
        {
            var newHeader = $('body').attr('data-headers-r3');
            var isValid = newHeader !== undefined;
            newHeader = isValid ? newHeader.split('|') : newHeader;
            headers = isValid ? newHeader : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        }
        // update 2 end

        // create necessary wrap for dynamic aside
        if (!isConstructed) {
            $navTarget.wrap("<div class='relative-container-r3'>");
            $navTarget.after('<div style="clear:left">');
        } else {
            $navTarget.parent().children('.r3-aside-nav').remove();
        }

        // construct navigation
        for (var i = 0; i < $navTarget.length; i++) {

            // insert aside
            $($navTarget[i]).before('<aside id="r3-aside-nav-' + (i + 1) + '" class="r3-aside-nav">');

            // create id and class for h1-h6
            {
                var j = 0;
                while (headers[j] !== undefined) {
                    var $h = $($navTarget[i]).find(headers[j]);
                    for (var k = 0; k < $h.length; k++) {
                        $($h[k]).addClass('r3-h' + (j + 1));
                        if ($($h[k]).attr('id') === undefined) {
                            $($h[k]).attr('id', 'h' + (j + 1) + '-' + (k + 1) + '_of_content_' + (i + 1));
                        }
                    }
                    j++;
                }
            }

            {
                (function () {
                    var createLink = function createLink($header) {
                        return $targetLinkParent.append('<a href="#' + $header.attr('id') + '">' + $header.html() + '</a>');
                    };

                    var $allH = $($navTarget[i]).find(headers.toString()),
                        $h1st = $($allH[0]);
                    var $targetLinkParent = $('#r3-aside-nav-' + (i + 1));
                    var $linkParent0 = $targetLinkParent;
                    $targetLinkParent.append('<a href="#' + $h1st.attr('id') + '">' + $h1st.html() + '</a>');

                    var $hPrev = $h1st,
                        hPrevClass = $hPrev.attr('class'),
                        hPrevHierarchy = parseInt(hPrevClass.slice(4));
                    for (var _j = 1; _j < $allH.length; _j++) {
                        var _$h = $($allH[_j]),
                            hClass = _$h.attr('class'),
                            hHierarchy = parseInt(hClass.slice(4));

                        var hierarchyDiff = hPrevHierarchy - hHierarchy;
                        if (hierarchyDiff == 0) {
                            createLink(_$h);
                        } else if (hierarchyDiff == -1) {
                            $targetLinkParent.append('<nav class="r3-hierarchy-' + hPrevHierarchy + '"></nav>');
                            $targetLinkParent = $targetLinkParent.find('nav:last-child');
                            createLink(_$h);
                        } else if (hierarchyDiff > 0) {
                            if (hHierarchy == 1) {
                                $targetLinkParent = $linkParent0;
                                createLink(_$h);
                            } else {
                                $targetLinkParent = $linkParent0.find('.r3-hierarchy-' + (hHierarchy - 1) + ':last-child');
                                createLink(_$h);
                            }
                        }
                        $hPrev = _$h;
                        hPrevHierarchy = hHierarchy;
                    }
                })();
            }
        }

        $('body').addClass(constructNote);
    }
}

// r3-separator

/*######################
// ar3-aside-nav-4.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-4.js"></script>
--------------------------*/

{
    // get top coordinate of an element
    var topCoord = function topCoord(elem) {
        var y = elem.getBoundingClientRect().top + window.scrollY;
        return y;
    };

    var leftCoord = function leftCoord(elem) {
        var x = elem.getBoundingClientRect().left + window.scrollX;
        return x;
    };

    // track current position


    {

        // get current scroll top = 0 coordinate
        var scrollTopCoord = function scrollTopCoord() {
            var top = 0;
            if (typeof window.pageYOffset === "number") {
                top = window.pageYOffset;
            } else if (document.body && document.body.scrollTop) {
                top = document.body.scrollTop;
            } else if (document.documentElement && document.documentElement.scrollTop) {
                top = document.documentElement.scrollTop;
            }
            return top;
        };

        var setLocation = function setLocation(elem, $anchor) {
            $(elem).css({
                'top': topCoord($anchor[0]) + $anchor[0].getBoundingClientRect().height * 0.25,
                'left': leftCoord($anchor[0]) + $anchor[0].getBoundingClientRect().width
            });
        };

        var setButtonLocation = function setButtonLocation() {
            setLocation('.r3-aside-nav-button', $aside);
        };

        var dynamicAside = function dynamicAside() {
            var topLimit = topCoord($main[0]);
            var bottomLimit = topLimit + $main[0].scrollHeight - window.innerHeight;
            setLocation('.r3-aside-nav-button', $aside);
            if (scrollTopCoord() < topLimit) {
                $aside.removeClass('r3-dynamic-on').removeClass('r3-dynamic-after');
                $dummy.removeClass('r3-active');
            } else if (scrollTopCoord() < bottomLimit) {
                $aside.removeClass('r3-dynamic-after').addClass('r3-dynamic-on');
                $dummy.addClass('r3-active');
            } else {
                $aside.removeClass('r3-dynamic-on').addClass('r3-dynamic-after');
                $dummy.addClass('r3-active');
            }
        };

        // make sure it is the same with the _r3-aside-nav-1.scss
        var stopUpdateButton = function stopUpdateButton() {
            clearInterval(buttonMove);
        };

        var $aside = $('.r3-aside-nav');
        $aside.before('<div class="r3-aside-replacement">');
        var $dummy = $('.r3-aside-replacement');

        var $main = $('.aside-nav-target-r3');

        var $button = $('.r3-aside-nav-button');
        $button.remove();
        {
            $('body').prepend('<a class="r3-aside-nav-button r3-active">&#9664;</a>');
            setLocation('.r3-aside-nav-button', $aside);
        }
        $button = $('.r3-aside-nav-button');

        dynamicAside();

        document.addEventListener('click', dynamicAside);
        window.addEventListener('resize', dynamicAside);
        document.addEventListener('scroll', dynamicAside);

        var buttonMove = void 0,
            buttonStop = void 0;
        var marginLeftTransition = 500,
            mainDefaultWidth = '79%';
        $button.click(function () {
            if (buttonStop !== undefined) {
                clearTimeout(buttonStop);
            }
            $button.toggleClass('r3-active');
            if ($('.r3-aside-nav-button').hasClass('r3-active')) {
                $button.html('&#9664;');
                $aside.add($dummy).css('margin-left', '0');
                $main.css('width', mainDefaultWidth);
            } else {
                $button.html('&#9658;');
                $aside.add($dummy).css('margin-left', -1 * $aside[0].getBoundingClientRect().width + 'px');
                $main.css('width', '95%');
            }
            buttonMove = setInterval(setButtonLocation, 1);
            buttonStop = setTimeout(stopUpdateButton, marginLeftTransition);
        });
    }
}

// r3-separator

/*######################
// ar3-aside-nav-5.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-5.js"></script>
--------------------------*/

{
    $('.r3-aside-nav').find('a + nav').prev().before('<div class="r3-accordion-B"></div>');
}

// r3-separator

/*######################
// ar3-accordion-B.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/accordion/ar3-accordion-B-1.js"></script>
--------------------------*/

{
    $('.r3-accordion-B').click(function () {
        $(this).toggleClass('r3-active').next().next().slideToggle('slow');
    });
}

// r3-separator

/*##################
// ar3-trivial-attr.js  #
##################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/trivial/ar3-trivial-attr.js"></script>
--------------------------*/

{
    var _constructNote = 'ar3-trivial-attr_is_constructed',
        _isConstructed = $('body').hasClass(_constructNote);

    if (!_isConstructed) {

        // 1.
        $('header').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

        // 2.
        var isEnglish = $('body').attr('lang') == 'en';
        if (!isEnglish) {
            $('i').attr('lang', 'en');
        }

        // 3.
        $('code, pre').attr('translate', 'no');

        // 4.
        $('.comment-r3').attr('translate', 'yes');

        // 5.
        $('video').attr('controls');

        // 6.
        $("a[href^='http']").attr('target', '_blank');
    }

    $('body').addClass(_constructNote);
}
