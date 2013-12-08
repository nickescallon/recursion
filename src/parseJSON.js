// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {

	var walk = function(str, remain) {

		//handle numbers, bools, and nulls
		if (typeof str === 'number' || typeof str === 'boolean' || str == null) { 
	 		return str;
		}

		//handle strings of bools and nulls
		if (str === "true") {return true};
		if (str === "false") {return false};
		if (str === "null") {return null};

		//handle strings
		if(!(/[\{\}\[\],]/.test(str))){
			return str;
		}

		//walk through str
		var strArr = [];
		for (var i=0; i<str.length; i++){
			if (!(/[\{\}\[\],\": ]/.test(str[i]))) {
					strArr.push(str[i]);
			}
			if (str[i] == ':' || str[i] == '}' || str[i] == ',') {
				if (i != 0){
					var val = strArr.join('');
					var remainder = str.substr(i, str.length-(i));
					break;
				}
			}
		}

		//
		if (str[0] == ':' || str[0] == ','){
			if (str[1] == '{'){
				var remainder = str.substr(1, str.length-(1));
				val = walk(remainder);
			}
			return val;
		}

		//
		if (str[0] == '}') {
			return str;
		}


		if (str[0] == '{'){
			var result = {};
			while(remainder.slice(-1) == '}' && (/[a-zA-Z]/).test(remainder) && remainder.length > 2){
				var value = walk(remainder);
				result[val] = value;
				var newRemainder = remainder.substr(value.length+3, remainder.length - value.length+3);
				remainder = newRemainder;
				val = walk(remainder);
				newRemainder = remainder.substr(val.length+3, remainder.length - val.length+3);
				remainder = newRemainder;
			}

		}
		return result;
  	};

  	return walk(json);

};

	