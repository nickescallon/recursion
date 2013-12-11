// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
	var currentIndex = 0;

	var walk = function(str) {
		if (json === null){
			return null;
		}

		if (currentIndex >= json.length){
			return "error";
		}

		var cha = json[currentIndex];

		//handle numbers, bools, and nulls
		if (typeof str === 'number' || typeof str === 'boolean' || str === null) { 
	 		if (str === null){
	 			currrentIndex += 4;
	 		}else{
	 			currentIndex += str.toString().length;
	 		}
	 		return str;
		}

		//handle strings of bools and nulls
		if (str === "true") {return true};
		if (str === "false") {return false};
		if (str === "null") {return null};

		//handle strings
		if(!(/[\{\}\[\],]/.test(str))){
			currentIndex += str.length;
			return str;
		}

		//walk through str
		//handle quoted strings
		if (cha == ':'){
			currentIndex++;
			cha = json[currentIndex];
			var remainder = json.substr(currentIndex, json.length-currentIndex);
			return walk (remainder);
		}

		if (cha == ','){
			currentIndex++;
			cha = json[currentIndex];
			var remainder = json.substr(currentIndex, json.length-currentIndex);
			return walk (remainder);
		}

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

	