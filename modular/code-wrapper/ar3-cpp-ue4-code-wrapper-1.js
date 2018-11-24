/*###############################
// ar3-cpp-ue4-code-wrapper-1.js  #
###############################*/
/*--------------------------
https://arza-3d.github.io/ar3.js/

<script src="https://raw.githack.com/Arza-3d/ar3.js/modular/code-wrapper/ar3-cpp-ue4-code-wrapper-1.js"></script>
--------------------------*/

{
    const constructNote = 'r3-cpp-ue4-code-wrapper_done',
          isConstructed = $('body').hasClass(constructNote);

    (function(){
        const $codEx = $('.cpp-codex-r3');
        if ($codEx.length > 0) {

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
                        let rexComment = new RegExp(comments[i], 'g');
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
                    console.log(arrText);

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

            for (let i = 0; i < $codEx.length; i++) {

                let codText = $codEx[i].innerHTML;

                {
                    codText = codText.replace(/\>/g, '&gt;');
                    codText = codText.replace(/\</g, '&lt;');
                }

                {
                    let baseClass = $($codEx[i]).attr('data-cpp-class-r3'),
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

                codText = wrapFromAttr(codText, $codEx[i], 'data-cpp-funct-r3', functTag,);
                codText = wrapFromAttr(codText, $codEx[i], 'data-cpp-var-r3', varTag, varClass);
                codText = wrapFromAttr(codText, $codEx[i], 'data-cpp-var2-r3', var2Tag, var2Class);
                codText = wrapFromAttr(codText, $codEx[i], 'data-cpp-input-r3', inputTag, inputClass);

                {
                    codText = wrapComment(codText);
                    codText = addTabForFunction(codText);
                    codText = codText.replace(/\n/g, '\n<br>');
                }

                $codEx[i].innerHTML = codText;

            }
        }
    })();

    $('body').addClass(constructNote);
}
