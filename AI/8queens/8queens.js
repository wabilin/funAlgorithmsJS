var eightQueens = {};

eightQueens.randIntFactor = function(min, max) {
  var TABLE_SIZE = 1e6;

  var range = max - min + 1;

  var randomInt = function() {
    return Math.floor(Math.random() * range + min);
  }

  var lookUpTable = new Array(TABLE_SIZE);
  var i;
  for(i = 0 ; i < TABLE_SIZE ; i += 1) {
    lookUpTable[i] = randomInt();
  }

  i = 0;
  return function(){
    i += 1;
    if (i >= TABLE_SIZE) { i = 0; }
    return lookUpTable[i];
  };

};

eightQueens.evaluate = function(size, funcName) {

  // -- shared variables and functions --
  var board = new Array(size);
  var column_reg_table = new Array(size);


  var randomInt = this.randIntFactor(0, size - 1); // a function


  var putOn = function(row, col) {
    board[row] = col;
    column_reg_table[col] = true;
  };

  var omit = function(row, col) {
    board[row] = null;
    column_reg_table[col] = false;
  };

  var clear = function() {
    for (var i = 0 ; i < size ; i += 1) {
      board[i] = null;
      column_reg_table[i] = false;
    }
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

  var goal = function() {
    for (var row = 0 ; row < size ; row += 1) {
      var col = board[row];
      omit(row, col);
      var flag = columnConflict(col) || slantedConflict(row, col);
      putOn(row, col);

      if (flag) { return false; }
    }
    return true;
  };


  var numOfConflict = function(row, col){
    var conflictCounter = 0;

    var countSlanted = function(row, col, r, c) {
      while (row >= 0 && col >= 0 && row < size && col < size) {
        if (board[row] === col) {
          conflictCounter += 1;
        }
        row += r;
        col += c;
      }
    };


    for (var r = 0 ; r < size ; r += 1) {
      if (board[r] === col) {
        conflictCounter += 1;
      }
    }
    

    for (var r = -1 ; r <= 1 ; r += 2) {
      for (var c = -1 ; c <= 1 ; c += 2) {
        if (countSlanted(row+r, col+c, r, c)) {
          conflictCounter += 1;
        }
      }
    }

    return conflictCounter;
  };  // end numOfConflict()


  var randBoard = function() {
    clear();
    
    for (var r = 0 ; r < size ; r += 1) {
      putOn(r, randomInt());
    }
    
  };


  // -- evaluate functions --

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

  var hillClimbing = function() {    

    var localOptimum = function() {
      for (var r = 0 ; r < size ; r += 1) {
        var score = numOfConflict(r, board[r]);
        for (var c = 0 ; c < size ; c += 1) {
          if (numOfConflict(r, c) < score) { return false; }
        }
      }
      return true;
    };

    var climb = function() {
      var LIMIT = 100;
      while ( !localOptimum() ) {
        for (var i = 0 ; i < LIMIT ; i += 1) {

          var row = randomInt();
          var col = board[row];
          var score = numOfConflict(row, col);

          var newCol = col;
          for (var c = 0 ; c < size ; c += 1) {
            var s = numOfConflict(row, c);
            if (s < score) {
              score = s;
              newCol = c;
            }
          }

          omit(row, col);
          putOn(row, newCol);
        }
      }
    }; // end climb()


    var tryLimit = 10000;
    for (var i = 0 ; i < tryLimit ; i += 1) {
      randBoard();
      climb();
      if (goal()) { return true; }
    }
    

    return false;
  }; // end hillClimbing();



  // -- control proc --
  funcName = funcName || "dfs";
  if (funcName == "dfs" && dfs(0)){ return board; }  
  else if( funcName == "hc" && hillClimbing() ) { return board; }
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