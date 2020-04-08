function resetlayout(tab_argument = '') {
  active();
  var local_lopper;

  reditor[active_element].code = reditor[active_element].editor.getValue();
  reditor[active_element].input = input_editor.getValue();
  reditor[active_element].output = output_editor.getValue();

  myLayout = null;

  reditor_copy = reditor;

  var edval_copy = edval;

  input_value_zero = 0;
  output_value_zero = 0;
  input_editor_first_time_intializer = '';
  output_editor_first_time_intializer = '';

  edval = 0;

  reditor = {};
  p = 0;
  var reseter = document.getElementsByClassName(
    'lm_goldenlayout lm_item lm_root'
  );
  reseter[0].parentNode.removeChild(reseter[0]);

  var config = {
    settings: {
      showPopoutIcon: false,
      reorderEnabled: false,
    },
    content: [
      {
        type: 'row',
        content: [
          {
            type: 'component',
            componentName: 'testComponent',
            id: 'row1',
            isClosable: false,
            componentState: {
              readOnly: false,
              id: `editor${edval}`,
              filename: '',
              language: '',
            },
          },
          {
            type: 'column',
            content: [
              {
                type: 'component',
                componentName: `input`,
                componentState: { label: edval, id: 'input' },

                isClosable: false,
                componentState: {
                  readOnly: false,
                },
              },

              {
                type: 'component',
                componentName: `output`,

                componentState: { label: edval, id: 'output' },

                isClosable: false,
                componentState: {
                  readOnly: true,
                },
              },
            ],
          },
        ],
      },
    ],
  };
  myLayout = new GoldenLayout(config);
  myLayout.registerComponent('testComponent', function (
    container,
    componentState
  ) {
    lm = container;

    container.on('hide', function () {
      if (p !== 0) {
        active();
        reditor[active_element].code = reditor[
          active_element
        ].editor.getValue();
        reditor[active_element].input = input_editor.getValue();
        reditor[active_element].output = output_editor.getValue();
      }
      try {
        active();
        var local_active_element = active_element;
        var interval = setInterval(function () {
          active();
          if (local_active_element !== active_element) {
            var local_tab = document.getElementById('language-select');

            local_tab.value = reditor[
              active_element
            ].container.getState().language;

            input_reference.value = reditor[active_element].container
              .getState()
              .filename.split('.')[0];
            try {
              input_editor.setValue(reditor[active_element].input);
              output_editor.setValue(reditor[active_element].output);
            } catch {}

            clearInterval(interval);
          }
        }, 1);
      } catch (error) {
        console.log('error is' + error);
      }
      p++;
    });

    container.on('destroy', function () {});
    cs = componentState;

    container.getElement().html(`
        <pre style="  margin: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;"  id="editor${edval}">
    function foo(items) {
        var i;
        for (i = 0; i &lt; items.length; i++) {
            alert("Ace Rocks " + items[i]);    }}</pre>`);
  });
  myLayout.registerComponent('input', function (container, componentState) {
    container.getElement().html(`
        <p id="input">
    function foo(items) {
        var i;
        for (i = 0; i &lt; items.length; i++) {
            alert("Ace Rocks " + items[i]);    }}</p>`);
  });

  myLayout.registerComponent('output', function (container, componentState) {
    output_container = container;
    container.getElement().html(`
        <p id="output">
    function foo(items) {
        var i;
        for (i = 0; i &lt; items.length; i++) {
            alert("Ace Rocks " + items[i]);    }}</p>`);
  });

  myLayout.init();
  var render = setInterval(function () {
    if (document.getElementById(`editor${edval}`) && id != 1) {
      run(tab_argument);
      id = 1;
    } else {
      clearInterval(render);
    }
  }, 2);
  window.myLayout = myLayout;

  var render1 = setInterval(function () {
    if (document.getElementById('input') && id != 2) {
      run1();
      id = 2;
    } else {
      clearInterval(render1);
      id = 0;
    }
  }, 1);

  var render2 = setInterval(function () {
    if (document.getElementById('output') && id != 3) {
      run2();

      id = 3;
    } else {
      clearInterval(render2);
    }
  }, 1);
  var newPromise = new Promise(function (resolve, reject) {
    var interval = setInterval(function () {
      if (edval == 1) {
        clearInterval(interval);
        resolve('edval is now 1');
      }
    }, 1);
  });

  newPromise.then(function (message) {
    var i;
    for (i = 1; i < edval_copy; i++) {
      createtab(tab_argument);
    }
  });

  var edvalue_promise = new Promise(function (resolve, reject) {
    var interval = setInterval(function () {
      if (edval == edval_copy) {
        clearInterval();
        resolve();
      }
    }, 1);
  }).then(function () {
    var i;
    for (i = 0; i < edval; i++) {
      reditor[`editor${i}`].editor.setValue(reditor_copy[`editor${i}`].code);
      reditor[`editor${i}`].code = reditor_copy[`editor${i}`].code;
      reditor[`editor${i}`].input = reditor_copy[`editor${i}`].input;
      reditor[`editor${i}`].output = reditor_copy[`editor${i}`].output;
    }
  });
}

function createtab(tab_argument = '') {
  var newItemConfig = {
    type: 'component',
    componentName: 'testComponent',
    isClosable: true,
    componentState: {
      readOnly: false,
      id: `editor${edval}`,
    },
  };
  ch = myLayout.root.contentItems[0].contentItems[0].addChild(newItemConfig);
  run(tab_argument);

  should_hide_work = 0;
}

function newtab() {
  var newItemConfig = {
    type: 'component',
    componentName: 'testComponent',
    isClosable: true,
    componentState: {
      readOnly: false,
      id: `editor${edval}`,
    },
  };
  ch = myLayout.root.contentItems[0].contentItems[0].addChild(newItemConfig);
  document.getElementById('language-select').value = 'C++(GCC 9.2.0)';
  run();
  should_hide_work = 1;
}
