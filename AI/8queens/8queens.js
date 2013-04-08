var eightQueens = {};

eightQueens.evaluate = function(size) {
  var board = new Array(size);
  var column_reg_table = new Array(size);

  var putOn = function(row, col) {
    board[row] = col;
    column_reg_table[col] = true;
  }

  var omit = function(row, col) {
    board[row] = null;
    column_reg_table[col] = false;
  }

  var columnConflict = function(col) {
    return column_reg_table[col] === true;
  }

  var slantedConflict = function(row, col) {
    var rec = foo(row, col, r, c) {
      if (row < 0 || col < 0 || row >= size || col >= size) { return false; }
      if (board[row] === col) { return true; }
      return rec(row+r, col+c, r,c);
    }

    

    for (var r = -1 ; r <= 1 ; r += 2) {
      for (var c = -1 ; c <= 1 ; c += 2) {
        if (rec(row+r, )) { return true; }
      }
    }
  }


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
  }


  // ----
  dfs(0);
  return board;

}