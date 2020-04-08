function startTour() {
  var tour = introJs();
  tour.setOption('tooltipPosition', 'auto');
  tour.setOption('positionPrecedence', ['left', 'right', 'top', 'bottom']);
  tour.start();
}
