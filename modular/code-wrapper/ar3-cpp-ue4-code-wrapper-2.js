/*#################################
// ar3-cpp-ue4-code-wrapper-2.js  #
#################################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/modular/code-wrapper/ar3-cpp-ue4-code-wrapper-2.js"></script>
--------------------------*/

{
    const constructNote = 'r3-cpp-ue4-code-wrapper_done',
          isConstructed = $('body').hasClass(constructNote);

    (function(){

        // 1. (2nd update)
        const $codExes = $('.cpp-codexes-r3');
        if ($codExes == null) {return;}

        const classTag = 'var',
              classClass = 'blue-r3',
              constrTag = 'span',
              varTag = 'span',
              var2Tag= 'span',
              varClass = 'green-r3',
              var2Class = "grey-r3",
              functTag = 'mark',
              commentTag = 'span',
              commentClass = 'comment-r3',
              inputTag = 'var',
              inputClass = 'magenta-r3',
              tabLength = 4;

        function wrapTag(text, tag = 'span', css_class) {
            if (css_class != null) {
                return '<' + tag + ' class="' + css_class + '">' + text + '</' + tag + '>';
            } else {
                return '<' + tag + '>' + text + '</' + tag + '>';
            }
        }

        function wrapFromAttr(targText, targHtml, attr_,tag_, class_) {
            let words = $(targHtml).attr(attr_);
            if (words) {
                words = words.split(',');

                let rx_;
                for (let j = 0; j < words.length; j++) {
                    rx_ = new RegExp('\\b'+ words[j] + '\\b', 'g');
                    targText = targText.replace(rx_, wrapTag(words[j], tag_, class_));
                }
            }
            return targText;
        }

        function wrapSinglComment(targetText, tagComment_, classComment_) {
            let comments = targetText.match(/\/\/.*$/mg);
            if (comments == null) {return targetText;}
            if (comments.length > 0) {
                let setComments = new Set(comments);
                comments = [...setComments];

                for (let i = 0; i < comments.length; i++) {
                    let comment_ = comments[i];
                    if (comments[i].indexOf('(') || comments[i].indexOf(')') ) {
                        comment_ = comment_.replace(/\(/, '\\(');
                        comment_ = comment_.replace(/\)/, '\\)');
                    }
                    let rexComment = new RegExp(comment_, 'g');

                    targetText = targetText.replace(rexComment, wrapTag(comments[i], tagComment_, classComment_));
                }
            }
            return targetText;
        }

        function wrapMultComment(targetText, tagComment_, classComment_) {
            targetText = targetText.replace(/\/\*/gm, '<' + tagComment_ + ' class="' + classComment_ + '">/*');
            targetText = targetText.replace(/\*\//gm, '*/</' + tagComment_ + '>');
            return targetText;
        }

        function wrapComment(targetText) {
            targetText = wrapSinglComment(targetText, commentTag, commentClass);
            targetText = wrapMultComment(targetText, commentTag, commentClass);
            return targetText;
        }

        function addTabForFunction(targetText) {

            let sumText;
            if (/\{/.exec(targetText) == null) {return targetText;}
            if (/\{/.exec(targetText).length > 0) {
                let tab_ = '&nbsp;'.repeat(tabLength);

                let arrText = targetText.split('\n'),
                    openCurlyCount = 0,
                    lineText;

                for (let i = 0; i < arrText.length; i++) {

                    if (arrText[i].indexOf('{') > -1) {
                        arrText[i] = tab_.repeat(openCurlyCount) + arrText[i];
                        openCurlyCount++;
                        continue;
                    } else if (arrText[i].indexOf('}') > -1) {
                        openCurlyCount--;
                        arrText[i] = tab_.repeat(openCurlyCount) + arrText[i];
                        continue;
                    }

                    if (openCurlyCount == 0) {
                        continue;
                    }

                    if (arrText[i].indexOf('public:') > -1 || arrText[i].indexOf('protected:') > -1) {
                        arrText[i] = tab_.repeat(openCurlyCount - 1) + arrText[i];
                    } else {
                        arrText[i] = tab_.repeat(openCurlyCount) + arrText[i];
                    }

                }

                targetText = arrText.join('\n');
            }

            return targetText;
        }

        for (let h = 0; h < $codExes.length; h++) {
            let $codEx = $($codExes[h]).find('pre'); // change in 2nd update
            if ($codEx.length > 0) {

                for (let i = 0; i < $codEx.length; i++) {

                    let codText = $codEx[i].innerHTML;

                    // 1.a.
                    {
                        codText = codText.replace(/\>/g, '&gt;');
                        codText = codText.replace(/\</g, '&lt;');
                    }

                    // 1.b.
                    {
                        let baseClass = $($codExes[h]).attr('data-cpp-class-r3'),
                            rxBaseClass;

                        codText = codText.replace(baseClass + '\.h', wrapTag(baseClass, classTag, classClass));

                        baseClass = 'A' + baseClass;
                        rxBaseClass = new RegExp(' ' + baseClass + '::', 'g');
                        codText = codText.replace(rxBaseClass, ' ' + wrapTag(baseClass, classTag, classClass) + '::');

                        codText = codText.replace(baseClass + ' : public', ' ' + wrapTag(baseClass, classTag, classClass) + ' : public');

                        codText = codText.replace(baseClass + '()', wrapTag(baseClass, constrTag, classClass) + '()');

                        rxBaseClass = new RegExp('&amp;' + baseClass, 'g');
                        codText = codText.replace(rxBaseClass, '&amp;' + wrapTag(baseClass, classTag, classClass));
                    }

                    //codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-funct-r3', functTag,); // 1.c.
                    // 1.c
                    {
                        let words = $($codExes[h]).attr('data-cpp-funct-r3');
                        if (words) {
                            words = words.split(',');

                            let rx_;
                            for (let j = 0; j < words.length; j++) {
                                rx_ = new RegExp('\\b'+ words[j] + '\\(', 'g');
                                codText = codText.replace(rx_, wrapTag(words[j], functTag,) + '(');
                            }
                        }
                    }


                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-var-r3', varTag, varClass); // 1.d.
                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-var2-r3', var2Tag, var2Class); // 1.e.
                    codText = wrapFromAttr(codText, $codExes[h], 'data-cpp-input-r3', inputTag, inputClass); // 1.f.

                    {
                        codText = wrapComment(codText); // 2.a.
                        codText = addTabForFunction(codText); // 2.b.
                        codText = codText.replace(/\n/g, '\n<br>'); // 2.c.
                    }

                    $codEx[i].innerHTML = codText;

                }
            }
        }

    })();

    $('body').addClass(constructNote);
}
