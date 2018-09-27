/*################
// ar3-tab-2.js  #
################*/
/* https://arza-3d.github.io/ar3js/

<script src="https://rawgit.com/Arza-3d/ar3js/master/modular/tab/ar3-tab-2.js"></script>
--------------------------------------------------------------------------------------*/
{
    const constructNote = 'r3-tab_done',
        isConstructed = $('body').hasClass(constructNote);

    const $contents = $('.tab-r3 > div:nth-child(2) > div'),
          $links = $('.tab-r3 > nav > a');
    if (!isConstructed) {
        for (let i = 0; i < $contents.length; i++) {
            if ($($contents[i]).attr('id') == undefined) {
                $($contents[i]).attr('id', 'r3_tab_content_'+ i);
            }
        }

        let id;
        for (let i = 0; i < $contents.length; i++) {
            id = $($contents[i]).attr('id');
            $links[i].setAttribute('data-tab-r3', id);
        }

        const $1stLink = $('.tab-r3 > nav > a:first-child');
        $1stLink.addClass('r3-active');
    }

    $links.click(function() {
        if (!$(this).hasClass('r3-active')) {
            let id = $(this).attr('data-tab-r3');
            $(this).siblings().removeClass('r3-active');
            $(this).addClass('r3-active');
            $('#'+id).siblings().fadeOut(400);
            $('#'+id).delay(401).fadeIn();
        }
    });

    const $insideLinks = $('.tab-r3 > div:nth-child(2) div.relative-container-r3 > a');
    $insideLinks.click(function() {
        let n = $(this).attr('data-tab-a');
        $(this).parents('.tab-r3')
            .children('nav:first-child')
            .children('a:nth-of-type('+ n +')').click();
    });

    $('body').addClass(constructNote);
}
