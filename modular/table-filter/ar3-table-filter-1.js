/*#######################
// ar3-table-filter-1.js  #
#######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/table-filter/ar3-table-filter-1.js"></script>
--------------------------*/

(function() {
  const constructNote = 'r3-table-filter_done',
    isConstructed = $('body').hasClass(constructNote);
  {
    $('head').append(
      '<style>\n' +
      ' .hide-r3 {\n ' +
      '   display: none;\n' +
      ' }\n' +
      '</style>'
    );
    //##############################
    // create variables for filter # VARIABLES
    //##############################
        // create data keyainer that will
        // be used later in event function
    var StrX = {

        isAlphaNumeric: function(text) {
            return !/\W/.test(text) ||
                   !/\D/.test(text);
        },

        isAlpha: function(text) {//'_' (underscore) is considered alpha
            return !/\W/.test(text) &&
                   !/\d/.test(text);
        },

        isJustAlpha: function(text) {
            return !/\W/.test(text) &&
                   !/\d/.test(text) &&
                   !/_/.test(text);
        },

        lowCase1stChar: function(text) {
            return text[0].toLowerCase() +
                   text.substring(1, text.length);
        },

        isCommented: function(text) {
            var i0 = text.indexOf('<!--'),
                i1 = text.indexOf('-->', i0 + 4);
            return i0 > -1 && i0 < i1;
        },

        getFirstComment: function(text) {
            var i0 = text.indexOf('<!--') + 4,
                i1 = text.indexOf('-->', i0 + 4);
            return text.slice(i0, i1);
        },

        trimXtraSpace: function(text) {
            text = text.replace(/ +/gm, ' ');
            return text.trim();
        },

        trimFirstComment: function(text) {
            if (/<!--/.test(text)) {
                var i0 = text.indexOf('<!--');
                var i1 = text.lastIndexOf('-->') + 3;

                return text.substring(0, i0) + text.substring(i1, text.length);
            }
                return text;
        },

        trimHTMLTag: function(text) {
            while (/</.test(text) && />/.test(text)) {
                var textLength = text.length,
                    i0 = text.indexOf('<'),
                    i1 = text.indexOf('>');
                if (text.indexOf('<') === 0) {
                    text = text.slice(i1 + 1, textLength);
                } else {
                    text = text.slice(0, i0) +
                    text.slice(i1 + 1, textLength);
                }
            }
            return text;
        },

        wordsToArray: function(text) {
            text = this.trimXtraSpace(text);
            return text.split(' ');
        },

        isWordIncluded: function (text, words) {
            text = text.toLowerCase();
            words = words.toLowerCase();

            words = this.wordsToArray(words);
            var isInSentence = true;
            for (var i = 0; i < words.length; i++) {
                isInSentence = isInSentence && text.includes(words[i]);
            }
            return isInSentence;
        },

        makeElement: function (elTag, jSONtext) {
            var attr, content;
            if (jSONtext === undefined || jSONtext === null) {
                attr = "";
                content = "";
            } else if (jSONtext.includes('<attr>')) {
                var i0 = jSONtext.indexOf('<attr>') + 6,
                    i1 = jSONtext.indexOf('</attr>');
                attr = " " + jSONtext.slice(i0, i1);
                content = jSONtext.slice(0, i0 - 2);
            } else {
                attr ="";
                content = jSONtext;
            }
            return '<'+ elTag + attr +'>'+ content +'</'+ elTag +'>';
        },

        trimChar2: function (text, char2) {
            var i0 = text.lastIndexOf(char2) + 1;
            return text.substring(i0, text.length);
        },

        defText: function(text, baseText) {
            return (text === undefined) ? baseText : text;
        },

        toDefArr: function(text, baseText) {
            text = this.defText(text);
            return this.wordsToArray(text, baseText);
        },

        tag: function(text, htmlTag, cssClass) {
            htmlTag = (htmlTag === undefined || htmlTag === '') ? 'span' : htmlTag;
            cssClass = (cssClass === undefined) ? '' : ' class="'+ cssClass + '"';
            return '<'+htmlTag + cssClass+'>'+ text + '</'+ htmlTag +'>';
        }

    };
    var ArrX = {

      sum2Arrays: function(array1, array2) {
        var ar_ = array1.concat(array2);
        return ar_;
      }
    };

    var tblList_G = [],
        tblRow_G = [],
        fltrBools_G = [],
        $filterTables = $('table.filter-r3').children('tbody')
        .children('tr').parents('table.filter-r3'),
        filterTablesL = $filterTables.length;

    (function() {

          var columnL;
          for (let i = 0; i < filterTablesL; i++) {

              $($filterTables[i]).attr('data-filter-table-index', i);// put data table index on table

              fltrBools_G[i] = [];// start to fill up 'search bool' keyainer

              columnL = $($filterTables[i]).find('thead > tr:last-child > th').length;
              var $td_inCol, td_inTbl = [];
              for (j = 0; j < columnL; j++) {

                  $td_inCol = $($filterTables[i]).find('tbody > tr > td:nth-child('+ (j + 1) +')');

                  var rowLen;
                  if (j === 0) {
                      rowLen = $td_inCol.length;
                      tblRow_G[i] = rowLen;
                  }

                  fltrBools_G[i][j] = [];
                  fltrBools_G[i][j].length = rowLen;
                  fltrBools_G[i][j].fill(true);

                  td_inTbl = ArrX.sum2Arrays(td_inTbl, $td_inCol);
              }

              tblList_G[i] = td_inTbl;
          }
      })();

      //#####################
      // Create text filter # CREATE ELEMENTS
      //#####################
    (function() {

          if ($filterTables !== null && !isConstructed) {
              $filterTables.children('thead').prepend('<tr>');

              for (let i = 0; i < filterTablesL; i++) {

                  var $th = $($filterTables[i]).find('thead > tr:last-child > th'),
                      columnL = $th.length;

                  $($filterTables[i]).attr('data-column', columnL);

                  var $th0 = $($filterTables[i]).find('thead > tr:first-child');
                  for (j = 0; j < columnL; j++) {

                      if ($($th[j]).hasClass('no-search-r3')) {
                          $th0.append('<td></td>');
                      } else {
                          $th0.append(
                              '<td>\n'+
                                  '<input type="text" '+
                                  'data-filter-table-index="'+ i +
                                  '" data-column-index="'+ j +'" />'+
                              '</td>\n'
                          );
                      }
                  }
              }
          }
      })();

      //#########################
      // Text filter function   # EVENT
      //#########################
      // no jQuery here, for better filter speed, hopefully
    $filterTables.not('.no-search-r3').find('thead > tr:first-child').keyup(function(e) {
          var inpt = e.target;
          if (inpt.tagName === 'INPUT') {

              var tbl = e.currentTarget.parentElement.parentElement,
                  columnL = e.currentTarget.childElementCount,
                  iTbl = tbl.getAttribute('data-filter-table-index'),
                  iCol = inpt.getAttribute('data-column-index'),
                  keyWrd = inpt.value;

              for (let i = 0; i < tblRow_G[iTbl]; i++) {

                  var bool_,
                      tdEl = tblList_G[iTbl][iCol][i];
                  if (keyWrd !== '' || keyWrd !== undefined) {
                      var tdText = (StrX.isCommented(tdEl.innerHTML)) ?
                              StrX.getFirstComment(tdEl.innerHTML) :
                              StrX.trimHTMLTag(tdEl.innerHTML);
                      bool_ = StrX.isWordIncluded(tdText, keyWrd);
                  } else {
                      bool_ = true;
                  }

                  fltrBools_G[iTbl][iCol][i] = bool_;
                  bool_ = fltrBools_G[iTbl][0][i];

                  for (j = 1; j < columnL; j++) {
                      bool_ = bool_ && fltrBools_G[iTbl][j][i];
                  }

                  if (bool_) {
                      tdEl.parentElement.classList.remove('hide-r3');
                  } else {
                      tdEl.parentElement.classList.add('hide-r3');
                  }
              }
          }
          e.stopPropagation();
      });

  }
  $('body').addClass(constructNote);
})();
