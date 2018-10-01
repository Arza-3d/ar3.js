/*######################
// ar3-aside-nav-4.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-4.js"></script>
--------------------------*/

{
    $('.r3-aside-nav').after('<button class="r3-nav-button" style="position:fixed">nav</button>');
    $('.r3-nav-button').click(function() {
        $(this).prev('.r3-aside-nav').toggleClass('r3-active');

    });
}
