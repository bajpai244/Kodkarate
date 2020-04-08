function get_language() {
  var language = document.getElementById('language-select').value;
  switch (language) {
    case 'C++(GCC 9.2.0)':
      return 'c_cpp';
      break;
    case 'Java(OpenJDK 13.0.1)':
      return 'java';
      break;
    case 'Python(3.8.1)':
      return 'python';
      break;
    case 'Python(2.7.17)':
      return 'python';
      break;
    case 'Rust(1.40.0)':
      return 'rust';
      break;
    case 'TypeScript(3.7.4)':
      return 'typescript';
      break;
    case 'Prolog(GNU Prolog 1.4.5)':
      return 'prolog';
      break;
    case 'Php(7.4.1)':
      return 'php';
      break;
    case 'Assembly(Nasm 2.14.02)':
      return 'assembly_x8';
      break;
    case 'Bash(5.00)':
      return 'sh';
      break;

    case 'Common lisp(SBCL 2.0.0)':
      return 'lisp';
    case 'D(DMD 2.089.1)':
      return 'd';
      break;
    case 'Elixir(1.9.4)':
      return 'elixir';
      break;
    case 'Erlang(OTP 22.2)':
      return 'erlang';
      break;
    case 'Executable':
      return 'text'; //Pop
      break;
    case 'Fortran(9.2.0)': //Correct in main html
      return 'fortran';
      break;
    case 'GO':
      return 'golang';
      break;
    case 'Haskell(GHC 8.8.1)':
      return 'haskell';
      break;
    case 'Nodejs(12.14.0)':
      return 'javascript';
      break;
    case 'Lua(5.3.5)':
      return 'lua';
      break;
    case 'OCaml(4.09.0)':
      return 'ocaml';
      break;
    case 'Octave(5.1.0)':
      return 'text'; //pop
      break;
    case 'C(GCC 9.2.0)':
      return 'c_cpp';
      break;
  }
}

function get_mode() {
  var mode = document.getElementById('mode-select').value;
  return mode;
}

function language_change() {
  active();
  var activeelement = active_element;
  language = get_language();

  var promise = new Promise(function (resolve, reject) {
    resetlayout('tab');

    var interval = setInterval(function () {
      if (reditor[activeelement]) {
        clearInterval(interval);
        resolve();
      }
    }, 1);
  }).then(function () {
    var temp_obj = reditor[activeelement].container.getState();
    var name_array = temp_obj.filename.split('.');
    var extension = get_extension();
    temp_obj.filename = `${name_array[0]}.${extension}`;
    temp_obj.language = get_language();
    reditor[activeelement].container.setTitle(temp_obj.filename);
    reditor[activeelement].container.setState(temp_obj);
    reditor[activeelement].editor.setValue(get_snippet());
  });
}

function mode_change() {
  mode = get_mode();
  resetlayout();
}
