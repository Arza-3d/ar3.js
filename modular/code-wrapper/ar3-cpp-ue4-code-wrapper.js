{
    const constructNote = 'r3-short-code_done',
          isConstructed = $('body').hasClass(constructNote);

    {
        // 1.
        const $codEx = $('.cpp-codex-r3');
        if ($codEx.length > 0) {

            // stylesheet
            const classTag = 'var',
                  classClass = 'blue-r3';


            for (let i = 0; i < $codEx.length; i++) {

                let codText = $codEx[i].html();

                // 2.
                let baseClass = $codEx[i].attr('cpp-class-r3');
                codText.replace(baseClass + '.h', '<'+ classTag +' class="'+ classClass +'">' + baseClass + '</'+ classTag +'>.h');
                baseClass = 'A' + baseClass;

                rxBaseClass = new RegExp( '\\w' + baseClass, 'g');
                codText.replace(rxBaseClass, '<'+ classTag +' class="'+ classClass +'">' + baseClass + '</'+ classTag +'>');

                codText.replace('::' + baseClass, '::A<'+ classTag +' class="'+ classClass +'">' + baseClass + '</'+ classTag +'>');




            }
        }
    }

    $('body').addClass(constructNote);
}
