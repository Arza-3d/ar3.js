// ar3-short-code.js
// required jQuery
// create <button>
(function() {
    'use strict';
    var constructNote = 'r3-short-code_done',
        newElement = !$('body').hasClass(constructNote);

    var isIndo = $('body').attr('lang') == 'id',
        text1 = isIndo ? 'tunjukkan semua kode' : 'show all code',
        text2 = isIndo ? 'persingkat kode' : 'short code';

    // overriding default text
    var newText1 = $('body').attr('data-short-code-r3-text1'),
        newText2 = $('body').attr('data-short-code-r3-text2');
    if (newText1 !== undefined) {text1 = newText1;}
    if (newText2 !== undefined) {text2 = newText2;}

    if (newElement) {
        $('pre + pre').css('display', 'none')
            .before('<button class="r3-short-code r3-active">'+ text1 + '</button>');
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

    $('body').addClass(constructNote);
})();
