var pancakesPuzzle = function(puzzle) { 
  
  var isSortedPuzzle = function(p) {
    var i;
    for (i = 0 ; i < p.length ; i += 1) {
      if (i !== p[i] - 1) {
        return false;
      }
    }
    return true;
  };
  
  
  var isValidPuzzle = function(p) {
    p = p.slice(0).sort(function(a,b) { return a-b; });
    return isSortedPuzzle(p);
  };
  
  
  var reversePuzzle = function(p, n) {
    var i;
    for (i = 0; i < n; i += 1, n -= 1) {
      var temp = p[i]; p[i] = p[n]; p[n] = temp;
    }
  };  
  
  
  var calculateCaller = function() {
    var results = {
      value : [],

      push: function(p) {
        this.value.push(p.slice(0));
      },

      toString: function(){
        str = '';
        for (var i = this.value.length - 1; i >= 0; i -= 1) {
          var s = this.value[i].toString().replace(/,/g, ' ');
          str = str + s + '<br>';
        };
        return str;
      },

      numStep: function(){
        return this.value.length - 1;
      }
    };

    var deepLimit = 0;

    var dfs = function(ban, deep) {
      if (deep === deepLimit) {
        if (isSortedPuzzle(puzzle)) {
          results.push(puzzle);
          return true;
        } else {
          return false;
        }
      }

      for (var i = 1; i < puzzle.length; i += 1) {
        if (i === ban) {
          continue;
        }

        reversePuzzle(puzzle, i);
        var gotAnswer = dfs(i, deep + 1);
        reversePuzzle(puzzle, i);

        if (gotAnswer) {
          results.push(puzzle);
          return true;
        }
      }

      return false;
    };  // end dfs()

    
    if (! isValidPuzzle(puzzle)) {
      return "Invalid Puzzle<br>";
    }

    var start_time = +new Date();
    for (deepLimit = 0 ; !dfs(puzzle.length, 0) ; deepLimit += 1) 
      {}
    var end_time = +new Date();

    var msg = 'An optimal solution has ' + results.numStep() + ' moves.<br>';
    msg += results.toString();
    msg += 'Time spend: ' + (end_time - start_time) + ' ms';
    return msg;


  };  // end calculateCaller()
  
  return calculateCaller();
}; // end func pancakesPuzzle()

var parseNumbers = function(text) {
  var vs = text.split(/\s+/);
  for (var i = 0 ; i < vs.length ; i += 1){
    vs[i] = parseInt(vs[i]);
  }
  return vs;
};

var pancakesPuzzleFromText = function(text) {
  return pancakesPuzzle(parseNumbers(text));
};