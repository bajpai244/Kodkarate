function get_language() {
  return document.getElementById('language-select').value;
}

function get_extension() {
  var language = get_language();

  switch (language) {
    case 'C++(GCC 9.2.0)':
      return cplus_extension;
      break;
    case 'Java(OpenJDK 13.0.1)':
      return java_extension;
      break;
    case 'Python(3.8.1)':
      return python_extension;
      break;
    case 'Python(2.7.17)':
      return python_extension;
      break;
    case 'Rust(1.40.0)':
      return rust_extension;
      break;
    case 'TypeScript(3.7.4)':
      return typescript_extension;
      break;
    case 'Prolog(GNU Prolog 1.4.5)':
      return prolog_extension;
      break;
    case 'Php(7.4.1)':
      return php_extension;
      break;
    case 'Assembly(Nasm 2.14.02)':
      return assembly_extension;
      break;
    case 'Bash(5.00)':
      return bash_extension;
      break;

    case 'Common lisp(SBCL 2.0.0)':
      return lisp_extension;
    case 'D(DMD 2.089.1)':
      return d_extension;
      break;
    case 'Elixir(1.9.4)':
      return elixir_extension;
      break;
    case 'Erlang(OTP 22.2)':
      return erlang_extension;
      break;
    case 'Executable':
      return executable_extension;
      break;
    case 'Fortran(9.2.0)':
      return fortran_extension;
      break;
    case 'GO':
      return golang_extension;
      break;
    case 'Haskell(GHC 8.8.1)':
      return haskell_extension;
      break;
    case 'Nodejs(12.14.0)':
      return nodejs_extension;
      break;
    case 'Lua(5.3.5)':
      return lua_extension;
      break;
    case 'OCaml(4.09.0)':
      return ocaml_extension;
      break;
    case 'Octave(5.1.0)':
      return octave_extension;
      break;
    case 'C(GCC 9.2.0)':
      return c_extension;
      break;
  }
}

function change_file_name() {
  active();
  var langauge_copy = get_language();
  var file_name = document.getElementById('file-name').value;
  var extension = get_extension();
  var tempobj = reditor[active_element].container.getState();
  tempobj.filename = file_name + `.${extension}`;
  tempobj.language = langauge_copy;
  reditor[active_element].container.setState(tempobj);
  reditor[active_element].container.setTitle(file_name + `.${extension}`);
}
