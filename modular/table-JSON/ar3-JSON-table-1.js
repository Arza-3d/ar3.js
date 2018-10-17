/*#######################
// ar3-JSON-table-1.js  #
#######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/table-JSON/ar3-JSON-table-1.js"></script>
--------------------------*/

{
    const constructNote = "ar3-JSON-table_done";
    const isConstructed = $('body').hasClass(constructNote);
    {
        const $tableJSON = $('table[data-JSON-r3]');
        if (!isConstructed && $tableJSON .length > 0) {

            // get JSON
            $('head').append('<script>var jsonText = _jsonText;</script>');
            var jsonObject = JSON.parse(jsonText);

            for (let i = 0; i < $tableJSON.length; i++) {
                // add <tbody> if necessary
                if ($($tableJSON[i]).children('tbody').length === 0) {
                    $($tableJSON[i]).append('<tbody>');
                }

                let $th = $($tableJSON[i]).find('thead > tr:last-child > th'),
                    $tbody = $($tableJSON[i]).children('tbody'),
                    arrayInJSON = $($tableJSON[i]).attr('data-JSON-r3');
            }

        }
    }
    $('body').addClass(constructNote);
}
