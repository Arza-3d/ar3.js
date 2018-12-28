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
            let $img = $('img').not('code > img, h3 > img, img[src$=".svg"],  img[src$=".png"]');
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
