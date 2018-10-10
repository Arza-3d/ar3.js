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
        $('table').wrap('<div style="overflow:auto">');

        // 2.
        {
            const $img = $('img');
            for (let i = 0; i < $img.length; i++) {
                if ($($img[i]).parent().hasClass('relative-container-r3')) {
                    $($img[i]).parent().css('overflow', 'auto');
                } else {
                    $($img[i]).wrap('<div style="overflow:auto">')
                }
            }
        }

        // 3. add hr between section
        $('main section + h3, aside > nav + .r3-accordion-B').before('<hr>');

        // 4. add contextual title based on the main > div[data-title-r3]
        {
            const $titles = $('main > div');
            let title, id;

            for (let i = 0; i < $titles.length; i++) {
                title = $($titles[i]).attr('data-title-r3');

                id = $($titles[i]).find('> h2:first-child').attr('id');
                $('aside > a[href="#'+ id +'"]').prev('.r3-accordion-B')
                    .before('<h3>'+ title +'</h3>');
            }
        }
    }

    $('body').addClass(constructNote);
}
