/*#######################
// ar3-JSON-table-full-1.js  #
#######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/table-JS/ar3-JSON-table-full-1.js"></script>
--------------------------*/

{
    const constructNote = "ar3-JSON-table-full-1_done";
    const isConstructed = $('body').hasClass(constructNote);
    {
        const $tableJSON = $('table[data-JSON-full-r3]');
        if (!isConstructed && $tableJSON .length > 0) {

            // get JSON
            $('head').append('<script>var jsonText = _jsonText;</script>');
            let objectInJSON = JSON.parse(jsonText);

            for (let i = 0; i < $tableJSON.length; i++) {
                // add <tbody> if necessary
                if ($($tableJSON[i]).children('tbody').length === 0) {
                    $($tableJSON[i]).append('<tbody>');
                }

                let arrayInJSON = $($tableJSON[i]).attr('data-JSON-full-r3');
                if (objectInJSON[arrayInJSON] !== undefined) {

                    // set header
                    {
                        let myObject = objectInJSON[arrayInJSON][0];//[j];
                        let thText = '<thead>\n\t<tr>\n';
                        for (x in myObject) {
                            thText += '\t\t<th>' + x + '</th>\n'
                        }
                        thText += '\t</tr>\n</thead>'
                        $($tableJSON[i]).append(thText);
                    }

                    // table row loop
                    let arrayInJSONlength = objectInJSON[arrayInJSON].length,
                        thText = '<tbody>\n';
                    for (let j = 0; j < arrayInJSONlength; j++) {
                        let myObject = objectInJSON[arrayInJSON][j];
                        thText += '\t<tr>\n';
                        for (x in myObject) {
                            thText += '\t\t<td>' + myObject[x] + '</td>\n'
                        }
                        thText += '\t</tr>\n';

                    }
                    thText += '</tbody>';
                    console.log(thText);
                    $($tableJSON[i]).append(thText);
                }
            }
        }
    }
    $('body').addClass(constructNote);
}
