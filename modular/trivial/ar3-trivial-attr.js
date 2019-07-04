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
        let $youtube = $("iframe[src*='youtube']");
        if ($youtube.length > 0) {
            // 6.a

            {
                let youtube = document.querySelector("iframe[src*='youtube']");
                function youtubeResize() {
                    let maxWidth = $(youtube).parents('section').width() * 0.8,
                        maxHeight = (9/16)*maxWidth;

                    $("iframe[src*='youtube']").css({
                        'width' : maxWidth + 'px',
                        'height' : maxHeight + 'px'
                    });
                }
                youtubeResize();

                window.addEventListener('resize', youtubeResize);
            }

            // 6.b
            {
                let youtubeLink;
                for (let i = 0; i < $youtube.length; i++) {
                    youtubeLink = $($youtube[i]).attr('src');

                    if (youtubeLink.includes("?")) {
                        $($youtube[i]).attr('src', youtubeLink + '&rel=0');
                    } else {
                        $($youtube[i]).attr('src', youtubeLink + '?rel=0');
                    }
                    youtubeLink = $($youtube[i]).attr('src');
                    //console.log($youtube[i].outerHTML);
                    // 6.c

                    if (youtubeLink.includes("start")) {
                        $($youtube[i]).attr('src', youtubeLink + '&controls=0');
                        $($youtube[i]).css('border-radius', '12px');
                    } else {

                        let youtubeTag = $youtube[i].outerHTML;
                        let endCharIndex = youtubeTag.indexOf('></iframe>');
                        $youtube[i].outerHTML = youtubeTag.slice(0,endCharIndex) + ' allowFullScreen></iframe>';

                    }

                }
            }
        }


    }

    $('body').addClass(constructNote);
}
