/*##################
// ar3-trivial-attr.js  #
##################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3js/master/modular/trivial/ar3-trivial-attr.js"></script>
--------------------------*/

{
    const constructNote = 'ar3-trivial_is_constructed',
        isConstructed = $('body').hasClass(constructNote);

    if (!isConstructed) {
        // 1. make sure the page is scaled for mobile device
        $('header').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

        // 2. if the page is not English, by default every <i> is english
        const isEnglish = $('body').attr('lang') == 'en';
        if (!isEnglish) {
            $('i').attr('lang', 'en');
        }

        // 3. don't translate <code> and <pre>...
        $('code, pre').attr('translate', 'no');

        // 4. ...but translate .comment-r3
        $('.comment-r3').attr('translate', 'yes');

        // 5. make sure every video have control
        $('video').attr('controls');

        // 6. make sure every outside link open new table
        $("a[href^='http']").attr('target', '_blank');

    }

    $('body').addClass(constructNote);
}
