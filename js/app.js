$(() => {

  var Game = Game || {};

  $('#start-btn').on('click', function(){
    console.log('clicked');
    $(this).css('display','none');
    $('.first').css('display','none');
    $('h2').css('display','none');
    $('header').css({
      'paddingTop': '40px',
      'height': '100px'
    });
    $('#game-wrapper').css({ display: 'block'});


    let userMove = 0;
    let expectedMove = 0;
    let moveUp;
    let moveDown;
    let moveRight;
    let moveLeft;
    let scoreCounter = 0;


    function movesTimer(){
      window.setInterval(nextMove, 1000);
    }

    function scoreCheck(){
      if (expectedMove === userMove){
        scoreCounter+=100;
        console.log(scoreCounter);
        $('#score').html(scoreCounter);
        $('#arrow').animate({opacity: '1'}, '100');
        $('#arrow').animate({opacity: '0.5'}, '100');
      }else{
        scoreCounter-=100;
        console.log(scoreCounter);
        $('#score').html(scoreCounter);
        $('#arrow').animate({opacity: '1', backgroundColor: 'red'}, '100');
        $('#arrow').animate({opacity: '0.5', backgroundColor: 'lime'}, '100');
      }
    }
    //I want to check which one between moveUp or moveDown or moveLeft or moveRight is defined each interval.
    function nextMove(){
      const move = Math.random();///generates a random number for the computer to choose the next required move;
      if (move < 0.25 ){
        moveUp = move;
        moveDown = undefined;
        moveRight = undefined;
        moveLeft = undefined;
        expectedMove = 38;
      }else if (move > 0.25 && move < 0.5){
        moveDown = move;
        moveUp = undefined;
        moveRight = undefined;
        moveLeft = undefined;
        expectedMove = 40;
      }else if (move > 0.5 && move < 0.75){
        moveRight = move;
        moveDown = undefined;
        moveUp = undefined;
        moveLeft = undefined;
        expectedMove = 39;
      }else{
        moveLeft = move;
        moveDown = undefined;
        moveRight = undefined;
        moveUp = undefined;
        expectedMove = 37;
      }

      //Picks the right arrow image.
      if (moveUp !== undefined){
        // console.log('YoUp!');
        $('#arrow').attr('src','images/arrows/arrow-icon-up.png');
      }else if(moveDown !== undefined){
        // console.log('YoDown!');
        $('#arrow').attr('src','images/arrows/arrow-icon-down.png');
      }else if (moveLeft !== undefined){
        // console.log('yoLeft!');
        $('#arrow').attr('src','images/arrows/arrow-icon-left.png');
      }else if (moveRight !== undefined){
        // console.log('yoRight!');
        $('#arrow').attr('src','images/arrows/arrow-icon-right.png');
      }

    } // nextMove closing
    //collect values of the keys pressed by the user and store them into an array
    $(document).keydown(function(e) {
      userMove = e.which;
      scoreCheck();
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
        default: return; // exit this handler for other keys
      }
      setTimeout(()=>{
        $('.dancer').attr('src','images/char/TumpsDance1.png');
      }, 500);
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    //triggers the moves' timer
    movesTimer();



  });///end of click listener

}); //doc ready closure
