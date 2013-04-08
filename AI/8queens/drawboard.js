var drawBoard = function(canvas, board, img) {
  var ctx = canvas.getContext("2d");

  var width = canvas.getAttribute("width") || 1;
  var height = canvas.getAttribute("height") || 1;

  var size = board.length;
  var side = Math.min(width, height) / size;


  for (var i = 0 ; i < size ; i += 1) {
    for (var j = 0 ; j < size ; j += 1) {

      if ( (i+j)%2 == 0){
        ctx.fillStyle = "rgb(255, 255, 240)";
      } else {
        ctx.fillStyle = "rgb(0,0,0)";
      }

      ctx.fillRect(i*side, j*side, side, side); 
    }
  } 
  

  var drawQueenCircle = function(x, y, r) {
    r = r || side*0.38;

    ctx.fillStyle = "rgb(40, 40, 200)";
    ctx.beginPath();
    ctx.arc(x, y, r , 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
  };

  var drawQueenImg = function(x, y, r) {
    r = r || side*0.38;
    ctx.drawImage (img, x, y, r*2, r*2);
  };

  var drawQueen;
  if (img) {
    drawQueen = drawQueenImg;
  } else {
    drawQueen = drawQueenCircle;
  }

  for (var i = 0 ; i < size ; i += 1) {
    j = board[i];
    drawQueen((i+0.5) * side, (board[i]+0.5) * side)
  }
  

  

}; // end drawBoard()