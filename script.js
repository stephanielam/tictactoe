$(function() {
  // CONSTANTS //
  var WIN = [[1,2,3], [4,5,6], [7,8,9],
            [1,4,7], [2,5,8], [3,6,9],
            [1,5,9], [3,5,7]]

  // SET UP //
  updateScore(0,0);
  $('#gameover').addClass("hidden");
  var turn = 'player-1';
  var score1 = 0;
  var score2 = 0;
  var pos = [[], []];
  var theme = 'hockey'

  function gameOver(){
    if (tictactoe(0)) {
      $('#result').html("Player 1 wins");
      score1 += 1;
      updateScore(score1, score2);
      return true;
    } else if (tictactoe(1)) {
      $('#result').html("Player 2 wins");
      score2 += 1;
      updateScore(score1, score2);
      return true;
    } else if (pos[0].length+pos[1].length == 9) {
      $('#result').html("Tie game");
      return true;
    } else {
      return false;
    }
  }

  function tictactoe(player){
    for (i = 0; i < WIN.length; i++) {
      debugger
      if (isInArray(WIN[i][0], pos[player])
        && isInArray(WIN[i][1], pos[player])
        && isInArray(WIN[i][2], pos[player])
      ) {
        return true;
      }
    }
    return false;
  }

  function playTurn(){
    if (gameOver()){
      $('#gameover').removeClass("hidden");
    } else {
      switchTurns();
    }
  }

  function switchTurns(){
    if (turn == 'player-1'){
      turn = 'player-2';
    } else {
      turn = 'player-1';
    }
  }

  function updateScore(x, y){
    $('#score-1').html(x);
    $('#score-2').html(y);
  }

  function isInArray(value, array) {
    return array.indexOf(parseInt(value)) > -1;
  }

  $('.square').on("click", function (e) {
    if (!(isInArray(this.id, pos[0])) && (!(isInArray(this.id, pos[1])))) {
      (turn == 'player-1') ? pos[0].push(parseInt(this.id)) : pos[1].push(parseInt(this.id))
      $(this).addClass(turn);

      var elem = document.createElement("img");
      elem.src = (turn == 'player-1') ? 'images/'+theme+'/X.png' : 'images/'+theme+'/O.png';
      document.getElementById(this.id).appendChild(elem);
      playTurn();
    }
  });

  $('#restart').on("click", function (e) {
    $('.square').removeClass('player-1').removeClass('player-2');
    $('.square').empty();
    pos = [[], []]
    $('#gameover').addClass("hidden");
  });

// $(".square").hover(function(){
//     if (false){
//       // $(this).css("background-color", "pink");
//       // $(this).html(turn);
//     } else {
//       // $(this).css("background-color", "");
//       // $(this).html(turn);
//     }
//     }, function(){
//     // $(this).css("background-color", "#5EE65E");
//     $(this).html("");
// });
})


