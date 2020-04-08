var ide_tour_maker = 0;
var ide_tour_time = 0;

function ide_blink() {
  var interval = setInterval(function () {
    if (ide_tour_time != 10) {
      if ((ide_tour_maker = 0)) {
        $('#ide_tour').animate(
          {
            opacity: 0.5,
          },
          500,
          function () {}
        );
        ide_tour_maker = 1;
        ide_tour_time++;
      } else {
        $('#ide_tour').animate(
          {
            opacity: 1,
          },
          500,
          function () {}
        );
        ide_tour_maker = 0;
        ide_tour_time++;
      }
    } else {
      clearInterval(interval);
    }
  }, 600);
}

ide_blink();
