/*######################
// ar3-aside-nav-4.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-4.js"></script>
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
        // create dummy aside
        {
            $aside.before('<div class="r3-aside-replacement">');
        }
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
                'top' : topCoord($anchor[0]) + $anchor[0].getBoundingClientRect().height * 0.04,
                'left' : leftCoord($anchor[0]) + $anchor[0].getBoundingClientRect().width
            });
        }

        function setButtonLocation() {
            setLocation('.r3-aside-nav-button', $aside);
            console.log(1);
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
        document.addEventListener('scroll', dynamicAside);

        function changeButtonContent(elem) {
            if ($(elem).hasClass('r3-active')) {
                $(elem).html('&#9664;');
            } else {
                $(elem).html('&#9658;');
            }
        }

        let buttonMove,
            buttonStop;
        const marginLeftTransition = 500;
        const mainDefaultWidth = '79%'; // make sure it is the same with the _r3-aside-nav-1.scss
        console.log(mainDefaultWidth);
        function stopUpdateButton() {
            clearInterval(buttonMove);
        }
        $button.click(function() {
            if (buttonStop !== undefined) {clearTimeout(buttonStop)}
            $button.toggleClass('r3-active');
            changeButtonContent('.r3-aside-nav-button');
            if ($('.r3-aside-nav-button').hasClass('r3-active')) {
                $aside.add($dummy).css('margin-left', '0');
                $main.css('width', mainDefaultWidth);
            } else {
                $aside.add($dummy).css('margin-left', (-1 * $aside[0].getBoundingClientRect().width) + 'px');
                $main.css('width', '95%');
                //$dummy.css('margin-left', '-100px');
            }
            buttonMove = setInterval(setButtonLocation, 1);
            buttonStop = setTimeout(stopUpdateButton, marginLeftTransition);
        });

    }

}
