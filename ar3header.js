(function() {
    'use strict';
    var linkToCurrentRepo = 'r3-linkToCurrentRepo';
    $('body').prepend(
        '<nav id="r3-nav" style="z-index:10;position:fixed;top:0px;left:0px;background-color:rgb(23,26,28);width:100%;height:45px;">\n'+
            '<div style="width:158px;height:100%;background-color:rgba(0,0,0,0);float:left;">\n'+
                '<img src="https://image.ibb.co/i5Hp0a/LogoWeb.png" alt="">\n'+
            '</div>\n'+
            '<div style="float:left;width:2px;height:100%;background-color:rgba(0,0,0,0.4)">'+
            '<nav>'+
                '<a id="'+ linkToCurrentRepo +'">repo</a>'+
                '</nav>'+
            '</div>\n'+
            '<div style="float:right;width:2px;height:100%;background-color:rgba(0,0,0,0.4);"></div>\n'+
        '</nav>\n'+
        '<div style="clear:left"></div><br><br>'
    );

    $('#' + linkToCurrentRepo)
})();
// making header
