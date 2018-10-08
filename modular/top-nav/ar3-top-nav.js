/*##################
// ar3-top-nav.js  #
##################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/top-nav/ar3-top-nav.js"></script>
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
