{
  let constructNote = 'ar3-12-weeks-counter-1_done';
  let isConstructed = $('body').hasClass(constructNote);

  (function() {
    let $target12 = $('.twelve-weeks-ar3'); // class name to set
    let date0 = $target12.attr('data-date-0'); // start date attribute to set

    if (!isConstructed) {

      function countDate(dayAddition = 1, startDate = date0) {
        let dateStart = new Date(startDate);
        let dateEnd = dateStart.setDate(dateStart.getDate() + dayAddition);
        dateEnd = new Date(dateEnd);
        return dateEnd;
      }

      function build12WeeksBoxTable(startDate) {
        $target12.append(
          '<table class="blank-2-r3">\n' +
            ' <tbody class="r3-build-box-here">\n' +
            ' </tbody>\n' +
          '</table>'
        );

        let $boxTarget = $target12.find('.r3-build-box-here');

        for (let i = 0; i < 7; i++) {
          $boxTarget.append('<tr>');
        }

        for (let i = 0; i < 84; i++) {
          let lineCount = i % 7;
          $theTarget = $boxTarget.find('tr:nth-of-type(' + (lineCount + 1) + ')');

          let theDate = countDate(i);

          let boxColor = '';
          let dayDifference = Date.now() - theDate;

          if (dayDifference < 0) {
            boxColor = '';
          } else {
            if (dayDifference < (24*60*60*1000)) {
              boxColor = 'style="background-color: yellow;"';
            } else {
              boxColor = 'style="background-color: red;"';
            }
          }

          $theTarget.append(
            '<td>\n'+
            ' <div class="r3-box" '+ boxColor +' title="'+ theDate.toDateString() +'">\n'+
            ' </div>\n'+
            '</td>'
          );
        }

        $target12.prepend(
          '<div style="font-size:12px">mulai tanggal <b>'+ new Date(date0).toDateString() +'</b></div>\n'
        );

        let wakeHoursBeforeDeadline = (countDate(84) - Date.now())/(1000*60*60*(24/(24-8)));
        $target12.append(
          '<div style="font-size:12px">\n'+
            'DATELINE-nya TANGGAL <b>'+ countDate(84).toDateString() +'</b>!! <big>😠</big>\n'+
          '</div>\n'+
          '<div style="font-size:12px" class="red-r3">\n'+
            '<br><b>SISA WAKTU TINGGAL ' + wakeHoursBeforeDeadline.toFixed(0) + ' JAM LAGI!!!</b><big><big>😠</big></big>\n'+
          '</div>\n'
        );

      }

      build12WeeksBoxTable(date0);

      $('head').append(
        '<style>' +

          'table.blank-2-r3 td{\n'+
            'padding: 3px;\n'+
          '}\n'+

          '.r3-build-box-here .r3-box {\n'+
            ' height: 10px;\n'+
            ' width: 10px;\n'+
            ' background-color: #7bc96f;\n'+
            ' cursor: pointer;\n'+
            ' border: grey thin solid \n'+
          '}\n' +
        '</style>'
      );

    }
  })();

  $('body').addClass(constructNote);
}
