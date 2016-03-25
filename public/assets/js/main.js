function handleScheduleFormRepeat() {
  var repeats = document.getElementById('inputRepeats');
  changeIntervalFields(repeats.value);

  repeats.onchange = function(event) {
    changeIntervalFields(event.target.value);
  }
}

function changeIntervalFields(value) {
  var interval = document.getElementsByClassName('js--interval');

  if (value == 0) {
    for (var i = 0; i < interval.length; i++) {
      interval[i].style.display = 'none';
    }
  } else {
    for (var i = 0; i < interval.length; i++) {
     interval[i].style.display = 'block';
    } 
  }
}
