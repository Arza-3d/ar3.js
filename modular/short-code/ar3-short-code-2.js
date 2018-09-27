/*#######################
// ar3-short-code-2.js  #
#######################*/
/* https://arza-3d.github.io/ar3js/

<script src="https://rawgit.com/Arza-3d/ar3js/master/modular/short-code/ar3-short-code-2.js"></script>
----------------------------------------------------------------------------------------------------*/
{
    const constructNote = 'r3-short-code_done',
        isConstructed = $('body').hasClass(constructNote);

    {
        // 2nd update start
        const isIndo = $('body').attr('lang') == 'id';
        let text1 = isIndo ? 'tunjukkan semua kode' : 'show all code',
            text2 = isIndo ? 'persingkat kode' : 'short code';
        // 2nd update end

        if (!isConstructed) {
            $('pre + pre').css('display', 'none')
                .before('<button class="r3-short-code r3-active">'+ text1 + '</button>');
        } else {
            $('.r3-short-code').addClass('r3-active')
                .prev().css('display', 'block')
                .next().next().css('display', 'none');
        }

        $('.r3-short-code').click(function() {
            if ($(this).hasClass('r3-active')) {
                this.innerHTML= text2;
                $(this).prev().delay(300).toggle(600);
                $(this).next().toggle(300);
            } else {
                this.innerHTML= text1;
                $(this).prev().toggle(300);
                $(this).next().delay(300).toggle(600);
            }
            $(this).toggleClass('r3-active');
        });
    }

    $('body').addClass(constructNote);
}
