/*######################
// ar3-trivial-tag.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/trivial/ar3-trivial-tag.js"></script>
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
                if ($img[i].parent().hasClass('relative-container-r3')) {
                    $img[i].parent().css('overflow', 'auto');
                } else {
                    $img[i].wrap('<div style="overflow:auto">')
                }
            }
        }


    }

    $('body').addClass(constructNote);
}
