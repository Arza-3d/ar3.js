// ar3-short-code.js
// required jQuery
// create <button>
(function() {
    'use strict';
    var constructNote = 'r3-short-code_done',
        newElement = !$('body').hasClass(constructNote);

    var isIndo = $('body').attr('lang') == 'id';
    var text1 = isIndo ? 'tunjukkan semua kode' : 'show all code',
        text2 = isIndo ? 'persingkat kode' : 'short code';

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
