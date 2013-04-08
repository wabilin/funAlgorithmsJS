var eightQueens = {};

eightQueens.evaluate = function(size) {
  var board = new Array(size);
  var column_reg_table = new Array(size);

  var putOn = function(row, col) {
    board[row] = col;
    column_reg_table[col] = true;
  };

  var omit = function(row, col) {
    board[row] = null;
    column_reg_table[col] = false;
  };

  var columnConflict = function(col) {
    return column_reg_table[col] === true;
  };

  var slantedConflict = function(row, col) {
    var check = function(row, col, r, c) {
      while (row >= 0 && col >= 0 && row < size && col < size) {
        if (board[row] === col) { return true; }
        row += r;
        col += c;
      }
      return false;
    };    

    for (var r = -1 ; r <= 1 ; r += 2) {
      for (var c = -1 ; c <= 1 ; c += 2) {
        if (check(row+r, col+c, r, c)) { return true; }
      }
    }
    return false;
  };


  var dfs = function(row) {
    if(row >= size) { return true; }

    for (var c = 0 ; c < size ; c += 1){
      if (!columnConflict(c) && !slantedConflict(row, c)) {
        putOn(row, c);

        if (dfs(row+1)) { return true; }
        
        omit(row, c);
      }
    }

    return false;
  };


  // ----
  if(dfs(0)){ return board; }  
  return undefined;
};

eightQueens.boardToString = function(board, blankSymbol, queenSymbol) {
  if(!board) { return undefined; }
  blankSymbol = blankSymbol || '.';
  queenSymbol = queenSymbol || '*';

  var blankLine = '';
  for (var i = 0 ; i < board.length ; i += 1) {
    blankLine += blankSymbol;
  }

  var str = '';
  for (var i = 0 ; i < board.length ; i += 1) {
    str += blankLine.substr(0,board[i]) + queenSymbol;
    str += blankLine.substr(0, board.length - board[i] -1) + '<br>';
  }

  return str;
};