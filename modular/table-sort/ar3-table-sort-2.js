/*#######################
// ar3-table-sort-1.js  #
#######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/table-sort/ar3-table-sort-1.js"></script>
--------------------------*/
// basic sort function that will sort table with class sort-r3
(function() {
    let tables, rows, switching, h, i1, x0, y0, x, y, shouldSwitch;
    tables = document.getElementsByClassName("sort-r3");
    switching = true;

    function getComment(text) {
      let i_end;
      if (/<!--/.test(text)) {
          i_end = text.indexOf(' -->');
          return text.slice(5, i_end);
      } else {
          return text;
      }
    }

    function switchTablesRow() {

      for (h = 0; h < tables.length; h++) {


          function switchTableRow() {
            while (switching) {
                switching = false;
                rows = tables[h].querySelectorAll("tbody > tr");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x0 = rows[i].getElementsByTagName("TD")[0].innerHTML.toLowerCase();
                    x = getComment(x0);

                    y0 = rows[i + 1].getElementsByTagName("TD")[0].innerHTML.toLowerCase();
                    y = getComment(y0);

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
          switchTableRow();

          // fix the first row
          let row1test, row2test;
          row1test = tables[h].querySelector("tbody > tr:nth-child(1) > td:nth-child(1)").innerHTML.toLowerCase();
          row2test = tables[h].querySelector("tbody > tr:nth-child(2) > td:nth-child(1)").innerHTML.toLowerCase();
          if (getComment(row1test) > getComment(row2test)) {
            x = tables[h].querySelector("tbody > tr:nth-child(1)").innerHTML;
            y = tables[h].querySelector("tbody > tr:nth-child(2)").innerHTML;
            tables[h].querySelector("tbody > tr:nth-child(1)").innerHTML = y;
            tables[h].querySelector("tbody > tr:nth-child(2)").innerHTML = x;
            switchTableRow();
          }


      }
    }

    switchTablesRow();

})();
