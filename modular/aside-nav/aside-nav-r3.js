(function() {
    'use strict';
    var $navTarget = $('.aside-nav-target-r3');
    var $headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    for (var i = 0; i < $navTarget; i++) {
        $navTarget.wrap('<div class="relative-container-r3">');
    }

})();
