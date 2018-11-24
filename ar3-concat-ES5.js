'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*######################
// ar3-aside-nav-2.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-2.js"></script>
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

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-4.js"></script>
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
        $('.aside-nav-target-r3')[0].addEventListener('resize', dynamicAside);
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

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-5.js"></script>
--------------------------*/

{
    $('.r3-aside-nav').find('a + nav').prev().before('<div class="r3-accordion-B"></div>');
}

// r3-separator

/*#######################
// ar3-short-code-2b.js  #
#######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/short-code/ar3-short-code-2b.js"></script>
--------------------------*/

{
    var _constructNote = 'r3-short-code_done',
        _isConstructed = $('body').hasClass(_constructNote);

    {
        // 2nd update start
        var isIndo = $('body').attr('lang') == 'id';
        var text1 = isIndo ? 'tunjukkan semua kode' : 'show all code',
            text2 = isIndo ? 'persingkat kode' : 'short code';
        // 2nd update end

        if (!_isConstructed) {
            $('pre + pre').css('display', 'none').before('<button class="r3-short-code r3-active">' + text1 + '</button>');
        } else {
            $('.r3-short-code').addClass('r3-active').prev().css('display', 'block').next().next().css('display', 'none');
        }

        $('.r3-short-code').click(function () {
            if ($(this).hasClass('r3-active')) {
                this.innerHTML = text2;
                $(this).prev().children().delay(300).toggle(600);
                $(this).next().children().toggle(300);
            } else {
                this.innerHTML = text1;
                $(this).prev().children().toggle(300);
                $(this).next().children().delay(300).toggle(600);
            }
            $(this).toggleClass('r3-active');
        });
    }

    $('body').addClass(_constructNote);
}

// r3-separator

/*##################
// ar3-top-nav.js  #
##################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/top-nav/ar3-top-nav.js"></script>
--------------------------*/

{
    var _topCoord = function _topCoord(elem) {
        var y = elem.getBoundingClientRect().top + window.scrollY;
        return y;
    };

    var scrolltop = function scrolltop() {
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

    var dynamicHeader = function dynamicHeader() {
        var topLimit = _topCoord(_$main[0]) - $nav.innerHeight() - 15;
        if (scrolltop() < topLimit) {
            $nav.css({ 'position': 'fixed', 'top': 0 });
        } else if (scrolltop() > topLimit) {
            $nav.css({ 'position': 'absolute', 'top': topLimit + 'px' });
        }
    };

    var $nav = $('#r3-nav'),
        _$main = $('main');

    dynamicHeader();

    document.addEventListener('click', dynamicHeader);
    window.addEventListener('resize', dynamicHeader);
    document.addEventListener('scroll', dynamicHeader);
}

// r3-separator

/*################
// ar3-tab-2.js  #
################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/tab/ar3-tab-2.js"></script>
--------------------------*/

{
    var _constructNote2 = 'r3-tab_done',
        _isConstructed2 = $('body').hasClass(_constructNote2);

    {
        var $contents = $('.tab-r3 > div > div'),
            $links = $('.tab-r3 > nav > a');

        if (!_isConstructed2) {
            for (var _i = 0; _i < $contents.length; _i++) {
                if ($($contents[_i]).attr('id') == undefined) {
                    $($contents[_i]).attr('id', 'r3_tab_content_' + _i);
                }
            }

            var id = void 0;
            for (var _i2 = 0; _i2 < $contents.length; _i2++) {
                id = $($contents[_i2]).attr('id');
                $links[_i2].setAttribute('data-tab-r3', id);
            }
        } else {
            $links.removeClass('r3-active');
            $('.tab-r3 > div > div').css('display', 'none');
            $('.tab-r3 > div > div:first-child').css('display', 'block');
        }
        var $1stLink = $('.tab-r3 > nav > a:first-child');
        $1stLink.addClass('r3-active');

        $links.click(function () {
            if (!$(this).hasClass('r3-active')) {
                var _id = $(this).attr('data-tab-r3');
                $(this).siblings().removeClass('r3-active');
                $(this).addClass('r3-active');
                $('#' + _id).siblings().fadeOut(400);
                $('#' + _id).delay(401).fadeIn();
            }
        });
    }

    // 2nd update
    {
        var $insideLinks = $('.tab-r3 > div:nth-child(2) div.relative-container-r3 > a');
        $insideLinks.click(function () {
            var n = $(this).attr('data-tab-a');
            $(this).parents('.tab-r3').children('nav').children('a:nth-of-type(' + n + ')').click();
        });
    }

    $('body').addClass(_constructNote2);
}

// r3-separator

/*#################################
// ar3-cpp-ue4-code-wrapper-2.js  #
#################################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/modular/code-wrapper/ar3-cpp-ue4-code-wrapper-2.js"></script>
--------------------------*/

{
    var _constructNote3 = 'r3-cpp-ue4-code-wrapper_done',
        _isConstructed3 = $('body').hasClass(_constructNote3);

    (function () {

        // 1. (2nd update)
        var $codExes = $('.cpp-codexes-r3');
        if ($codExes == null) {
            return;
        }

        var classTag = 'var',
            classClass = 'blue-r3',
            constrTag = 'span',
            varTag = 'span',
            var2Tag = 'span',
            varClass = 'green-r3',
            var2Class = "grey-r3",
            functTag = 'mark',
            commentTag = 'span',
            commentClass = 'comment-r3',
            inputTag = 'var',
            inputClass = 'magenta-r3',
            tabLength = 4;

        function wrapTag(text) {
            var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'span';
            var css_class = arguments[2];

            if (css_class != null) {
                return '<' + tag + ' class="' + css_class + '">' + text + '</' + tag + '>';
            } else {
                return '<' + tag + '>' + text + '</' + tag + '>';
            }
        }

        function wrapFromAttr(targText, targHtml, attr_, tag_, class_) {
            var words = $(targHtml).attr(attr_);
            if (words) {
                words = words.split(',');

                var rx_ = void 0;
                for (var _j2 = 0; _j2 < words.length; _j2++) {
                    rx_ = new RegExp('\\b' + words[_j2] + '\\b', 'g');
                    targText = targText.replace(rx_, wrapTag(words[_j2], tag_, class_));
                }
            }
            return targText;
        }

        function wrapSinglComment(targetText, tagComment_, classComment_) {
            var comments = targetText.match(/\/\/.*$/mg);
            if (comments == null) {
                return targetText;
            }
            if (comments.length > 0) {
                var setComments = new Set(comments);
                comments = [].concat(_toConsumableArray(setComments));
                for (var _i3 = 0; _i3 < comments.length; _i3++) {
                    var rexComment = new RegExp(comments[_i3], 'g');
                    targetText = targetText.replace(rexComment, wrapTag(comments[_i3], tagComment_, classComment_));
                }
            }
            return targetText;
        }

        function wrapMultComment(targetText, tagComment_, classComment_) {
            targetText = targetText.replace(/\/\*/gm, '<' + tagComment_ + ' class="' + classComment_ + '">/*');
            targetText = targetText.replace(/\*\//gm, '*/</' + tagComment_ + '>');
            return targetText;
        }

        function wrapComment(targetText) {
            targetText = wrapSinglComment(targetText, commentTag, commentClass);
            targetText = wrapMultComment(targetText, commentTag, commentClass);
            return targetText;
        }

        function addTabForFunction(targetText) {

            var sumText = void 0;
            if (/\{/.exec(targetText) == null) {
                return targetText;
            }
            if (/\{/.exec(targetText).length > 0) {
                var tab_ = '&nbsp;'.repeat(tabLength);

                var arrText = targetText.split('\n'),
                    openCurlyCount = 0,
                    lineText = void 0;

                for (var _i4 = 0; _i4 < arrText.length; _i4++) {

                    if (arrText[_i4].indexOf('{') > -1) {
                        arrText[_i4] = tab_.repeat(openCurlyCount) + arrText[_i4];
                        openCurlyCount++;
                        continue;
                    } else if (arrText[_i4].indexOf('}') > -1) {
                        openCurlyCount--;
                        arrText[_i4] = tab_.repeat(openCurlyCount) + arrText[_i4];
                        continue;
                    }

                    if (openCurlyCount == 0) {
                        continue;
                    }

                    if (arrText[_i4].indexOf('public:') > -1 || arrText[_i4].indexOf('protected:') > -1) {
                        arrText[_i4] = tab_.repeat(openCurlyCount - 1) + arrText[_i4];
                    } else {
                        arrText[_i4] = tab_.repeat(openCurlyCount) + arrText[_i4];
                    }
                }

                targetText = arrText.join('\n');
            }

            return targetText;
        }

        for (var h = 0; h < $codExes.length; h++) {
            var $codEx = $($codExes[h]).find('pre'); // change in 2nd update
            if ($codEx.length > 0) {

                for (var _i5 = 0; _i5 < $codEx.length; _i5++) {

                    var codText = $codEx[_i5].innerHTML;

                    // 1.a.
                    {
                        codText = codText.replace(/\>/g, '&gt;');
                        codText = codText.replace(/\</g, '&lt;');
                    }

                    // 1.b.
                    {
                        var baseClass = $($codExes[h]).attr('data-cpp-class-r3'),
                            rxBaseClass = void 0;

                        codText = codText.replace(baseClass + '\.h', wrapTag(baseClass, classTag, classClass));

                        baseClass = 'A' + baseClass;
                        rxBaseClass = new RegExp(' ' + baseClass + '::', 'g');
                        codText = codText.replace(rxBaseClass, ' ' + wrapTag(baseClass, classTag, classClass) + '::');

                        codText = codText.replace(baseClass + ' : public', ' ' + wrapTag(baseClass, classTag, classClass) + ' : public');

                        codText = codText.replace(baseClass + '()', wrapTag(baseClass, constrTag, classClass) + '()');

                        rxBaseClass = new RegExp('&amp;' + baseClass, 'g');
                        codText = codText.replace(rxBaseClass, '&amp;' + wrapTag(baseClass, classTag, classClass));
                    }

                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-funct-r3', functTag); // 1.c.
                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-var-r3', varTag, varClass); // 1.d.
                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-var2-r3', var2Tag, var2Class); // 1.e.
                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-input-r3', inputTag, inputClass); // 1.f.

                    {
                        codText = wrapComment(codText); // 2.a.
                        codText = addTabForFunction(codText); // 2.b.
                        codText = codText.replace(/\n/g, '\n<br>'); // 2.c.
                    }

                    $codEx[_i5].innerHTML = codText;
                }
            }
        }
    })();

    $('body').addClass(_constructNote3);
}

// r3-separator

/*######################
// ar3-accordion-B.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/accordion/ar3-accordion-B-1.js"></script>
--------------------------*/

{
    var accordTarget = $('body').attr('data-accordion-B-r3'),
        _isValid = accordTarget !== undefined;
    if (_isValid) {
        $(accordTarget).addClass('r3-accordion-B');
    }

    $('.r3-accordion-B').click(function () {
        $(this).toggleClass('r3-active').next().next().slideToggle('slow');
    });
}

// r3-separator

$('main > div > h3').on('click touch', function () {
    if (this.classList.contains("r3-active") !== true) {
        this.style.setProperty('-webkit-transition', 'background-color 0.3s ease-in-out 0.6s, border-radius 0.2s 0.6s, color 0.3s ease-in-out 0.6s');
        this.style.setProperty('transition', 'background-color 0.3s ease-in-out 0.6s, border-radius 0.2s 0.6s, color 0.3s ease-in-out 0.6s');
        $(this).next().slideToggle(600);
    } else {
        this.style.setProperty('-webkit-transition', 'background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
        this.style.setProperty('transition', 'background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
        $(this).next().delay(300).slideToggle(600);
    }
    this.classList.toggle("r3-active");
});

// r3-separator

/*#######################
// ar3-trivial-attr.js  #
#######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/trivial/ar3-trivial-attr.js"></script>
--------------------------*/

{
    var _constructNote4 = 'ar3-trivial-attr_is_constructed',
        _isConstructed4 = $('body').hasClass(_constructNote4);

    if (!_isConstructed4) {

        // 1.
        {
            var isEnglish = $('body').attr('lang') == 'en';
            if (!isEnglish) {
                $('i').attr('lang', 'en');
            }
        }

        // 2.
        $('code, pre').attr('translate', 'no');

        // 3.
        $('.comment-r3').attr('translate', 'yes');

        // 4.
        $('video').attr('controls');

        // 5.
        $("a[href^='http']").attr('target', '_blank');

        // 6.
        {
            var youtubeResize = function youtubeResize() {
                var youtube = document.querySelector("iframe[src*='youtube']"),
                    maxWidth = $(youtube).parents('section').width() * 0.8,
                    maxHeight = 9 / 16 * maxWidth;

                $("iframe[src*='youtube']").css({
                    'width': maxWidth + 'px',
                    'height': maxHeight + 'px'
                });
            };

            youtubeResize();

            window.addEventListener('resize', youtubeResize);
        }
    }

    $('body').addClass(_constructNote4);
}

// r3-separator

/*######################
// ar3-trivial-tag.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/trivial/ar3-trivial-tag.js"></script>
--------------------------*/

{
    var _constructNote5 = 'ar3-trivial-tag_is_constructed',
        _isConstructed5 = $('body').hasClass(_constructNote5);

    if (!_isConstructed5) {

        // 1.
        $('table, pre').wrap('<div style="overflow:auto">');

        // 2.
        {
            var $img = $('img').not('code > img, h3 > img');
            for (var _i6 = 0; _i6 < $img.length; _i6++) {
                if ($($img[_i6]).parent().hasClass('relative-container-r3')) {
                    $($img[_i6]).parent().css('overflow', 'auto');
                } else {
                    $($img[_i6]).wrap('<div style="overflow:auto">');
                }
            }
        }

        // 3.
        $('main section + h3, aside > nav + .r3-accordion-B, aside > a + .r3-accordion-B').before('<hr>');
        {
            var $h4s = $('main section > h4');
            if ($h4s != null) {
                for (var _i7 = 0; _i7 < $h4s.length; _i7++) {
                    var $h4 = $($h4s[_i7]);
                    if ($h4.prev().length != 0) {
                        $h4.before('<hr>');
                    }
                }
            }
        }

        // 4.
        {
            var $titles = $('main > div');
            var title = void 0,
                _id2 = void 0,
                $target = void 0;

            for (var _i8 = 0; _i8 < $titles.length; _i8++) {
                title = $($titles[_i8]).attr('data-title-r3');
                _id2 = $($titles[_i8]).find('> h2:first-child').attr('id');
                $target = $('aside > a[href="#' + _id2 + '"]');
                if ($target.prev('.r3-accordion-B').length > 0) {
                    $target.prev().before('<h3>' + title + '</h3>');
                } else {
                    $target.before('<h3>' + title + '</h3>');
                }
            }
        }

        // 5.
        {
            var $firstLineTableinHeader = $('header table td:first-child');
            for (var _i9 = 0; _i9 < $firstLineTableinHeader.length; _i9++) {
                var text = $($firstLineTableinHeader[_i9]).html();
                $($firstLineTableinHeader[_i9]).html(text + '<b style="float:right">&nbsp;:</b>');
            }
        }

        // 6.
        {
            var $address = $('code:contains("📁")', 'main, header');
            for (var _i10 = 0; _i10 < $address.length; _i10++) {
                var addressHTML = $address[_i10].innerHTML;
                $address[_i10].innerHTML = addressHTML.replace(/📁/g, '<span class="no-copy-r3">📁</span>');
            }
        }
    }

    $('body').addClass(_constructNote5);
}
