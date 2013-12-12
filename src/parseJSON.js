// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
	var currentIndex = 0;

	var walk = function(str) {

		//handle non-string numbers, bools, and nulls
		if (typeof(json) === 'number' || typeof(json) === 'boolean' || json === null){
			return json;
		}

		//attempt to break out of infinite loops
		if (currentIndex >= json.length){
			return "error";
		}

		//current character being parsed in json
		var cha = json[currentIndex];

		//TBD: Handle bools in objects/arrays, handle escapes

		//handle numbers
		if (cha >= 0 && cha <= 9){
			var numString = '';
			while (cha >=0 && cha <= 9){
				numString += cha;
				currentIndex++;
				cha = json[currentIndex];
			}
			var num = parseFloat(numString);
			return num;
		}

		//handle semicolons
		if (cha == ':'){
			currentIndex++;
			cha = json[currentIndex];
			var remainder = json.substr(currentIndex, json.length-currentIndex);
			return walk (remainder);
		}

		//handle commas
		if (cha == ','){
			currentIndex++;
			cha = json[currentIndex];
			var remainder = json.substr(currentIndex, json.length-currentIndex);
			return walk (remainder);
		}

		//handle strings 
		if (cha == '"') {		
			var result = '';
			currentIndex++;
			cha = json[currentIndex];
			while (cha != '"'){
				result += cha;
				currentIndex++;
				cha = json[currentIndex];
				if (currentIndex >= json.length){
					return "error - string";
				}
			}
			currentIndex++;
		}


		//handle arrays
		if (cha == '['){
			var result = [];
			currentIndex++;
			cha = json[currentIndex];
			while (cha != ']'){
				var remainder = json.substr(currentIndex, json.length-currentIndex);
				var val = walk(remainder);
				result.push(val);
				cha = json[currentIndex];
				if (currentIndex >= json.length){
					return "error - array";
				}
			}
			currentIndex++;
		}

		//handle objects
		if (cha == '{') {
			var result = {};
			currentIndex++;
			cha = json[currentIndex];
			while (cha != '}'){	
				var remainder = json.substr(currentIndex, json.length-currentIndex);
				var key = walk(remainder);
				//keys must be strings in JSON
				if (typeof(key) != 'string'){
					return "Error - Keys must be strings";
				}
				remainder = json.substr(currentIndex, json.length-currentIndex);
				var val = walk(remainder);
				result[key] = val;
				cha = json[currentIndex];
				if (currentIndex >= json.length){
					return "error - object";
				}
			}
			//currentIndex++ and delete following IF
		}

		if (cha == '}'){
			currentIndex++;
		}

		return result;

		 		
  	};


  	return walk(json);

};

	