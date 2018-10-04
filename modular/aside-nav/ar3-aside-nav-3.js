/*######################
// ar3-aside-nav-3.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-3.js"></script>
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

        function dynamicAside() {
            let topLimit = topCoord($main[0]);
            let bottomLimit = topLimit + $main[0].scrollHeight - window.innerHeight;
            console.log(leftCoord($main[0]));
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
        document.addEventListener('resize', dynamicAside);
        document.addEventListener('scroll', dynamicAside);

        /*
        // set dynamic header for ar3header
        {
            function dynamicHeader() {
                let $nav = $('#r3-nav'),
                    topLimit = topCoord($main[0]) - $nav.innerHeight() - 15;
                if (scrollTopCoord() < topLimit) {
                    $nav.css({'position': 'fixed', 'top' : 0});
                } else if (scrollTopCoord() > topLimit){
                    $nav.css({'position': 'absolute', 'top': topLimit + 'px'});
                }
            }
          dynamicHeader();

          document.addEventListener('click', dynamicHeader);
          document.addEventListener('resize', dynamicHeader);
          document.addEventListener('scroll', dynamicHeader);
        }
        */
    }


}
