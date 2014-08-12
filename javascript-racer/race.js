var length = 30;
var racerOne = "#player1_strip .active";
var racerTwo = "#player2_strip .active";
var won = false;
var button = document.getElementById('restart');



var buildTrack = function(length) {
  trackOne = document.getElementById('player1_strip')
  trackTwo = document.getElementById('player2_strip')

  for (var i=0; i < length; i++) {
    trackOne.innerHTML += "<td></td>"
    trackTwo.innerHTML += "<td></td>"
  }
  trackOne.innerHTML += "<td class='finish'>|</td>"
  trackTwo.innerHTML += "<td class='finish'>|</td>"
};

var findRacer = function(racerX) {
  return document.querySelector(racerX);
};

var declareWinner = function(name) {
  if (name === racerOne) {
    var winner = "Racer One wins!!!!";
  } else if (name === racerTwo) {
    var winner = "Racer Two wins!!!";
  }
  won = true;
  document.getElementById('podium').innerHTML = winner;
  document.getElementById('turtle').innerHTML = "<img src='lil_flag_guy.gif' />"
}

var moveRacer = function(racer) {
  var currentPosition = findRacer(racer);
  var nextPosition = document.querySelector(racer + "+ td");
  if (won) {
    return
  } else if (nextPosition.classList.contains('finish')) {
    declareWinner(racer);
  } else {
    currentPosition.classList.toggle('active');
    nextPosition.classList.toggle('active');
  }
};

var keyUpChooseRacer = function(e) {
  var keyCode = e.keyCode;
  if (keyCode === 81) {
    moveRacer(racerOne);
  } else if (keyCode === 80) {
    moveRacer(racerTwo);
  }
};

var gameReset = function() {
  won = false;
  document.getElementById('podium').innerHTML = "";
  document.getElementById('turtle').innerHTML = "";
  var racerOnePosition = findRacer(racerOne);
  var racerTwoPosition = findRacer(racerTwo);

  racerOnePosition.classList.toggle('active')
  document.getElementById('start-one').classList.toggle('active');
  racerTwoPosition.classList.toggle('active')
  document.getElementById('start-two').classList.toggle('active');
};

button.addEventListener("click", gameReset);
document.addEventListener("keyup", keyUpChooseRacer, false);

buildTrack(length);
