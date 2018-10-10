/*##################
// ar3-trivial-attr.js  #
##################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/trivial/ar3-trivial-attr.js"></script>
--------------------------*/

{
    const constructNote = 'ar3-trivial-attr_is_constructed',
        isConstructed = $('body').hasClass(constructNote);

    if (!isConstructed) {

        // 1.
        $('header').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

        // 2.
        const isEnglish = $('body').attr('lang') == 'en';
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

    $('body').addClass(constructNote);
}
