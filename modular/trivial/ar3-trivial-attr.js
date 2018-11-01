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
