/*######################
// ar3-module-1.js  #
######################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/master/modular/module/ar3-module-1.js"></script>
--------------------------*/
//'use strict';
//####################
// ARRAY Xtra method # OBJECT
//####################



// test
export function sum2Arrays(array1, array2) {
    var ar_ = array1.concat(array2);
    return ar_;
}
/////////////////

export var cepot = 'xxx' //test/////////////////////////////////////////////////

export var ArrX = {

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

//export * as myModule from 'ar3-module-1';
