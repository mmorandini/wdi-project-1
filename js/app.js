var Game = Game || {};

let userMove      = 0;
let expectedMove  = 0;
// let scoreCounter  = 0;
const arrows      = [];

let $body;
let $gameFooter;
let $start;
let $landing;
let $h1;
let $h2;
let $header;
let $wrapper;
let $score;
let $activeArrow;
let timeLeft = 30;
let actionInterval;
let timerInterval;

const upSrc       = 'images/arrows/arrow-icon-up.png';
const downSrc     = 'images/arrows/arrow-icon-down.png';
const leftSrc     = 'images/arrows/arrow-icon-left.png';
const rightSrc    = 'images/arrows/arrow-icon-right.png';

$(init);

function init() {
  $body       = $('body');
  $gameFooter = $('.game-footer');
  $start      = $('#start-btn');
  $landing    = $('.first');
  $h1         = $('h1');
  $h2         = $('h2');
  $header     = $('header');
  $wrapper    = $('#game-wrapper');
  $score      = $('#score');
  $start.on('click', start);
}



function start(){
  clearInterval(timerInterval);
  clearInterval(actionInterval);
  $(this).css('display','none');
  $landing.css('display','none');
  $h2.css('display','none');
  $header.addClass('game');
  $h1.css('color','white');
  $body.css('backgroundColor','tomato');
  $wrapper.css({ display: 'block'});
  $gameFooter.css('display','block');
  $('#gameOver').css('display', 'none');

  $('.arrow').remove();
  timeLeft = 30;

  timerInterval = setInterval(timer, 1000);

  function timer(){
    if (timeLeft > 0){
      timeLeft -= 1;
      $('#score').text(timeLeft);
    } else {
    $gameFooter.css('display','none');
    $('#gameOver').css('display', 'block');
    clearInterval(actionInterval);
    clearInterval(timerInterval);
    $('#reset-btn').on('click', start);
    }
  }

  document.getElementById('audio').play();

  $(document).on('keydown', userMoves);

  movesTimer();

}

function userMoves(e) {
  userMove = e.which;

  switch(e.which) {
    case 37: // left
      $('.dancer').attr('src','images/char/TumpsDance11.png');
      break;
    case 38: // up
      $('.dancer').attr('src','images/char/TumpsDance20.png');
      break;
    case 39: // right
      $('.dancer').attr('src','images/char/TumpsDance10.png');
      break;
    case 40: // down
      $('.dancer').attr('src','images/char/TumpsDance14.png');
      break;
    case 32: // space
      $('.dancer').attr('src','images/char/Punte.png');
      break;
    default: return; // exit this handler for other keys
  }
  setTimeout(()=>{
    $('.dancer').attr('src','images/char/TumpsDance1.png');
  }, 500);
  pickColor();
  scoreCheck(userMove);

  e.preventDefault(); // prevent the default action (scroll / move caret)
}

function movesTimer(){
  actionInterval = setInterval(nextMove, 600);
}

function nextMove(){
  // generates a random number for the computer to choose the next required move;
  const random = Math.random();
  if (random < 0.225 ){
    createArrow('up');
  } else if (random > 0.225 && random < 0.45){
    createArrow('down');
  } else if (random > 0.45 && random < 0.675){
    createArrow('right');
  } else if (random > 0.675 && random < 0.9){
    createArrow('left');
  } else {
    createArrow('space');
  }

}

function createArrow(direction){
  const $img = $('<img>');

  switch (direction) {
    case 'up':
      $img.attr('src', upSrc);
      $img.attr('data', '38');
      break;
    case 'left':
      $img.attr('src',leftSrc);
      $img.attr('data', '37');
      break;
    case 'down':
      $img.attr('src',downSrc);
      $img.attr('data', '40');
      break;
    case 'right':
      $img.attr('src',rightSrc);
      $img.attr('data', '39');
      break;
    case 'space':
      $img.attr('src', 'images/arrows/dickpic.png' );
      $img.attr('data', '32');
      break;
    default: return;
  }

  arrows.push($img);
  $gameFooter.append($img);
  $img.addClass('arrow');
  $img.animate({
    left: `${$gameFooter.width() + $img.width()}px`
  }, {
    duration: 15000,
    easing: 'linear',
    step: activateButtons,
    complete: removeAnimations
  });
}

function removeAnimations() {
  $(this).remove();
  arrows.shift();
}

function activateButtons() {
  const elemLeft = $(this).offset().left;
  if (elemLeft > (($gameFooter.width()/2)-100) && elemLeft < (($gameFooter.width()/2)+100)) {
    $activeArrow = $(this);
  } else if (elemLeft > ($gameFooter.width()*0.45) ) {
    $activeArrow = undefined;
  }
}

function scoreCheck(userMove){
  if ($activeArrow === undefined) return;

  expectedMove = (parseFloat($activeArrow.attr('data')));

  if (timeLeft > 0){
    if (expectedMove === userMove){
    timeLeft += 3;
    $score.html(timeLeft);
    $activeArrow.addClass('hit');
    } else if (expectedMove !== userMove || userMove === 0){
      if (timeLeft >= 10){
        timeLeft -= 10;
        $score.html(timeLeft);
        $activeArrow.addClass('fail');
      } else {
        timeLeft -= timeLeft;
        $score.html(timeLeft);
        $activeArrow.addClass('fail');
      }
    
    }
  } else return;
  
}


function pickColor(){
  const colors    = ['red', 'green', 'blue', 'yellow', 'white', 'cyan', 'orange', 'purple', 'brown', 'pink', 'lime', 'teal'];
  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  while ($wrapper.css('backgroundColor') === randomColor) {
    randomColor = colors[Math.floor(Math.random() * colors.length)];
  }
  $wrapper.css('backgroundColor', randomColor);
}
