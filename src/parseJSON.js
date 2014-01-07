// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var currentChar = 0;
  
  var walk = function(){
    //Case for :
    if (json[currentChar] === ':' || json[currentChar] === ','){
      currentChar++;
    }

    //Case for whitespace
    if (json[currentChar] === ' '){
      currentChar++;
      while (json[currentChar] === ' '){
        currentChar++;
      }
      return walk(json[currentChar]);
    }

    //Case for numbers
    if (parseInt(json[currentChar])){
      var result = '';
      result += json[currentChar];
      currentChar++;
      while (parseInt(json[currentChar])){
        result += json[currentChar];
        currentChar++;
      }

      return parseInt(result);
    }

    //Case for strings
    if (json[currentChar] === '"'){
      var result = '';
      currentChar++;
      while (json[currentChar] !== '"' ){
        result += json[currentChar];
        currentChar++;
      }
      currentChar++;
      return result;
    }
    //Case for objects]
    if (json[currentChar] === '{'){
      var result = {};
      currentChar++;
      while (json[currentChar] !== '}' && json[currentChar]){
        var key = walk(json[currentChar]);
        result[key] = walk(json[currentChar]);
        currentChar++;
      }
      return result;
    }

    //Case for arrays
    if (json[currentChar] === '['){
      var result = [];
      currentChar++;
      while (json[currentChar] !== ']' && json[currentChar]){
        result.push(walk(json[currentChar]));
        currentChar++;
      }
      return result;
    }
  }


  return walk(json);
};


