function handleScheduleFormRepeat() {
  var repeats = document.getElementById('inputRepeats');
  var interval = document.getElementsByClassName('js--interval');

  hideIntervalFields(interval);

  repeats.onchange = function(event) {
    if (event.target.value == 0) {
      hideIntervalFields(interval);
    } else {
      showIntervalFields(interval);
    }
  }
}

function hideIntervalFields(fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].style.display = 'none';
  }
}

function showIntervalFields(fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].style.display = 'block';
  }
}
