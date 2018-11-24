/*######################
// ar3-aside-nav-2.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-2.js"></script>
--------------------------*/

{
    const $navTarget = $('.aside-nav-target-r3');
    if ($navTarget.length !== 0) {
        const constructNote = 'ar3-aside-nav_done',
            isConstructed = $('body').hasClass(constructNote);

        // update 2 start
        let headers;
        {
            let newHeader = $('body').attr('data-headers-r3');
            const isValid = newHeader !== undefined;
            newHeader = (isValid) ? newHeader.split('|') : newHeader;
            headers = (isValid) ? newHeader : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
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
        for (let i = 0; i < $navTarget.length; i++) {

            // insert aside
            $($navTarget[i]).before('<aside id="r3-aside-nav-' + (i + 1) + '" class="r3-aside-nav">');

            // create id and class for h1-h6
            {
                let j = 0;
                while (headers[j] !== undefined) {
                    let $h = $($navTarget[i]).find(headers[j]);
                        for (let k = 0; k < $h.length; k++) {
                            $($h[k]).addClass('r3-h' + (j + 1));
                            if ($($h[k]).attr('id') === undefined) {
                                $($h[k]).attr('id', 'h' + (j + 1) + '-' + (k + 1) + '_of_content_'+ (i + 1));
                            }
                        }
                    j++;
                }
            }

            {
                const $allH = $($navTarget[i]).find(headers.toString()),
                      $h1st = $($allH[0]);
                let $targetLinkParent = $('#r3-aside-nav-' + (i + 1));
                const $linkParent0 = $targetLinkParent;
                $targetLinkParent.append('<a href="#'+ $h1st.attr('id') + '">' + $h1st.html() + '</a>');

                function createLink($header) {
                    return $targetLinkParent.append('<a href="#'+ $header.attr('id') + '">' + $header.html() + '</a>');
                }
                let $hPrev = $h1st,
                    hPrevClass = $hPrev.attr('class'),
                    hPrevHierarchy = parseInt(hPrevClass.slice(4));
                for (let j = 1; j < $allH.length; j++) {
                    let $h = $($allH[j]),
                        hClass = $h.attr('class'),
                        hHierarchy = parseInt(hClass.slice(4));

                    let hierarchyDiff = hPrevHierarchy - hHierarchy;
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
                            $targetLinkParent = $linkParent0.find('.r3-hierarchy-' + (hHierarchy - 1) + ':last-child');
                            createLink($h);
                        }
                    }
                    $hPrev = $h;
                    hPrevHierarchy = hHierarchy;
                }
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
    function topCoord(elem) {
        let y = elem.getBoundingClientRect().top + window.scrollY;
        return y;
    }

    function leftCoord(elem) {
        let x = elem.getBoundingClientRect().left + window.scrollX;
        return x;
    }

    // track current position
    {
        const $aside = $('.r3-aside-nav');
        $aside.before('<div class="r3-aside-replacement">');
        const $dummy = $('.r3-aside-replacement');

        // get current scroll top = 0 coordinate
        function scrollTopCoord() {
            let top = 0;
            if (typeof window.pageYOffset === "number") {
                top = window.pageYOffset;
            } else if (document.body && document.body.scrollTop) {
                top = document.body.scrollTop;
            } else if (document.documentElement && document.documentElement.scrollTop) {
                top = document.documentElement.scrollTop;
            }
            return top;
        }

        const $main = $('.aside-nav-target-r3');

        function setLocation(elem, $anchor) {
            $(elem).css({
                'top' : topCoord($anchor[0]) + $anchor[0].getBoundingClientRect().height * 0.25,
                'left' : leftCoord($anchor[0]) + $anchor[0].getBoundingClientRect().width
            });
        }

        function setButtonLocation() {
            setLocation('.r3-aside-nav-button', $aside);
        }

        let $button = $('.r3-aside-nav-button');
        $button.remove();
        {
            $('body').prepend('<a class="r3-aside-nav-button r3-active">&#9664;</a>');
            setLocation('.r3-aside-nav-button', $aside);
        }
        $button = $('.r3-aside-nav-button');

        function dynamicAside() {
            let topLimit = topCoord($main[0]);
            let bottomLimit = topLimit + $main[0].scrollHeight - window.innerHeight;
            setLocation('.r3-aside-nav-button', $aside);
            if (scrollTopCoord() < topLimit) {
                $aside.removeClass('r3-dynamic-on')
                      .removeClass('r3-dynamic-after');
                $dummy.removeClass('r3-active');
            } else if (scrollTopCoord() < bottomLimit) {
                $aside.removeClass('r3-dynamic-after')
                      .addClass('r3-dynamic-on');
                $dummy.addClass('r3-active');
            } else {
                $aside.removeClass('r3-dynamic-on')
                      .addClass('r3-dynamic-after');
                $dummy.addClass('r3-active');
            }
        }
        dynamicAside();

        document.addEventListener('click', dynamicAside);
        window.addEventListener('resize', dynamicAside);
        $('.aside-nav-target-r3')[0].addEventListener('resize', dynamicAside);
        document.addEventListener('scroll', dynamicAside);

        let buttonMove,
            buttonStop;
        const marginLeftTransition = 500,
              mainDefaultWidth = '79%'; // make sure it is the same with the _r3-aside-nav-1.scss
        function stopUpdateButton() {
            clearInterval(buttonMove);
        }
        $button.click(function() {
            if (buttonStop !== undefined) {clearTimeout(buttonStop)}
            $button.toggleClass('r3-active');
            if ($('.r3-aside-nav-button').hasClass('r3-active')) {
                $button.html('&#9664;');
                $aside.add($dummy).css('margin-left', '0');
                $main.css('width', mainDefaultWidth);
            } else {
                $button.html('&#9658;');
                $aside.add($dummy).css('margin-left', (-1 * $aside[0].getBoundingClientRect().width) + 'px');
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
    $('.r3-aside-nav').find('a + nav').prev()
        .before('<div class="r3-accordion-B"></div>');
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
    const constructNote = 'r3-short-code_done',
        isConstructed = $('body').hasClass(constructNote);

    {
        // 2nd update start
        const isIndo = $('body').attr('lang') == 'id';
        let text1 = isIndo ? 'tunjukkan semua kode' : 'show all code',
            text2 = isIndo ? 'persingkat kode' : 'short code';
        // 2nd update end

        if (!isConstructed) {
            $('pre + pre').css('display', 'none')
                .before('<button class="r3-short-code r3-active">'+ text1 + '</button>');
        } else {
            $('.r3-short-code').addClass('r3-active')
                .prev().css('display', 'block')
                .next().next().css('display', 'none');
        }

        $('.r3-short-code').click(function() {
            if ($(this).hasClass('r3-active')) {
                this.innerHTML= text2;
                $(this).prev().children().delay(300).toggle(600);
                $(this).next().children().toggle(300);
            } else {
                this.innerHTML= text1;
                $(this).prev().children().toggle(300);
                $(this).next().children().delay(300).toggle(600);
            }
            $(this).toggleClass('r3-active');
        });
    }

    $('body').addClass(constructNote);
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
    function topCoord(elem) {
        let y = elem.getBoundingClientRect().top + window.scrollY;
        return y;
    }

    function scrolltop() {
        var top = 0;
        if (typeof window.pageYOffset === "number") {
            top = window.pageYOffset;
        } else if (document.body && document.body.scrollTop) {
            top = document.body.scrollTop;
        } else if (document.documentElement && document.documentElement.scrollTop) {
            top = document.documentElement.scrollTop;
        }
        return top;
    }


    const $nav = $('#r3-nav'),
          $main = $('main');
    function dynamicHeader() {
        let topLimit = topCoord($main[0]) - $nav.innerHeight() - 15;
        if (scrolltop() < topLimit) {
            $nav.css({'position': 'fixed', 'top' : 0});
        } else if (scrolltop() > topLimit){
            $nav.css({'position': 'absolute', 'top': topLimit + 'px'});
        }
    }
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
    const constructNote = 'r3-tab_done',
        isConstructed = $('body').hasClass(constructNote);

    {
        const $contents = $('.tab-r3 > div > div'),
              $links = $('.tab-r3 > nav > a');

        if (!isConstructed) {
            for (let i = 0; i < $contents.length; i++) {
                if ($($contents[i]).attr('id') == undefined) {
                    $($contents[i]).attr('id', 'r3_tab_content_'+ i);
                }
            }

            let id;
            for (let i = 0; i < $contents.length; i++) {
                id = $($contents[i]).attr('id');
                $links[i].setAttribute('data-tab-r3', id);
            }
        } else {
            $links.removeClass('r3-active');
            $('.tab-r3 > div > div').css('display', 'none');
            $('.tab-r3 > div > div:first-child').css('display', 'block');
        }
        const $1stLink = $('.tab-r3 > nav > a:first-child');
        $1stLink.addClass('r3-active');

        $links.click(function() {
            if (!$(this).hasClass('r3-active')) {
                let id = $(this).attr('data-tab-r3');
                $(this).siblings().removeClass('r3-active');
                $(this).addClass('r3-active');
                $('#'+id).siblings().fadeOut(400);
                $('#'+id).delay(401).fadeIn();
            }
        });
    }

    // 2nd update
    {
        const $insideLinks = $('.tab-r3 > div:nth-child(2) div.relative-container-r3 > a');
        $insideLinks.click(function() {
            let n = $(this).attr('data-tab-a');
            $(this).parents('.tab-r3')
                .children('nav')
                .children('a:nth-of-type('+ n +')').click();
        });
    }

    $('body').addClass(constructNote);
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
    const constructNote = 'r3-cpp-ue4-code-wrapper_done',
          isConstructed = $('body').hasClass(constructNote);

    (function(){

        // 1. (2nd update)
        const $codExes = $('.cpp-codexes-r3');
        if ($codExes == null) {return;}

        const classTag = 'var',
              classClass = 'blue-r3',
              constrTag = 'span',
              varTag = 'span',
              var2Tag= 'span',
              varClass = 'green-r3',
              var2Class = "grey-r3",
              functTag = 'mark',
              commentTag = 'span',
              commentClass = 'comment-r3',
              inputTag = 'var',
              inputClass = 'magenta-r3',
              tabLength = 4;

        function wrapTag(text, tag = 'span', css_class) {
            if (css_class != null) {
                return '<' + tag + ' class="' + css_class + '">' + text + '</' + tag + '>';
            } else {
                return '<' + tag + '>' + text + '</' + tag + '>';
            }
        }

        function wrapFromAttr(targText, targHtml, attr_,tag_, class_) {
            let words = $(targHtml).attr(attr_);
            if (words) {
                words = words.split(',');

                let rx_;
                for (let j = 0; j < words.length; j++) {
                    rx_ = new RegExp('\\b'+ words[j] + '\\b', 'g');
                    targText = targText.replace(rx_, wrapTag(words[j], tag_, class_));
                }
            }
            return targText;
        }

        function wrapSinglComment(targetText, tagComment_, classComment_) {
            let comments = targetText.match(/\/\/.*$/mg);
            if (comments == null) {return targetText;}
            if (comments.length > 0) {
              let setComments = new Set(comments);
              comments = [...setComments];
                for (let i = 0; i < comments.length; i++) {
                    let rexComment = new RegExp(comments[i], 'g');
                    targetText = targetText.replace(rexComment, wrapTag(comments[i], tagComment_, classComment_));
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

            let sumText;
            if (/\{/.exec(targetText) == null) {return targetText;}
            if (/\{/.exec(targetText).length > 0) {
                let tab_ = '&nbsp;'.repeat(tabLength);

                let arrText = targetText.split('\n'),
                    openCurlyCount = 0,
                    lineText;

                for (let i = 0; i < arrText.length; i++) {

                    if (arrText[i].indexOf('{') > -1) {
                        arrText[i] = tab_.repeat(openCurlyCount) + arrText[i];
                        openCurlyCount++;
                        continue;
                    } else if (arrText[i].indexOf('}') > -1) {
                        openCurlyCount--;
                        arrText[i] = tab_.repeat(openCurlyCount) + arrText[i];
                        continue;
                    }

                    if (openCurlyCount == 0) {
                        continue;
                    }

                    if (arrText[i].indexOf('public:') > -1 || arrText[i].indexOf('protected:') > -1) {
                        arrText[i] = tab_.repeat(openCurlyCount - 1) + arrText[i];
                    } else {
                        arrText[i] = tab_.repeat(openCurlyCount) + arrText[i];
                    }

                }

                targetText = arrText.join('\n');
            }

            return targetText;
        }

        for (let h = 0; h < $codExes.length; h++) {
            let $codEx = $($codExes[h]).find('pre'); // change in 2nd update
            if ($codEx.length > 0) {

                for (let i = 0; i < $codEx.length; i++) {

                    let codText = $codEx[i].innerHTML;

                    // 1.a.
                    {
                        codText = codText.replace(/\>/g, '&gt;');
                        codText = codText.replace(/\</g, '&lt;');
                    }

                    // 1.b.
                    {
                        let baseClass = $($codExes[h]).attr('data-cpp-class-r3'),
                            rxBaseClass;

                        codText = codText.replace(baseClass + '\.h', wrapTag(baseClass, classTag, classClass));

                        baseClass = 'A' + baseClass;
                        rxBaseClass = new RegExp(' ' + baseClass + '::', 'g');
                        codText = codText.replace(rxBaseClass, ' ' + wrapTag(baseClass, classTag, classClass) + '::');

                        codText = codText.replace(baseClass + ' : public', ' ' + wrapTag(baseClass, classTag, classClass) + ' : public');

                        codText = codText.replace(baseClass + '()', wrapTag(baseClass, constrTag, classClass) + '()');

                        rxBaseClass = new RegExp('&amp;' + baseClass, 'g');
                        codText = codText.replace(rxBaseClass, '&amp;' + wrapTag(baseClass, classTag, classClass));
                    }

                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-funct-r3', functTag,); // 1.c.
                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-var-r3', varTag, varClass); // 1.d.
                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-var2-r3', var2Tag, var2Class); // 1.e.
                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-input-r3', inputTag, inputClass); // 1.f.

                    {
                        codText = wrapComment(codText); // 2.a.
                        codText = addTabForFunction(codText); // 2.b.
                        codText = codText.replace(/\n/g, '\n<br>'); // 2.c.
                    }

                    $codEx[i].innerHTML = codText;

                }
            }
        }

    })();

    $('body').addClass(constructNote);
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
    let accordTarget = $('body').attr('data-accordion-B-r3'),
        isValid = accordTarget !== undefined;
    if (isValid) {
        $(accordTarget).addClass('r3-accordion-B');
    }

    $('.r3-accordion-B').click(function() {
        $(this).toggleClass('r3-active')
            .next().next().slideToggle('slow');
    });
}


// r3-separator

$('main > div > h3').on('click touch', function(){
    if (this.classList.contains("r3-active") !== true) {
        this.style.setProperty('-webkit-transition','background-color 0.3s ease-in-out 0.6s, border-radius 0.2s 0.6s, color 0.3s ease-in-out 0.6s');
        this.style.setProperty('transition','background-color 0.3s ease-in-out 0.6s, border-radius 0.2s 0.6s, color 0.3s ease-in-out 0.6s');
        $(this).next().slideToggle(600);
    } else {
        this.style.setProperty('-webkit-transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
        this.style.setProperty('transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
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
    const constructNote = 'ar3-trivial-attr_is_constructed',
        isConstructed = $('body').hasClass(constructNote);

    if (!isConstructed) {

        // 1.
        {
            const isEnglish = $('body').attr('lang') == 'en';
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
            function youtubeResize() {
                let youtube = document.querySelector("iframe[src*='youtube']"),
                    maxWidth = $(youtube).parents('section').width() * 0.8,
                    maxHeight = (9/16)*maxWidth;

                $("iframe[src*='youtube']").css({
                    'width' : maxWidth + 'px',
                    'height' : maxHeight + 'px'
                });
            }
            youtubeResize();

            window.addEventListener('resize', youtubeResize);
        }

    }

    $('body').addClass(constructNote);
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
    const constructNote = 'ar3-trivial-tag_is_constructed',
        isConstructed = $('body').hasClass(constructNote);

    if (!isConstructed) {

        // 1.
        $('table, pre').wrap('<div style="overflow:auto">');

        // 2.
        {
            let $img = $('img').not('code > img, h3 > img');
            for (let i = 0; i < $img.length; i++) {
                if ($($img[i]).parent().hasClass('relative-container-r3')) {
                    $($img[i]).parent().css('overflow', 'auto');
                } else {
                    $($img[i]).wrap('<div style="overflow:auto">')
                }
            }
        }

        // 3.
        $('main section + h3, aside > nav + .r3-accordion-B, aside > a + .r3-accordion-B').before('<hr>');
        {
            const $h4s = $('main section > h4');
            if ($h4s != null) {
                for (let i = 0; i < $h4s.length; i++) {
                    let $h4 = $($h4s[i]);
                    if ($h4.prev().length != 0) {
                        $h4.before('<hr>');
                    }
                }
            }
        }

        // 4.
        {
            const $titles = $('main > div');
            let title, id, $target;

            for (let i = 0; i < $titles.length; i++) {
                title = $($titles[i]).attr('data-title-r3');
                id = $($titles[i]).find('> h2:first-child').attr('id');
                $target = $('aside > a[href="#'+ id +'"]');
                if ($target.prev('.r3-accordion-B').length > 0) {
                    $target.prev().before('<h3>'+ title +'</h3>');
                } else {
                    $target.before('<h3>'+ title +'</h3>');
                }
            }
        }

        // 5.
        {
            const $firstLineTableinHeader = $('header table td:first-child');
            for (let i = 0; i < $firstLineTableinHeader.length; i++) {
              let text = $($firstLineTableinHeader[i]).html();
                $($firstLineTableinHeader[i]).html(text + '<b style="float:right">&nbsp;:</b>');
            }
        }

        // 6.
        {
            const $address = $('code:contains("📁")', 'main, header');
            for (let i = 0; i < $address.length; i++) {
                let addressHTML = $address[i].innerHTML;
                $address[i].innerHTML = addressHTML.replace(/📁/g, '<span class="no-copy-r3">📁</span>');
            }
        }

    }

    $('body').addClass(constructNote);
}
