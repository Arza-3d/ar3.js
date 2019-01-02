/*####################################
// ar3-JSON-table-5-must-include.js  #
####################################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/table-JSON/ar3-JSON-table-5-must-include.js"></script>
--------------------------*/

{
    const constructNote = "ar3-JSON-table-3_is_constructed";
    const isConstructed = $('body').hasClass(constructNote);
    {
        const $tableJSON = $('table[data-JSON-r3]');
        if (!isConstructed && $tableJSON .length > 0) {

            // get JSON
            $('head').append('<script>var jsonText = _JSON_string_r3;</script>');
            let objectInJSON = jsonText;//THIS is the fix

            for (let i = 0; i < $tableJSON.length; i++) {
                // add <tbody> if necessary
                if ($($tableJSON[i]).children('tbody').length === 0) {
                    $($tableJSON[i]).append('<tbody>');
                }

                let $th = $($tableJSON[i]).find('thead > tr:last-child > th'),
                    $tbody = $($tableJSON[i]).children('tbody'),
                    arrayInJSON = $($tableJSON[i]).attr('data-JSON-r3');

                //# MUST INCLUDE PART 1
                let mustIncludeKey =  $($tableJSON[i]).attr('data-JSON-must-include-key-r3'),
                    mustIncludeVal =  $($tableJSON[i]).attr('data-JSON-must-include-val-r3');
                //#

                if (objectInJSON[arrayInJSON] !== undefined) {
                    // table row loop
                    let arrayInJSONlength = objectInJSON[arrayInJSON].length;
                    for (let j = 0; j < arrayInJSONlength; j++) {

                      //# MUST INCLUDE PART 2
                      if (mustIncludeKey != undefined) {
                        if (objectInJSON[arrayInJSON][j][mustIncludeKey] != mustIncludeVal) {
                            continue;
                        }
                      }
                      //#


                        // table column loop
                        let rowContent = '';
                        for (let k = 0; k < $th.length; k++) {
                            let keyInJSON = $($th[k]).attr('data-JSON-r3'),
                              valueInJSON;

                            // Display as progress bar
                            if (keyInJSON == '_progress') {
                              valueInJSON = '<!-- ' + objectInJSON[arrayInJSON][j][keyInJSON] + ' --><progress value="'+ objectInJSON[arrayInJSON][j][keyInJSON] +'" max="100" title="'+  objectInJSON[arrayInJSON][j][keyInJSON]
                              +'%"></progress>';
                            }
                            //

                            //############ wrap <kbd>
                            else if (keyInJSON == '_shortcut') {

                              let tempWords = objectInJSON[arrayInJSON][j][keyInJSON].split(' ');

                              let _tempWords = '';
                              for (word in tempWords) {
                                if (tempWords[word] == '+') {
                                  _tempWords += '+ ';
                                  continue;
                                } else if (tempWords[word].indexOf('_') == 0) {
                                  switch (tempWords[word]) {
                                    case '_plus':
                                      _tempWords += '<kbd>+</kbd> ';
                                      break;
                                    case '_or':
                                      _tempWords += '<br>or<br>';
                                      break;
                                    case '_space':
                                      _tempWords += '<kbd style="color:transparent" title="spacebar">Spacebar</kbd> ';
                                      break;
                                    case '_lclick':
                                      _tempWords += '<img src="https://i.ibb.co/7JgYJPf/l-click25.png" alt="l-click25" style="border:none" title="mouse left click"><span style="display: none">mouse left click</span> ';
                                      break;
                                    case '_rclick':
                                      _tempWords += '<img src="https://i.ibb.co/b1yFPwh/r-click25.png" alt="r-click25" style="border:none" title="mouse right click"><span style="display: none">mouse right click</span> ';
                                      break;
                                    case '_mclick':
                                      _tempWords += '<img src="https://i.ibb.co/12sxdYM/m-click25.png" alt="m-click25" style="border:none"  title="mouse middle click"><span style="display: none">mouse middle click</span> ';
                                      break;
                                    default:
                                      _tempWords += tempWords[word].substr(1) + ' ';
                                      break;
                                  }
                                  continue;
                                }
                                tempWords[word] = tempWords[word].charAt(0).toUpperCase() + tempWords[word].substr(1);
                                _tempWords += '<kbd>' + tempWords[word] + '</kbd> ';
                              }
                              tempWords = _tempWords;

                              valueInJSON = _tempWords;


                            }
                            //############

                            else if (keyInJSON != '_title+_link') {
                              valueInJSON = objectInJSON[arrayInJSON][j][keyInJSON];
                            } else {
                              valueInJSON = '<a href="' + objectInJSON[arrayInJSON][j]['_link'] + '" target="_blank">' + objectInJSON[arrayInJSON][j]['_title'] + '</a>';
                            }

                            rowContent += '\t<td>' + valueInJSON + '</td>\n';
                        }
                        $tbody.append('<tr>'+ rowContent +'</tr>');
                    }
                }
            }
        }
    }
    $('body').addClass(constructNote);
}
