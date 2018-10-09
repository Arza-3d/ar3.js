(function() {
    'use strict';
    var linkToCurrentRepo = 'r3-link-to-current-repo';
    $('body').prepend(
        '<nav id="r3-nav">\n'+
            '<div>\n'+
                '<a id="r3-web-logo" href="https://github.com/Arza-3d">'+
                    '<img src="https://image.ibb.co/i5Hp0a/LogoWeb.png" alt="">\n'+
                '</a>'+
            '</div>\n'+
            '<div class="separator-r3"></div>\n'+
            '<a id="'+ linkToCurrentRepo +'">repo</a>'+
            '<div class="separator-r3"></div>\n'+
        '</nav>\n'+
        '<div style="clear:left"></div><br><br>'
    );

    (function() {
        var webAddress =  $('body').attr('data-repo-r3');
        $('#' + linkToCurrentRepo).attr('href', webAddress);
    })();

})();
// making header
