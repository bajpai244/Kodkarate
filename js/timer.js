var a = 0;
var b = 0;
var c = 0;
var d = 0;
var e = 0;
var f = 0;
var id;
var set;
var timer = document.getElementById('timer-value');
timer.innerText = `${a}${b}:${c}${d}:${e}${f}`;

function start() {
  document.getElementById('play').outerHTML = `<img
    title="start timer"
    title="pause"
    src="./img/pause.png"
    id="pause"
    alt=""
    class="clickable"
    onclick="pause()"
  />`;
  id = 'pause';
  set = setInterval(() => {
    if (f == 9) {
      f = 0;
      if (e == 5) {
        e = 0;
        if (d == 9) {
          d = 0;
          if (c == 5) {
            c = 0;
            if (b == 9) {
              b = 0;
              a++;
            } else {
              b++;
            }
          } else {
            c++;
          }
        } else {
          d++;
        }
      } else {
        e += 1;
      }
    } else {
      f = f + 1;
    }
    timer.innerText = `${a}${b}:${c}${d}:${e}${f}`;
  }, 1000);
}

function pause() {
  document.getElementById('pause').outerHTML = `<img
    title="start timer"
    title="start"
    src="./img/playwhite.jpg"
    id="play"
    alt=""
    class="clickable"
    onclick="start()"
  />`;
  clearInterval(set);
}

function reset() {
  clearInterval(set);
  a = 0;
  b = 0;
  c = 0;
  d = 0;
  e = 0;
  f = 0;
  timer.innerText = `${a}${b}:${c}${d}:${e}${f}`;
  if (id == 'pause') {
    document.getElementById('pause').outerHTML = `<img
    title="start timer"
    title="start"
    src="./img/playwhite.jpg"
    id="play"
    alt=""
    class="clickable"
    onclick="start()"
  />`;
  }
}
