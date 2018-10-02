(function() {
    'use strict';
    var i, j, k, l, m,
        $ar3 = $('.ar3'),
        $main = $ar3.children('main'),
        newElement = !$ar3.hasClass('no_more_new_element'),
        isIndo = $ar3.attr('lang') == 'id',
        $div = $main.children('div'),
        $h2 = $div.children('h2'),
        $h3 = $div.children('h3'),
        $section = $div.children('section'),
        $h4 = $section.children('h4'),
        $aside;

    //######################
    // ELEMENT Xtra method # ELEMENT
    //######################
    var ElemX = {
        topY: function(elem) {
          let y = elem.getBoundingClientRect().top + window.scrollY;
          return y;
        }
    };


    //##########
    // <aside> #
    //##########
    (function() {

        //##########
        // <aside> # DELETE ELEMENT
        //##########
        if (!newElement) {
            $ar3.children('aside').remove();
        }
        /*
        //##########
        // <aside> # RECREATE ELEMENT
        //##########
        (function() {
            var $header = $div.add($h2).add($h3).add($h4)
                .add($section.find('ul b[id]'))
                .add($section.find('p b[id]'))
                .add($section.find('table > tbody > tr > *:first-child > b[id]'));
            var headerL = $header.length,
                nav, aH3, aH4, aBId;

            $main.before('<aside>');
            $aside = $ar3.children('aside');
            var aside = document.querySelector('.ar3 > aside');
            for (i = 0; i < headerL; i++) {
                if ($header[i].tagName === 'H2') {

                    $(aside).append('<a href="#'+ $header[i].id +'">'+ $($header[i]).html() +'</a>');

                } else if($header[i].parentElement.tagName === 'MAIN') {

                    $(aside).append('<h3>'+ $($header[i]).attr('data-title') +'</h3>');

                } else if ($header[i].tagName === 'H3') {
                    aH3 = document.createElement('A');
                    if ($header[i-1].tagName === 'H2') {
                        nav = document.createElement('NAV');
                        aside.appendChild(nav);
                        nav.appendChild(aH3);
                        aH3.innerHTML = $header[i].innerHTML;
                        aH3.setAttribute('href','#'+ $header[i].id);
                    } else if ($header[i-1].tagName === 'H3') {
                        aside.lastChild.appendChild(aH3);
                        aH3.innerHTML = $header[i].innerHTML;
                        aH3.setAttribute('href','#'+ $header[i].id);

                    } else {
                        aside.lastChild.appendChild(aH3);
                        aH3.innerHTML = $header[i].innerHTML;
                        aH3.setAttribute('href','#'+ $header[i].id);
                    }
                } else if ($header[i].tagName === 'H4') {
                    aH4 = document.createElement('A');
                    if ($header[i-1].tagName === 'H3') {
                        nav = document.createElement('NAV');
                        aH3.parentNode.appendChild(nav);
                        nav.appendChild(aH4);
                        aH4.innerHTML = $header[i].innerHTML;
                        aH4.setAttribute('href','#'+ $header[i].id);
                    } else if ($header[i-1].tagName === 'B') {
                        aBId.parentElement.parentElement.appendChild(aH4);
                        aH4.innerHTML = $header[i].innerHTML;
                        aH4.setAttribute('href','#'+ $header[i].id);
                    } else {
                        aside.lastChild.lastChild.appendChild(aH4);
                        aH4.innerHTML = $header[i].innerHTML;
                        aH4.setAttribute('href','#'+ $header[i].id);
                    }

                }
                else if ($header[i].tagName === 'B') {
                    aBId = document.createElement('A');
                    if ($header[i-1].tagName === 'H3') {
                        nav = document.createElement('NAV');
                        aH3.parentElement.appendChild(nav);
                        nav.appendChild(aBId);
                        aBId.innerHTML = $header[i].innerHTML;
                        aBId.setAttribute('href','#'+ $header[i].id);
                    } else if ($header[i-1].tagName === 'H4') {
                        nav = document.createElement('NAV');
                        aH4.parentElement.appendChild(nav);
                        nav.appendChild(aBId);
                        aBId.innerHTML = $header[i].innerHTML;
                        aBId.setAttribute('href','#'+ $header[i].id);
                    } else {
                        nav.appendChild(aBId);
                        aBId.innerHTML = $header[i].innerHTML;
                        aBId.setAttribute('href','#'+ $header[i].id);
                    }
                }
            }

            //############
            // <hr> <h3> # RECREATE ELEMENT
            //############
            (function() {
                $aside.children('h3').before('<hr>');
                $aside.children('hr:first-of-type').remove();
            })();

            //################
            // dynamic aside # RECREATE ELEMENT
            //################
            (function() {

                function scrolltop() {
                    var top = 0;
                    if (typeof window.pageYOffset === "number") {
                        top = window.pageYOffset;
                    } else if (document.body && document.body.scrollTop) {
                        top = document.body.scrollTop;
                    } else if (document.documentElement && document.documentElement.scrollTop) {
                        top = document.documentElement.scrollTop;
                    }
                    return top;
                }

                $ar3.children('div.r3-aside-replacement').remove();
                $aside.before('<div class="r3-aside-replacement"> </div>');
                var $asideDummy = $('.ar3 > .r3-aside-replacement');

                function dynamicAside() {
                    var topLimit = ElemX.topY($main[0]),
                        bottomLimit = topLimit + $main[0].scrollHeight - window.innerHeight;

                    if (scrolltop() < topLimit) {

                        $aside.addClass('r3-dynamic-before')
                              .removeClass('r3-dynamic-on')
                              .removeClass('r3-dynamic-after');
                                    $asideDummy.addClass('hide-r3');

                    } else if (scrolltop() < bottomLimit) {
                        $aside.removeClass('r3-dynamic-before')
                              .addClass('r3-dynamic-on')
                              .removeClass('r3-dynamic-after');
                                    $asideDummy.removeClass('hide-r3');

                    } else {
                        $aside.removeClass('r3-dynamic-before')
                              .removeClass('r3-dynamic-on')
                              .addClass('r3-dynamic-after');
                                    $asideDummy.removeClass('hide-r3');
                    }
                }
                dynamicAside();

                document.addEventListener('click', dynamicAside);
                document.addEventListener('resize', dynamicAside);
                document.addEventListener('scroll', dynamicAside);

                // set dynamic header for ar3header
                (function() {
                    function dynamicHeader() {
                        var $nav = $('#r3-nav'),
                            topLimit = ElemX.topY($main[0]) - $nav.innerHeight() - 15;
                        if (scrolltop() < topLimit) {
                            $nav.css({'position': 'fixed', 'top' : 0});
                        } else if (scrolltop() > topLimit){
                            $nav.css({'position': 'absolute', 'top': topLimit + 'px'});
                        }
                    }
                  dynamicHeader();

                  document.addEventListener('click', dynamicHeader);
                  document.addEventListener('resize', dynamicHeader);
                  document.addEventListener('scroll', dynamicHeader);
                })();
            })();
        })();
        */

        {
            const $navTarget = $('.aside-nav-target-r3');
            if ($navTarget.length !== 0) {
                const constructNote = 'ar3-aside-nav_done',
                    isConstructed = $('body').hasClass(constructNote);

                // update 2 start
                let headers;
                {
                    let newHeader = $('body').attr('data-headers-r3');
                    const isValid = newHeader !== undefined;
                    newHeader = (isValid) ? newHeader.split('|') : newHeader;
                    headers = (isValid) ? newHeader : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                }
                // update 2 end

                // create necessary wrap for dynamic aside
                if (!isConstructed) {
                    $navTarget.wrap("<div class='relative-container-r3'>");
                    $navTarget.after('<div style="clear:left">');
                } else {
                    $navTarget.parent().children('.r3-aside-nav').remove();
                }

                // construct navigation
                for (let i = 0; i < $navTarget.length; i++) {

                    // insert aside
                    $($navTarget[i]).before('<aside id="r3-aside-nav-' + (i + 1) + '" class="r3-aside-nav">');

                    // create id and class for h1-h6
                    {
                        let j = 0;
                        while (headers[j] !== undefined) {
                            let $h = $($navTarget[i]).find(headers[j]);
                                for (let k = 0; k < $h.length; k++) {
                                    $($h[k]).addClass('r3-h' + (j + 1));
                                    if ($($h[k]).attr('id') === undefined) {
                                        $($h[k]).attr('id', 'h' + (j + 1) + '-' + (k + 1) + '_of_content_'+ (i + 1));
                                    }
                                }
                            j++;
                        }
                    }

                    {
                        const $allH = $($navTarget[i]).find(headers.toString()),
                              $h1st = $($allH[0]);
                        let $targetLinkParent = $('#r3-aside-nav-' + (i + 1));
                        const $linkParent0 = $targetLinkParent;
                        $targetLinkParent.append('<a href="#'+ $h1st.attr('id') + '">' + $h1st.html() + '</a>');

                        function createLink($header) {
                            return $targetLinkParent.append('<a href="#'+ $header.attr('id') + '">' + $header.html() + '</a>');
                        }
                        let $hPrev = $h1st,
                            hPrevClass = $hPrev.attr('class'),
                            hPrevHierarchy = parseInt(hPrevClass.slice(4));
                        for (let j = 1; j < $allH.length; j++) {
                            let $h = $($allH[j]),
                                hClass = $h.attr('class'),
                                hHierarchy = parseInt(hClass.slice(4));

                            let hierarchyDiff = hPrevHierarchy - hHierarchy;
                            if (hierarchyDiff  == 0) {
                                createLink($h);
                            } else if (hierarchyDiff  == -1) {
                                $targetLinkParent.append('<nav class="r3-hierarchy-' + hPrevHierarchy + '"></nav>');
                                $targetLinkParent = $targetLinkParent.find('nav:last-child');
                                createLink($h);
                            } else if (hierarchyDiff > 0) {
                                if (hHierarchy == 1) {
                                    $targetLinkParent = $linkParent0;
                                    createLink($h);
                                } else {
                                    $targetLinkParent = $linkParent0.find('.r3-hierarchy-' + (hHierarchy - 1) + ':last-child');
                                    createLink($h);
                                }
                            }
                            $hPrev = $h;
                            hPrevHierarchy = hHierarchy;
                        }
                    }
                }

                $('body').addClass(constructNote);
            }
        }


        //##############################
        // <aside> <span>.r3-accordion #
        //##############################
        (function() {

            //######################
            // <span>.r3-accordion # CREATE ELEMENT
            //######################
            if ($('aside a + nav').length > 0) {
                $('aside a + nav').next()////////////////// change the aside later
                    .css('display', 'none').prev().prev()
                    .before('<span class="r3-accordion"></span>')
                    .prepend('&nbsp;');

                $('.r3-accordion').click(function() {
                    $(this).toggleClass("r3-active").next().next().slideToggle('slow');
                });
            }
            /*
            (function() {
                var $nav = $aside.find('nav'),
                    span = document.createElement('SPAN');
                $(span).addClass('r3-accordion');
                $nav.prev('a').prepend('&nbsp;').before(span);
                $nav.css('display', 'none');

                $('.r3-accordion').click(function() {
                    $(this).toggleClass("r3-active").next().next().slideToggle('slow');
                });
            })();
            */
            $aside = $('aside');
            //###################################
            // open the 1st hierarchy accordion # 1 TIME EVENT
            //###################################
            (function() {
                $aside.children('span.r3-accordion')
                    .addClass('r3-active')
                    .next().next('nav').css('display','block');
            })();

        })();

        //############
        // <nav> <a> # ATTACH EVENT
        //############
        (function() {
            $aside.find('nav a').click(function() {
                var a = this;
                while (a.parentElement.parentElement.tagName !== 'ASIDE') {
                    a = a.parentElement.previousElementSibling;
                }
                var id = a.getAttribute('href');
                var section = document.querySelector(id);
                if (section.classList.contains === 'r3-active') {
                    section.style.setProperty('-webkit-transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
                    section.style.setProperty('transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
                } else {
                    section.style.setProperty('-webkit-transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 1s ease-in-out');
                    section.style.setProperty('transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 1s ease-in-out');
                }
                section.classList.remove('r3-active');
                if (this.parentElement.parentElement.tagName !== 'ASIDE') {
                    $(section).next().slideDown(600);
                } else {
                    $(section).next().delay(300).slideDown(600);
                }
            });
        })();

    })();


    //######################
    // No more new element #
    //######################
    $ar3.addClass('no_more_new_element');

})();

if (false) {
    var jsonText;
}
