(function() {
    'use strict';

    var constructNote = 'ar3-header_is_constructed',
        isConstructed = $('body').hasClass(constructNote);

    if (!isConstructed) {
        // add font
        $('head').append('<link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet"> ');

        var linkToCurrentRepo = 'r3-link-to-current-repo';

        $('body').prepend(
            '<nav id="r3-nav">\n'+
                '<div>\n'+
                    '<a id="r3-web-logo" href="https://github.com/Arza-3d">'+
                        '<img src="https://image.ibb.co/dAuxML/Logo-Web-0.png" alt="">\n'+
                    '</a>'+
                '</div>\n'+
                '<div class="separator-r3"></div>\n'+
                '<a id="'+ linkToCurrentRepo +'" style="font-size:12px">'+
                    '🖿 repo'+
                '</a>'+
                '<div class="separator-r3"></div>\n'+
            '</nav>\n'+
            '<div style="clear:left"></div><br><br>'
        );

        (function() {
            var webAddress =  $('body').attr('data-repo-r3');
            $('#' + linkToCurrentRepo).attr('href', webAddress);
        })();
    }

    $('body').addClass(constructNote);

})();
// making header
