

  /*ex
    import * as myModule from '/modules/my-module.js';
    myModule.doAllTheAmazingThings();

    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
  */
  let module_1 = (window.location.href.indexOf('localhost') > -1) ? '/ar3js/modular/module/ar3-module-1.js' : 'ar3-module-1.js';
  console.log(typeof module_1);

  /*
  import {sum2Arrays} from module_1;
  import * as myModule from module_1;
  */
  /*################
  NOTE: I am not using module,
  because:
    1. can't be tested offline, should use local server
    2. link of localhost and the online one of the module should be different
    3. can't change the 'module_1' / module address into variable that contains string....
    4. I hope they fix this in the future
  *///################

  import {sum2Arrays} from '/ar3js/modular/module/ar3-module-1.js';
  import * as myModule from '/ar3js/modular/module/ar3-module-1.js';
  //alert(0);
  console.log(myModule.ArrX);
  console.log(myModule.cepot);
  console.log(sum2Arrays);

  alert(window.location.href);
  alert(1);
