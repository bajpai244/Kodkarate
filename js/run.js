function deappend_it() {
  var element = document.getElementById('rotating_circle');
  element.outerHTML = `     <button
    data-step="6"
    data-intro="Run code from here"
    title="run code"
    class="button large"
    id="run_button"
    onclick="main_engine()";
    >
    Run (F9)
  </button>`;
}
function append_it() {
  var element = document.getElementById('run_button');
  element.outerHTML = `<div id="rotating_circle" class="circle-wrapper">
<div class="circle-wrapper__circle"></div>

<div class="circle-wrapper__content">

</div>
</div>`;
}

function gt_code() {
  active();
  return reditor[active_element].editor.getValue();
}

function language_code_id() {
  var language = get_language();
  switch (language) {
    case 'C++(GCC 9.2.0)':
      return 54;
      break;
    case 'Java(OpenJDK 13.0.1)':
      return 62;
      break;
    case 'Python(3.8.1)':
      return 71;
      break;
    case 'Python(2.7.17)':
      return 70;
      break;
    case 'Rust(1.40.0)':
      return 73;
      break;
    case 'TypeScript(3.7.4)':
      return 74;
      break;
    case 'Prolog(GNU Prolog 1.4.5)':
      return 69;
      break;
    case 'Php(7.4.1)':
      return 68;
      break;
    case 'Assembly(Nasm 2.14.02)':
      return 45;
      break;
    case 'Bash(5.00)':
      return 46;
      break;

    case 'Common lisp(SBCL 2.0.0)':
      return 55;
    case 'D(DMD 2.089.1)':
      return 56;
      break;
    case 'Elixir(1.9.4)':
      return 57;
      break;
    case 'Erlang(OTP 22.2)':
      return 58;
      break;
    case 'Executable':
      return 44;
      break;
    case 'Fortran(9.2.0)':
      return 59;
      break;
    case 'GO':
      return 60;
      break;
    case 'Haskell(GHC 8.8.1)':
      return 61;
      break;
    case 'Nodejs(12.14.0)':
      return 63;
      break;
    case 'Lua(5.3.5)':
      return 64;
      break;
    case 'OCaml(4.09.0)':
      return 65;
      break;
    case 'Octave(5.1.0)':
      return 66;
      break;
    case 'C(GCC 9.2.0)':
      return 50;
      break;
  }
}

var url;

function run_engine1(a) {
  var token = a;
  fetch(
    `https://api.judge0.com/submissions/${token}?base64_encoded=true&fields=stdout,stderr,status_id,language_id,compile_output`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        AUTHENTICATION: 'X-Auth-Token',
        AUTHORIZATION: 'X-Auth-User',
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      if (json.compile_output) {
        console.log(Base64.decode(json.compile_output));
        output_editor.setValue(`${Base64.decode(json.compile_output)}`);
        deappend_it();
      }

      if (json.stderr) {
        console.log(Base64.decode(json.stderr));
        output_editor.setValue(`${Base64.decode(json.stderr)}`);
        deappend_it();
      }
      if (json.stdout) {
        output_editor.setValue(`${Base64.decode(json.stdout)}`);
        console.log(Base64.decode(json.stdout));
        deappend_it();
      }
      if (json.compile_output && json.stdout) {
        output_editor.setValue(
          `${Base64.decode(json.compile_output)}\n \n ${Base64.decode(
            json.stdout
          )} `
        );
        deappend_it();
      }

      if (json.status_id == 2) {
        run_engine1(url);
      }
      if (json.status_id == 1) {
        run_engine1(url);
      }
    });
}

function main_engine() {
  //To ensure that code is not empty use of regex
  if (gt_code().replace(/\s/g, '').length == 0) {
    alert('The code is empty');
    return 1;
  }
  append_it();
  try {
    var input = input_editor.getValue();
  } catch {}
  try {
    var code = Base64.encode(gt_code());
  } catch {}

  fetch('https://api.judge0.com/submissions/?base64_encoded=true&wait=false', {
    method: 'POST',
    body: JSON.stringify({
      source_code: code,
      language_id: language_code_id(),
      stdin: Base64.encode(input),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      AUTHENTICATION: 'X-Auth-Token',
      AUTHORIZATION: 'X-Auth-User',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.token);
      var a = json.token;
      url = a;
      fetch(
        `https://api.judge0.com/submissions/${a}?base64_encoded=true&fields=stdout,stderr,status_id,language_id,compile_output`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            AUTHENTICATION: 'X-Auth-Token',
            AUTHORIZATION: 'X-Auth-User',
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.stdout) {
            output_editor.setValue(`${Base64.decode(json.stdout)}`);
            console.log(Base64.decode(json.stdout));
            deappend_it();
          }

          if (json.compile_output) {
            console.log(Base64.decode(json.compile_output));
            output_editor.setValue(`${Base64.decode(json.compile_output)}`);
            deappend_it();
          }
          if (json.stderr) {
            console.log(Base64.decode(json.stderr));
            output_editor.setValue(`${Base64.decode(json.stderr)}`);
            deappend_it();
          }

          if (json.compile_output && json.stdout) {
            output_editor.setValue(
              `${Base64.decode(json.compile_output)}\n \n ${Base64.decode(
                json.stdout
              )} `
            );
            deappend_it();
          }
          if (json.status_id == 2) {
            run_engine1(url);
          }
          if (json.status_id == 1) {
            run_engine1(url);
          }
        });
    });
}

Mousetrap.bind('f9', function (e) {
  main_engine();
});
