(function() {
    'use strict';
    var i, j, k, l, m,
        $ar3 = $('.ar3'),
        $main = $ar3.children('main'),
        newElement = !$ar3.hasClass('no_more_new_element'),
        lang = $ar3.attr('lang') === 'id',
        $div = $main.children('div'),
        $h2 = $div.children('h2'),
        $h3 = $div.children('h3'),
        $section = $div.children('section'),
        $h4 = $section.children('h4'),
        $aside;

    //####################
    // ARRAY Xtra method # OBJECT
    //####################
    var ArrX = {

        sum2Arrays: function(array1, array2) {
            var ar_ = array1.concat(array2);
            return ar_;
        }
    };

    //#####################
    // STRING Xtra method # OBJECT
    //#####################
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

    //###################
    // DATE Xtra method # OBJECT
    //###################
    var DatX = {

        // DatX.method1, get day, and define custom day
        getDayX : function(date1, dayList) {
            var i;
            dayList = StrX.toDefArr(dayList, 'Minggu Senin Selasa Rabu Kamis Jum\'at Sabtu');
            i = date1.getDay();
            return dayList[i];
        },

        // DatX.getMonthX
        getMonthX : function(date1, monthList) {
            var i;
            monthList = StrX.toDefArr(monthList, 'Januari Februari Maret April Juni Juli Agustus September Oktober November Desember');
            i = date1.getMonth();
            return monthList[i];
        },

        // DatX.getTimeLapse
        getTimeLapse : function(t1, t2, timeList) {
            //year month week day hour minute second
            timeList = StrX.toDefArr(timeList, 'tahun bulan minggu hari jam menit detik');
            t2 = (t2 === undefined) ? new Date(): t2;

            // conversion
            var cSec = 1/1000,
                cMin = cSec/60,
                cHour = cMin/60,
                cDay = cHour/24,
                cWeek = cDay/7,
                cMonth = cDay/30,
                cYear = cDay/365;

            var dt = t1.getTime()-t2.getTime(),
                year, month, week, day, hour, minute, second;

            year = Math.floor(dt*cYear);
            month = Math.floor((dt-(year/cYear))*cMonth);
            week = Math.floor((dt-(month/cMonth)-(year/cYear))*cWeek);
            day = Math.floor((dt-(week/cWeek)-(month/cMonth)-(year/cYear))*cDay);
            hour = Math.floor((dt-(day/cDay)-(week/cWeek)-(month/cMonth)-(year/cYear))*cHour);
            minute = Math.floor((dt-(hour/cHour)-(day/cDay)-(week/cWeek)-(month/cMonth)-(year/cYear))*cMin);
            second = Math.ceil((dt-(minute/cMin)-(hour/cHour)-(day/cDay)-(week/cWeek)-(month/cMonth)-(year/cYear))*cSec);

            year = (year === 0) ? '' : (year + ' ' + timeList[0]);
            month = (month === 0) ? '' : (month + ' ' + timeList[1]);
            week = (week === 0) ? '' : (week + ' ' + timeList[2]);
            day = (day === 0) ? '' : (day + ' ' + timeList[3]);
            hour = (hour === 0) ? '' : (hour + ' ' + timeList[4]);
            minute = (minute === 0) ? '' : (minute + ' ' + timeList[5]);
            second = (second === 0) ? '' : (second + ' ' + timeList[6]);

            if (year === 0 && month === 0 && week === 0 && day === 0) {
                return hour + minute + second;
            } else {
                return year + month + week + day;
            }
        }

    };

    //#####################
    // REGEXP Xtra method # OBJECT
    //#####################
    var RegX = {

        replace2Filter:  function(text, regX1, regX2, newSubText) {
            var matched = text.match(regX1);

            if (matched !== null) {
                var matchLen = matched.length,
                    tempText = text,
                    sumText;
                for (var i = 0; i < matchLen; i++) {

                    var i1 = (i === 0) ? tempText.indexOf(matched[i]) : i1;
                    sumText = (i === 0) ? tempText.substring(0, i1) : sumText;

                    sumText += matched[i].replace(regX2, newSubText);

                    var i2 = i1 + matched[i].length;
                    tempText = tempText.substring(i2, tempText.length);

                    i1 = tempText.indexOf(matched[i + 1]);
                    if (i !== matchLen - 1) {
                        sumText += tempText.substring(0, i1);
                    }

                    if (i === matchLen - 1) {sumText += tempText;}
                }
                return sumText;
            } else {
                return text;
            }
        },

        replaceWord: function(text, word, newSubText) {
            var regX2 = new RegExp(word),
                regX1 = new RegExp('^' + word + '\\W|\\W' + word + '\\W|\\W' + word + '$', 'gm');
            return RegX.replace2Filter(text, regX1, regX2, newSubText);
        }

    };

    //######################
    // ELEMENT Xtra method # ELEMENT
    //######################
    var ElemX = {
        topY: function(elem) {
            var y = 0;
            while (elem.tagName !== 'BODY') {
                y += elem.offsetTop;
                elem = elem.parentElement;
            }
            return y;
        }
    };

    //###########
    // <header> #
    //###########
    (function() {
      // in case I forget to put mobile scale, create mobile scale automatically
      if ($('#mobile-scale-ar3' != null)) {
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
      }
    })();

    //#########
    // <main> #
    //#########
    (function() {

        //########
        // <div> # ATTACH EVENT
        //########
        (function() {
            $div.mouseenter(function() {
                var a = 'a[href="#'+ this.querySelector('h2:first-child').id +'"]';
                $(a).prev().prev('h3').addClass('w3-khaki');
            });

            $div.mouseleave(function() {
                var a = 'a[href="#'+ this.querySelector('h2:first-child').id +'"]';
                $(a).prev().prev('h3').removeClass('w3-khaki');
            });
        })();

        //################
        // <div>.flex-r3 #
        //################
        if (newElement) {
            $div.find('div.flex-r3 > div + b').before('<hr>');
        }

		//###############
        // <div>.tab-r3 #
        //###############
        (function() {
            var $tabGroup = $div.find('.tab-r3'),
                $div2 = $tabGroup.children('div:nth-child(2)'),
                $divContent = $div2.children('div'),
                divContentL = $divContent.length;

            //###########
            // <div>2nd #
            //###########
            (function() {

                //########
                // <div> # CREATE ID
                //########
                (function() {
                    for (i = 0; i < divContentL; i++) {
                        $($divContent[i]).attr('id', 'r3_tab_content_'+ i);
                    }
                })();

                //######
                // <a> # ATTACH EVENT
                //######
                $div2.find('div.relative-container-r3 > a').click(function() {
                    var n = $(this).attr('data-tab-a');
                    $(this).parents('div.tab-r3').children('div:first-child').children('a:nth-of-type('+ n +')').click();
                });

            })();

            //###########
            // <div>1st #
            //###########
            (function() {
                var $div1 = $tabGroup.children('div:first-child'),
                    $a = $div1.children('a');

                //######
                // <a> # CREATE HREF
                //######
                (function() {
                    if (newElement) {
                        for (i = 0; i < divContentL; i++) {
                            var id = $($divContent[i]).attr('id');
                            $a[i].setAttribute('href', '#'+id);
                        }
                    }
                })();

                //##################
                // <a>:first-child # ADD CLASS
                //##################
                (function() {
                    if (newElement) {
                        $div1.children('a:first-child').addClass('r3-active');
                    }
                })();

                //######
                // <a> # ATTACH EVENT
                //######
                $a.click(function() {
                    var id = this.href.slice(this.href.indexOf('#') + 1, this.href.length);
                    $(this).siblings().removeClass('r3-active');
                    $(this).addClass('r3-active');
                    $('#'+id).siblings().fadeOut(400);
                    $('#'+id).delay(401).fadeIn();
                });

            })();

        })();

        //######
        // <i> #
        //######
        $div.find('i').attr('lang','en');

        //########
        // <img> #
        //########
        (function() {
            if (newElement) {
				var $img = $div.find('img');
				for (i = 0; i < $img.length; i++) {
					var $relContainer = $($img[i]).parent('div.relative-container-r3');

					if ($relContainer.length > 0) {
						$relContainer.addClass('r3-slider');
					} else {
					    $($img[i]).wrap('<div class="r3-slider">');
					}
				}
            }
        })();

        //##########
        // heading #
        //##########
        (function() {
            var
                $heading = $h2.add($h3).add($h4),
                headingL = $heading.length;

            //#######
            // <h2> # ATTACH EVENT
            //#######
            (function() {
                $h2.mouseenter(function() {
                    var a = 'a[href="#'+this.id+'"]';
                    $(a).addClass('w3-deep-orange');
                });

                $h2.mouseleave(function() {
                    var a = 'a[href="#'+this.id+'"]';
                    $(a).removeClass('w3-deep-orange');
                });
            })();

            //#######
            // <h3> #
            //#######
            (function() {

                //############
                // <hr> <h3> # CREATE ELEMENT
                //############
                if (newElement) {
                    $div.children('section + h3').before('<hr>');
                }

                //#######
                // <h3> # ATTACH EVENT (navigation highlight)
                //#######
                (function() {
                    $h3.mouseenter(function() {
                        var a = 'a[href="#'+ this.id +'"]';
                        $(a).addClass('w3-deep-orange');
                        $(a).parent().prev('a').addClass('w3-khaki').css('font-weight', 'bold');
                        $(a).parent().prev().prev('.r3-accordion').addClass('w3-khaki').css('font-weight', 'bold');
                    });

                    $h3.mouseleave(function() {
                        var a = 'a[href="#'+ this.id +'"]';
                        $(a).removeClass('w3-deep-orange');
                        $(a).parent().prev('a').removeClass('w3-khaki').css('font-weight', 'lighter');
                        $(a).parent().prev().prev('.r3-accordion').removeClass('w3-khaki').css('font-weight', 'lighter');
                    });
                })();

                //#######
                // <h3> # ATTACH EVENT (accordion)
                //#######
                $h3.on('click touch', function(){
                    if (this.classList.contains("r3-active") !== true) {
                        this.style.setProperty('-webkit-transition','background-color 0.3s ease-in-out 0.6s, border-radius 0.2s 0.6s, color 0.3s ease-in-out 0.6s');
                        this.style.setProperty('transition','background-color 0.3s ease-in-out 0.6s, border-radius 0.2s 0.6s, color 0.3s ease-in-out 0.6s');
                        $(this).next().slideToggle(600);
                    } else {
                        this.style.setProperty('-webkit-transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
                        this.style.setProperty('transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
                        $(this).next().delay(300).slideToggle(600);
                    }
                    this.classList.toggle("r3-active");
                });
            })();

            //#######
            // <h4> #
            //#######
            (function() {

                //#######
                // <hr> # CREATE ELEMENT
                //#######
                if (newElement) {
                    $h4.before('<hr>');
                    $section.children('hr:first-of-type').remove();
                }

                //###############
                // <div> + <h4> #
                //###############
                (function() {

                    //########
                    // <div> # CREATE ELEMENT
                    //########
                    if (newElement) {
                        $h4.before('<div style="width: 100%; height: 1px">');
                    }

                    //########
                    // <div> # ATTACH EVENT
                    //########
                    (function() {
                        $h4.prev('div').mouseenter(function() {
                            var x = $(this).next().attr('id');
                            $('a[href="#'+x+'"]').parent().children().removeClass('w3-deep-orange');
                            $('a[href="#'+x+'"]').addClass('w3-deep-orange');
                        });
                    })();

                })();

            })();

            //#################
            // <h2> <h3> <h4> # CREATE ID
            //#################
            (function() {
                if (newElement) {
                    var h = [$h2, $h3, $h4],
                        $h, hL;
                    for (i = 0; i < h.length; i++) {
                        $h = h[i];
                        hL = $h.length;
                        for (j = 0; j < headingL; j++) {
                            if ($($h[j]).attr('id') === undefined) {
                                $($h[j]).attr('id', 'h'+ i +'_'+ j);
                            }
                        }
                    }
                }
            })();

        })();

        //############
        // <marquee> #
        //############
        (function() {
            if (newElement) {
                var $marquee = $div.children('h2 + marquee'),
                    marqueeL = $marquee.length;
                for (var i = 0; i < marqueeL; i++) {
                    var text = $($marquee[i]).html();
                        text = text.replace(/  /gm, ' ').
                            trim().
                            replace(/ /gm, '&nbsp;'.repeat(16));
                    $($marquee[i]).html(text);
                    $($marquee[i]).after('<marquee>'+ text +'</marquee><marquee>'+ text +'</marquee>');
                }
            }
        })();

        //###################
        // <p> -> <ol>, <ul # ADD CSS
        //###################
        $div.find('ul, ol').prev('p').css('margin-bottom', '2px');

        //############
        // <section> # ATTACH EVENT
        //############
        (function() {

            $section.mouseenter(function() {
                var a = 'a[href="#'+ this.previousElementSibling.id +'"]';
                $(a).addClass('w3-deep-orange');
                $(a).parent().prev('a').addClass('w3-khaki').css('font-weight', 'bold')
                .prev('.r3-accordion').addClass('w3-khaki').css('font-weight', 'bold');
            });

            $section.mouseleave(function() {
                var $a = $('a[href="#'+ this.previousElementSibling.id +'"]');
                $a.removeClass('w3-deep-orange');
                $a.parent().prev('a').removeClass('w3-khaki').css('font-weight', 'lighter')
                .prev('.r3-accordion').removeClass('w3-khaki').css('font-weight', 'lighter');

                $('.ar3 aside').children('nav')
                      .children('nav')
                      .find('a').removeClass('w3-deep-orange');
            });

        })();

        //##########
        // <table> #
        //##########
        (function() {
            var $table = $div.find('table'),
                $tbody = $table.children('tbody');

            //##################
            // <div>.r3-slider # CREATE ELEMENT
            //##################
            (function() {
                if (newElement) {
                    $table.wrap('<div class="r3-slider">');
                }
            })();

            //################
            // <td>[rowspan] # ADD CSS
            //################
            (function() {
                if (newElement && $tbody.find('td[rowspan]') !== null) {
                    var $tdRow = $tbody.find('td[rowspan]', 'table > tbody > tr'),
                        $tdRowL = $tdRow.length;

                    $tdRow.addClass('r3-multi-row').parent().addClass('r3-multi-row');
                    for (i = 0; i < $tdRowL; i++) {
                        var rowN = $tdRow[i].getAttribute('rowspan'),
                            row = $tdRow[i].parentElement;
                        for (j = 0; j < rowN; j++) {
                            row = row.nextElementSibling;
                        }
                        if (row !== null) {
                            row.classList.add('r3-multi-row');
                        } else {
                            $tdRow[i].classList.add('r3-multi-row-last');
                        }
                    }
                }
            })();

            //#####################
            // <table>[data-JSON] #
            //#####################
            (function() {
                var $jsonTable = $div.find('table[data-JSON]');
                //###############
                // parsing JSON #
                //###############
                if (newElement && $jsonTable.length > 0) {
                    $('head').append('<script>var jsonText = _jsonText;</script>');
                    var jsonObject = JSON.parse(jsonText);
                }

                //#########################
                // Create TABLE from JSON # CREATE ELEMENTS
                //#########################
                (function() {
                    if (newElement && $jsonTable.length > 0) {

                        if (jsonText !== undefined && $jsonTable !== null) {

                            var jsonTableLength = $jsonTable.length;

                            for (i = 0; i < jsonTableLength; i++) {
                                if ($($jsonTable[i]).children('tbody').length === 0) {
                                    $($jsonTable[i]).append('<tbody>');
                                }

                                var $th = $($jsonTable[i]).find('thead > tr:last-child > th'),
                                    thLength = $th.length,
                                    $tbody = $($jsonTable[i]).children('tbody'),

                                    arrayInJson = $($jsonTable[i]).attr('data-JSON');
                                if (jsonObject[arrayInJson] !== undefined) {
                                    var moreRowsLength = jsonObject[arrayInJson].length;
                                    for (j = 0; j < moreRowsLength; j++) {
                                        $tbody.append('<tr>');
                                        var $tr = $tbody.children('tr:last-child');

                                        //#########
                                        // object #
                                        //#########
                                        var obj = jsonObject[arrayInJson][j]['obj'];
                                        obj = (obj === undefined) ? jsonObject[arrayInJson][0]['obj'] : obj;
                                        if (obj !== undefined) {
                                            obj = (obj.charCodeAt(0) > 96 && obj !== 'document') ? StrX.tag(obj,'i','r3-object'): StrX.tag(obj,'','r3-default-object');
                                        }

                                        //############
                                        // arguments #
                                        //############
                                        var arg = jsonObject[arrayInJson][j]['arg'],
                                            ard;
                                        if (arg !== undefined) {
                                            if (arg.split('|').length !== 1) {
                                                ard = arg.split('|')[1];
                                                arg = arg.split('|')[0];
                                            } else {
                                                ard = arg;
                                            }
                                            arg = arg.split(' ');
                                            ard = ard.split(' ');
                                            for (l = 0; l < arg.length; l++) {
                                                ard[l] = '<i class="r3-argument" title="' + arg[l] + '">' + ard[l] + '</i>';
                                                arg[l] = StrX.tag(arg[l], '', 'r3-argument');
                                            }
                                            ard = ard.join(', ');
                                            arg = arg.join(', ');
                                        } else {
                                            ard = '';
                                            arg = '';
                                        }

                                        //#######
                                        // type #
                                        //#######
                                        var typ = jsonObject[arrayInJson][j]['typ'];
                                        var cod = jsonObject[arrayInJson][j]['cod'];

                                        if (typ === undefined) {
                                            typ = jsonObject[arrayInJson][0]['typ'];
                                        }

                                        if (typ === undefined) {
                                            if (obj === undefined) {
                                                typ = 'operator';
                                            } else {
                                                typ = (cod.includes('()')) ? 'method' : 'property';
                                            }
                                        }

                                        //########
                                        // value #
                                        //########
                                        var lvl, rvl;
                                        var val = jsonObject[arrayInJson][j]['val'];
                                        if (val === undefined) {
                                            if (typ === 'operator' || typ === 'literal') {
                                                val = jsonObject[arrayInJson][0]['val'];
                                            }
                                        }
                                        if (val !== undefined) {
                                            lvl = val.split('|')[0];
                                            rvl = val.split('|')[1];
                                            lvl = (lvl !== undefined) ? StrX.tag(lvl, 'i') : '';
                                            rvl = (rvl !== undefined) ? StrX.tag(rvl, 'i') : '';
                                        }

                                        //#########
                                        // syntax #
                                        //#########
                                        var regXMethod, _text, _cod,
                                            syn = jsonObject[arrayInJson][j]['syn'];
                                        if (syn === undefined) {
                                            switch (typ) {
                                                case 'property':
                                                    _text = cod;
                                                    _cod = _text;
                                                    syn = obj+ '.' + StrX.tag(_text, '', 'r3-code-highlight');
                                                    regXMethod = new RegExp(_text, 'gm');
                                                    break;
                                                case 'method':
                                                    _text = cod.substring(0, cod.length-2);
                                                    _cod = _text;
                                                    syn = obj+ '.' + StrX.tag(_text, '', 'r3-code-highlight') + '(' + ard + ')';
                                                    regXMethod = new RegExp(_text, 'gm');
                                                    break;
                                                case 'operator':
                                                    syn = lvl + StrX.tag(cod, '', 'r3-code-highlight') + rvl;
                                                    break;
                                            }
                                        }

                                        //##########
                                        // literal #
                                        //##########
                                        if (typ === 'literal') {
                                            if (cod.includes(' ')) {
                                                _text = StrX.trimHTMLTag(StrX.makeElement('span', cod)).split(' ');
                                                var _i1, __text;
                                                for (l = 0; l < _text.length; l++) {
                                                    if (l === 0) {
                                                        syn = syn.replace(_text[l], StrX.tag(_text[l], 'mark'));
                                                        _i1 = syn.indexOf(_text[l]);
                                                    } else if (l === 1) {
                                                        __text = syn.substring(_i1 + 1, syn.length).replace(_text[l], StrX.tag(_text[l], 'mark'));
                                                        syn = syn.substring(0, _i1 + 1) + __text;
                                                    }
                                                }
                                                syn = StrX.tag(syn, '', 'r3-literal');
                                            } else {
                                                if (syn === undefined) {
                                                    syn = '';
                                                }
                                                syn = syn.replace(cod, StrX.tag(cod, 'mark'));
                                                syn = StrX.tag(syn, '', 'r3-literal');
                                            }
                                        }

                                        //########################
                                        // depreceated and title #
                                        //########################
                                        var dep = jsonObject[arrayInJson][j]['dep'];
                                        var des = jsonObject[arrayInJson][j]['des'];
                                        if (dep !== undefined && des !== undefined) {
                                            syn = syn + '<attr>title="'+ des +'" class="r3-depreceated"</attr>';
                                        } else if (dep !== undefined) {
                                            syn = syn + '<attr>class="r3-depreceated"</attr>';
                                        } else if (des !== undefined) {
                                            syn = syn + '<attr>title="'+ des +'"</attr>';
                                        }

                                        //##########
                                        // example #
                                        //##########
                                        var exp1 = jsonObject[arrayInJson][j]['exp'],
                                            ret = jsonObject[arrayInJson][j]['ret'],
                                            exr;
                                        if (exp1 !== undefined && !exp1.includes('<pre>')) {
                                            if (exp1.includes('>S<')) {

                                                //##########
                                                // example # split example and result
                                                //##########
                                                exr =  exp1.split('>S<')[1];
                                                exp1 = exp1.split('>S<')[0];
                                                exr = (exr !== undefined) ? exr.split('>s<') : exp1;
                                                exp1 = exp1.split('>s<');
                                                var expL = exp1.length;
                                                for (l = 0; l < expL; l++) {

                                                    var regXInvoker;
                                                    if (typ === 'method' || typ === 'property') {
                                                        if (!/\n/.test(exp1[l])) {
                                                            _text = exp1[l].substring(0, exp1[l].indexOf('.' +  _cod));
                                                            _text = _text.replace(/[\(|\)|\[|\]]/gm, '\\$&');
                                                            regXInvoker = new RegExp(_text);
                                                        } else {
                                                            exp1[l] = exp1[l].split('\n');
                                                            for (m = 0; m < exp1[l].length; m++) {
                                                                var _i0 = (exp1[l][m].includes(' = ')) ? exp1[l][m].indexOf(' = ') + 3 : 0;

                                                                if (exp1[l][m].includes('.' +  _cod)) {
                                                                    _text = exp1[l][m].substring(_i0, exp1[l][m].indexOf('.' +  _cod));
                                                                    _text = _text.replace(/[\(|\)|\[|\]]/gm, '\\$&');
                                                                    regXInvoker = new RegExp(_text, 'gm');
                                                                    break;
                                                                }
                                                            }
                                                            exp1[l] = exp1[l].join('\n');
                                                        }
                                                    }

                                                    if (regXInvoker !== undefined) {
                                                        if (obj.includes('r3-object')) {
                                                            exp1[l] = RegX.replaceWord(exp1[l], regXInvoker.source, StrX.tag('$&', '', 'r3-object'));
                                                        } else {
                                                            exp1[l] = RegX.replaceWord(exp1[l], regXInvoker.source, StrX.tag('$&', '', 'r3-default-object'));
                                                        }
                                                    }

                                                    if (arg !== undefined && arg !== '') {
                                                        var args;
                                                        if (!/\n/.test(exp1[l])) {
                                                            args = exp1[l].substring(exp1[l].indexOf('(') + 1, exp1[l].length - 1);
                                                        } else {
                                                            exp1[l] = exp1[l].split('\n');

                                                            for (m = 0; m < exp1[l].length; m++) {
                                                                if (exp1[l][m].includes(_cod)) {
                                                                    args = exp1[l][m].substring(exp1[l][m].indexOf(_cod + '(') + 1 +
                                                                          _cod.length, exp1[l][m].length - 2);
                                                                    break;
                                                                }
                                                            }

                                                            exp1[l] = exp1[l].join('\n');
                                                        }

                                                        var _arg = args;

                                                        if (args.includes('>a<')) {
                                                            args = args.split('>a<');
                                                            for (m = 0; m < args.length; m++) {
                                                                args[m] = StrX.tag(args[m], '', 'r3-argument');
                                                            }
                                                            args = args.join(', ');
                                                        } else {
                                                            args = StrX.tag(args, '', 'r3-argument');
                                                        }

                                                        var _i = exp1[l].indexOf('(');

                                                        exp1[l] = exp1[l].substring(0, _i) + exp1[l].substring(_i, exp1[l].length).replace(_arg, args);
                                                    }
                                                    exp1[l] = StrX.tag(exp1[l], 'pre');

                                                    //####################
                                                    // example result[l] #
                                                    //####################
                                                    if (exr[l] !== '') {
                                                        exr[l] = (ret === 'string') ? '<span class="r3-string"><span class="comment-r3">"</span>'+ exr[l] +
														'<span class="comment-r3">"</span></span>': exr[l];

                                                        exr[l] = (ret === 'boolean') ? StrX.tag(exr[l], '', 'r3-boolean'): exr[l];
                                                        exr[l] = (ret === 'number') ? StrX.tag(exr[l], '', 'r3-number'): exr[l];
                                                        if (ret === 'array' && !exr[l].includes('[')) {
                                                            exr[l] = exr[l].split(',');

                                                            exr[l] = exr[l].join('</span><span class="comment-r3">"</span>,'+
															'<span class="comment-r3">"</span><span class="r3-string">');

                                                            exr[l] = '[<span class="comment-r3">"</span><span class="r3-string">' + exr[l] +
															'</span><span class="comment-r3">"</span>]';
                                                        }
                                                        exr[l] = StrX.tag(exr[l], 'pre');
                                                    }

                                                }
                                                exp1 = exp1.join('<br/>');
                                                  if (regXMethod !== undefined) {
                                                    exp1 = exp1.replace(regXMethod, StrX.tag('$&', '', 'r3-code-highlight'));
                                                }
                                                if (exr !== '') {
                                                    exr = exr.join('<br/>');
                                                } else {
                                                    exr = undefined;
                                                }
                                            } else {
                                                exp1 = StrX.tag(exp1, 'pre');
                                            }
                                        } else {
                                            if (jsonObject[arrayInJson][j]['exr'] === undefined) {
                                                exr = undefined;
                                            } else {
                                                exr = jsonObject[arrayInJson][j]['exr'];
                                            }
                                        }

                                        //######
                                        // log #
                                        //######
                                        var log1 = jsonObject[arrayInJson][j]['log'];
                                        if (log1 !== undefined) {
                                            if (log1.includes('>s<')) {
                                                log1 = log1.split('>s<');
                                                for (l = 0; l < log1.length; l++) {
                                                    log1[l] = StrX.tag(log1[l], 'pre');
                                                }
                                                log1 = log1.join('<br/>');
                                            } else {
                                                log1 = StrX.tag(log1, 'pre');
                                            }
                                        }

                                        //######
                                        // set # for set method
                                        //######
                                        var set1 = jsonObject[arrayInJson][j]['set'];
                                        if (set1 !== undefined) {
                                            if (set1.includes('>s<')) {
                                                set1 = set1.split('>s<');
                                                for (l = 0; l < set1.length; l++) {
                                                    set1[l] = StrX.tag(set1[l], 'pre');
                                                }
                                                set1 = set1.join('<br/>');
                                            } else {
                                                set1 = StrX.tag(set1, 'pre');
                                            }
                                        }

                                        //#######
                                        // math #
                                        //#######
                                        var math = jsonObject[arrayInJson][j]['math'];
                                        math = (math !== undefined) ? StrX.tag(math, '', 'math-r3') : undefined;

                                        //######
                                        // ret #
                                        //######
                                        if (ret !== 'object') {
                                            ret = StrX.tag(ret, '', 'r3-' + StrX.trimHTMLTag(ret));
                                        }

                                        //######
                                        // set #
                                        //######
                                        var red = jsonObject[arrayInJson][j]['red'];
                                        red = StrX.tag(red, 'pre');

                                        for (k = 0; k < thLength; k++) {
                                            var key = $($th[k]).attr('data-JSON');
                                            var content = jsonObject[arrayInJson][j][key];

                                            switch (key) {
                                                case 'obj':
                                                    content = obj;
                                                    obj = undefined;
                                                    break;
                                                case 'typ':
                                                    content = typ;
                                                    typ = undefined;
                                                    break;
                                                case 'arg':
                                                    content = arg;
                                                    arg = undefined;
                                                    break;
                                                case 'syn':
                                                    content = syn;
                                                    syn = undefined;
                                                    break;
                                                case 'exp':
                                                    content = exp1;
                                                    exp1 = undefined;
                                                    break;
                                                case 'exr':
                                                    content = exr;
                                                    exr = undefined;
                                                    break;
                                                case 'set':
                                                    content = set1;
                                                    set1 = undefined;
                                                    break;
                                                case 'red':
                                                    content = red;
                                                    red = undefined;
                                                    break;
                                                case 'log':
                                                    content = log1;
                                                    log1 = undefined;
                                                    break;
                                                case 'math':
                                                    content = math;
                                                    math = undefined;
                                                    break;
                                                case 'ret':
                                                    content = ret;
                                                    ret = undefined;
                                                    break;
                                                default:
                                                    content = content;
                                            }

                                            var td = StrX.makeElement('td', content);
                                            $tr.append(td);
                                        }
                                    }
                                }
                            }
                        }
                    }
                })();

                //##############
                // Sort table  # SORT TABLE
                //##############
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

                //##################
                // CHECK BOX START #
                //##################
                (function() {
                    //###################
                    // Create CHECKBOX  # CREATE
                    //################### ELEMENTS
                    var $checkTables = $div.find('table.check-r3');
                    (function() {

                        if ($checkTables !== null && newElement) {

                            $checkTables.before('<form>');// create keyainer for checkbox,
                            var checkTableLength = $checkTables.length;

                            for (i = 0; i < checkTableLength; i++) {

                                var $th = $($checkTables[i]).find('thead > tr:last-child > th'),
                                    columnL = $th.length;

                                for (j = 0; j < columnL; j++) {

                                    var hideColumn = $($th[j]).hasClass('hide-col-r3');

                                    var teks;
                                    if ($($th[j]).children('.komen').length !== 0) {
                                        teks = StrX.trimChar2($($th[j]).html(), '>');
                                    } else {
                                        teks =     $($th[j]).html();
                                    }
                                    var border = (j === columnL - 1) ? '' : ' | ';
                                    $($checkTables[i]).prev('form').append(
                                        '<input type="checkbox" '+
                                        'data-checkTableIndex="'+ i +
                                        '" data-column-index="'+ j +'" '+
                                        ((j===0) ? 'disabled ':'')+
                                        ((hideColumn) ? 'class="hideColAR3" ':'')+
                                        'checked '+
                                        '/> '+
                                        ' '+ teks +
                                        border
                                    );
                                }
                            }
                        }
                    })();

                    //#####################
                    // CHECK BOX FUNCTION # EVENT
                    //#####################
                    $checkTables.prev('form').click(function(e) {
                        var $inpt = $(e.target);
                        if ($inpt[0].tagName === 'INPUT') {

                            var tblin = $inpt.attr('data-checkTableIndex'),
                                iCol = parseInt($inpt.attr('data-column-index')) + 1,
                                $aCol = $($checkTables[tblin]).find('td:nth-child(' + iCol + '),' +
                                        'th:nth-child(' + iCol + ')');

                            $aCol.fadeToggle(600);
                        }
                        e.stopPropagation();
                    });

                    //########################
                    // UNCHECK some CHECKBOX # HIDE SOME COLUMN
                    //########################
                    (function() {
                        $('input.hideColAR3').click();
                    })();

                })();
                //##################
                // CHECKBOX END    #
                //##################

                //####################
                // TEXT FILTER START #
                //####################
                (function() {
                    //##############################
                    // create variables for filter # VARIABLES
                    //##############################
                        // create data keyainer that will
                        // be used later in event function
                    var tblList_G = [],
                        tblRow_G = [],
                        fltrBools_G = [],
                        $filterTables = $('table.filter-r3').children('tbody')
                        .children('tr').parents('table.filter-r3'),
                        filterTablesL = $filterTables.length;

                    (function() {

                        var columnL;
                        for (i = 0; i < filterTablesL; i++) {

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

                        if ($filterTables !== null && newElement) {
                            $filterTables.children('thead').prepend('<tr>');

                            for (i = 0; i < filterTablesL; i++) {

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

                            for (i = 0; i < tblRow_G[iTbl]; i++) {

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


                })();
                //###################
                // TEXT FILTER END  #
                //###################

            })();

        })();

        //#############
        // <pre><pre> #
        //#############
        (function() {
            var textA = (lang) ?
                'perlihatkan seluruh kode' :
                'show all code';

            //#############
            // <pre><pre> # SET ACCORDION
            //#############
            (function() {
                if (newElement && !$ar3.hasClass('no-auto-pre')) {
                    var $pre = $div.find('pre + pre');
                    $pre.css('display', 'none')
                        .prev().css('margin-bottom','3px')
                        .after('<button class="r3-code-accordion">'+
                        textA +'</button>');
                }
            })();

            //#############################
            // <button>.r3-code-accordion # ATTACH EVENT
            //#############################
            (function() {
                var textB = (lang) ?
                    'persingkat kode' :
                    'short code';

                $div.find('button.r3-code-accordion').click(function() {
                    if ($(this).hasClass('r3-active')) {
                        this.innerHTML= textA;
                        $(this).prev().delay(300).toggle(600);
                        $(this).next().toggle(300);
                    } else {
                        this.innerHTML= textB;
                        $(this).prev().toggle(300);
                        $(this).next().delay(300).toggle(600);
                    }
                    $(this).toggleClass('r3-active');
                });
            })();

        })();

        //##########
        // <video> # ADD ATTR
        //##########
        (function() {
            if (newElement) {
                var $video = $div.find('video'),
                    videoL = $video.length;
                for (i = 0; i < videoL; i++) {
                    if (!$($video[i]).hasClass('no-controls-r3')) {
                        $($video[i]).attr('controls','');
                    }
                }
            }
        })();

    })();

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
                var $asideDummy = $('.ar3 > div.r3-aside-replacement');

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
                    var topLimit = ElemX.topY($main[0]) - $('#nav-ar3').innerHeight();
                    if (scrolltop() < topLimit) {
                      $('#nav-ar3').css({'position': 'fixed', 'top' : 0});
                    } else if (scrolltop() > topLimit){
                      $('#nav-ar3').css({'position': 'absolute', 'top': topLimit + 'px'});
                    }
                  }
                  dynamicHeader();

                  document.addEventListener('click', dynamicHeader);
                  document.addEventListener('resize', dynamicHeader);
                  document.addEventListener('scroll', dynamicHeader);
                })();

            })();

            // TEST HEADER
            // add scroll header function




        })();

        //##############################
        // <aside> <span>.r3-accordion #
        //##############################
        (function() {

            //######################
            // <span>.r3-accordion # CREATE ELEMENT
            //######################
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

    //########
    // print #
    //########
    (function() {

        //#################
        // <h2> <h3> <h4> # ADD <span>.hide-not-print-r3
        //################# (number for print)
        (function() {
            if (newElement) {
                var $heading = $h2.add($h3, $h4),
                    headingL = $heading.length,
                    num1 = 1,
                    num2 = 1,
                    num3 = 1;

                for (i = 0; i < headingL; i++) {
                    if ($heading[i].tagName === 'H2') {
                        $heading[i].innerHTML = '<span class="hide-not-print-r3" style="text-align:left; font-size:0.8em">'+
                            num1 +'. </span>'+ $heading[i].innerHTML;
                        num2 = 1;
                        num3 = 1;
                    } else if ($heading[i].tagName === 'H3') {
                        $heading[i].innerHTML = '<span class="hide-not-print-r3" style="text-align:left; font-size:0.8em">'+
                            num1 +'.'+num2+'. </span>'+ $heading[i].innerHTML;
                        num3 = 1;
                        if ($heading[i+1]!== undefined) {
                            if ($heading[i+1].tagName === 'H2') {
                                num1++;
                            }
                        }
                        if ($heading[i+1]!== undefined) {
                            if ($heading[i+1].tagName === 'H3') {
                                num2++;
                            }
                        }
                    } else if ($heading[i].tagName === 'H4') {
                        $heading[i].innerHTML = '<span class="hide-not-print-r3" style="text-align:left; font-size:0.8em">'+
                            num1 +'.'+num2+'.'+num3+'. </span>'+ $heading[i].innerHTML;
                        num3++;
                        if ($heading[i+1].tagName === 'H2') {
                            num1++;
                        }
                        if ($heading[i+1].tagName === 'H3') {
                            num2++;
                        }
                    }
                }
        }
        })();

    })();

    //######################
    // No more new element #
    //######################
    $ar3.addClass('no_more_new_element');

    /*////////////////////////////
    // clearing error in my IDE //
    ////////////////////////////*/
    if (false) {
        console.log(DatX + ArrX + RegX + ElemX);
    }
})();

if (false) {
    var jsonText;
}
