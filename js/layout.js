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

var myLayout = new GoldenLayout(config);
myLayout.registerComponent('testComponent', function (
  container,
  componentState
) {
  lm = container;

  container.on('hide', function () {
    //P is being used so that the when the tab is opened first than a hide event is fired and we need to avoid it
    if (p !== 0) {
      active();

      //Enabling us to preserve the value for the current state
      reditor[active_element].code = reditor[active_element].editor.getValue();
      reditor[active_element].input = input_editor.getValue();
      reditor[active_element].output = output_editor.getValue();

      //Also going to record the output editor value here every time

      //For the file name purpose
      var tempobj = reditor[active_element].container.getState();
      reditor[active_element].container.setState(tempobj);

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
      } catch (errro) {
        console.log('error is' + error);
      }
    }
    p++;
  });

  cs = componentState;
  container.setTitle(`new${edval}.cpp`);

  //For updating the file property

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
    run();

    id = 1;
  } else {
    clearInterval(render);
  }
}, 1000);

var render1 = setInterval(function () {
  if (document.getElementById('input') && id != 2) {
    run1();
    id = 2;
  } else {
    clearInterval(render1);
    id = 0;
  }
}, 1000);

var render2 = setInterval(function () {
  if (document.getElementById('output') && id != 1) {
    run2();

    id = 1;
  } else {
    clearInterval(render);
  }
}, 1000);

//returns the current active element
function active() {
  active_element = myLayout.root.contentItems[0].contentItems[0].getActiveContentItem()
    .config.componentState.id;
}
