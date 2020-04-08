var input_reference = document.getElementById('file-name');
var confir_filename = 0;
var should_hide_work = 0;
var intial_input = '';
var reditor_copy = {};
var ch;

var edval = 0;
var input_value_zero = 0;
var output_value_zero = 0;
var input_editor_first_time_intializer = '';
var output_editor_first_time_intializer = '';

const c_extension = 'c';
const cplus_extension = 'cpp';
const python_extension = 'py';
const java_extension = 'java';
const rust_extension = 'rs';
const typescript_extension = 'ts';
const prolog_extension = 'pl';
const php_extension = 'php';
const assembly_extension = 'asm';
const bash_extension = 'sh';
const lisp_extension = 'lisp';
const d_extension = 'd';
const elixir_extension = 'ex';
const erlang_extension = 'erl';
const executable_extension = 'exe';
const fortran_extension = 'f';
const golang_extension = 'go';
const haskell_extension = 'hs';
const nodejs_extension = 'js';
const lua_extension = 'lua';
const ocaml_extension = 'ml';
const octave_extension = 'm';

var mode = get_mode();
var reditor = {};
var language = get_language();
var input_editor = null;
var output_editor;

var active_element;
var output_container;
var p = 0;
var cs;
var lm;
var id;

function input_editor_initialize() {
  ace.require('ace/ext/language_tools');
  var editor = ace.edit(`input`);
  editor.setTheme(`ace/theme/${mode}`);
  editor.session.setMode('ace/mode/text');
  editor.commands.addCommand({
    name: 'myCommand',
    bindKey: { win: 'f9', mac: 'f9' },
    exec: function (editor) {
      main_engine();
    },
    readOnly: true, // false if this command should not apply in readOnly mode
  });

  input_editor = editor;
  if (input_value_zero == 0) {
    var interval = setInterval(() => {
      if (input_editor_first_time_intializer != '') {
        input_editor.setValue('');

        clearInterval(interval);
      }
    }, 1);
  }
  input_value_zero += 1;
  input_editor_first_time_intializer = input_editor.getValue();
}

function run(tab_arguments = '') {
  ace.require('ace/ext/language_tools');
  var editor = ace.edit(`editor${edval}`);
  editor.setTheme(`ace/theme/${mode}`);
  editor.session.setMode(`ace/mode/${language}`);
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
  });
  console.log(lm.tab.isActive);
  editor.commands.addCommand({
    name: 'myCommand',
    bindKey: { win: 'f9', mac: 'f9' },
    exec: function (editor) {
      main_engine();
    },
    readOnly: true, // false if this command should not apply in readOnly mode
  });

  reditor[`editor${edval}`] = { editor: editor };
  reditor[`editor${edval}`].code = '';
  reditor[`editor${edval}`].tab = lm.tab;
  reditor[`editor${edval}`].container = lm;
  reditor[`editor${edval}`].language = null;
  reditor[`editor${edval}`].input = '';
  reditor[`editor${edval}`].output = '';

  try {
    var temp_obj_recorder = reditor_copy[`editor${edval}`].container.getState();
    lm.setState(temp_obj_recorder);
    lm.setTitle(temp_obj_recorder.filename);
    console.log('i was executed ' + edval);

    if (tab_arguments !== 'tab') {
      var local_tab = document.getElementById('language-select');
      local_tab.value = temp_obj_recorder.language;
      input_reference.value = temp_obj_recorder.filename.split('.')[0];
    }
  } catch (error) {
    lm.setTitle(`new${edval}.cpp`);
    var language_temp = get_language();
    var temp_obj_recorder = lm.getState();
    temp_obj_recorder.filename = `new${edval}.cpp`;
    temp_obj_recorder.language = language_temp;
    lm.setState(temp_obj_recorder);
    var local_tab = document.getElementById('language-select');
    local_tab.value = 'C++(GCC 9.2.0)';
  }
  editor.setValue(get_snippet());
  edval = edval + 1;
  active();
}

function run1() {
  input_editor_initialize();
}

function run2() {
  ace.require('ace/ext/language_tools');
  var editor = ace.edit('output');
  editor.setTheme(`ace/theme/${mode}`);
  editor.session.setMode('ace/mode/text');
  output_editor = editor;
  editor.setOptions({
    readOnly: true,
    autoScrollEditorIntoView: true,
  });
  editor.commands.addCommand({
    name: 'myCommand',
    bindKey: { win: 'f9', mac: 'f9' },
    exec: function (editor) {
      main_engine();
    },
    readOnly: true, // false if this command should not apply in readOnly mode
  });
  output_editor_first_time_intializer = output_editor.getValue();
  if (output_value_zero == 0) {
    var interval = setInterval(() => {
      if (output_editor_first_time_intializer != '') {
        output_editor.setValue('');
        clearInterval(interval);
      }
    }, 1);
  }
  output_value_zero += 1;
}
