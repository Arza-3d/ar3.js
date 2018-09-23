{
    const constructNote = 'r3-short-code_done',
        isConstructed = $('body').hasClass(constructNote);

    const isIndo = $('body').attr('lang') == 'id';
    let text1 = isIndo ? 'tunjukkan semua kode' : 'show all code',
        text2 = isIndo ? 'persingkat kode' : 'short code';

    let newText1 = $('body').attr('data-short-code-r3-text1'),
        newText2 = $('body').attr('data-short-code-r3-text2');
    if (newText1 !== undefined) {text1 = newText1;}
    if (newText2 !== undefined) {text2 = newText2;}

    const $pre = $('pre + pre');
    if (!isConstructed) {$pre.css('display', 'none');}

    for (let i = 0; i < $pre.length; i++) {
        {
            let newerText1 = $($pre[i]).attr('data-r3-text1'),
                newerText2 = $($pre[i]).attr('data-r3-text2'),
                newestText1 = (newerText1 === undefined) ? newText1 : newerText1,
                newestText2 = (newerText2 === undefined) ? newText2 : newerText2;

            if (!isConstructed) {
                $($pre[i]).before('<button class="r3-short-code r3-active">'+
                    newestText1 + '</button>');
            }

            $($pre[i]).prev().click(function() {
                if ($(this).hasClass('r3-active')) {
                    this.innerHTML= newestText2;
                    $(this).prev().delay(300).toggle(600);
                    $(this).next().toggle(300);
                } else {
                    this.innerHTML= newestText1;
                    $(this).prev().toggle(300);
                    $(this).next().delay(300).toggle(600);
                }
                $(this).toggleClass('r3-active');
            });
        }
    }

    $('body').addClass(constructNote);
}
