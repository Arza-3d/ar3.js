/*######################
// ar3-aside-nav-3.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://rawgit.com/Arza-3d/ar3.js/master/modular/tab/ar3-aside-nav-3.js"></script>
--------------------------*/

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
