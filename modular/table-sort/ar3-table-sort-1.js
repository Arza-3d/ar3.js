/*#######################
// ar3-table-sort-1.js  #
#######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/table-sort/ar3-table-sort-1.js"></script>
--------------------------*/

(function() {
    var tables, rows, switching, h, i1, x0, y0, x, y, shouldSwitch;
    tables = document.getElementsByClassName("sort-r3");
    switching = true;
    for (h = 0; h < tables.length; h++) {

        while (switching) {
            switching = false;
            rows = tables[h].querySelectorAll("tbody tr");
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x0 = rows[i].getElementsByTagName("TD")[0].innerHTML.toLowerCase();
                if (/<!--/.test(x0)) {
                    i1 = x0.indexOf(' -->');
                    x = x0.slice(5, i1);
                } else {
                    x = x0;
                }

                y0 = rows[i + 1].getElementsByTagName("TD")[0].innerHTML.toLowerCase();
                if (/<!--/.test(y0)) {
                    i1 = y0.indexOf(' -->');
                    y = y0.slice(5, i1);
                } else {
                    y = y0;
                }

                if (x > y) {
                    shouldSwitch= true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        switching = true;
    }
})();
