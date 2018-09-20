//ar3-short-code.js
// create <button>
if (!$('body').hasClass('r3-short-code_done')) {
    $('pre + pre').css('display', 'none')
        .before('<button class="r3-short-code">'+
        'show all code</button>');
}
$('body').addClass('r3-short-code_done');

// attach event
$('.r3-short-code').click(function() {
    if ($(this).hasClass('r3-active')) {
        this.innerHTML= 'show all code';
        $(this).prev().delay(300).toggle(600);
        $(this).next().toggle(300);
    } else {
        this.innerHTML= 'short code';
        $(this).prev().toggle(300);
        $(this).next().delay(300).toggle(600);
    }
    $(this).toggleClass('r3-active');
});
