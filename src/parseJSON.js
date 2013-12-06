// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
	
	//handle numbers, bools, and nulls
	if (typeof json === 'number' || typeof json === 'boolean' || json == null) { 
	 	return json;
	}

	//handle strings of bools and nulls
	if (json === "true") {return true};
	if (json === "false") {return false};
	if (json === "null") {return null};

	//handle strings
	if(!(/[\{\}\[\],]/.test(json))){
		return json;
	}

	//sets result based on json obj
	if (json[0] == '{') {var result = {}, obj = true};
	//if (json[0] == '[') {var result = [], arr = true};

	//handle object values
	if (json[0] == ':') {
		console.log(json[1] + " is string val [1]");
		if (json[1] == '{') {
			var remainder = json.substr(1, json.length-1);
			var value = parseJSON(remainder);
		}

		if (json[1] === '"') {
			var value = '';
			var count = 1;
			while (json[count] != ',' && json[count] != '}') {
				if (json[count] != '"'){
					value += json[count];
					//console.log(value);
				}
				count++;
			}
		}

		return value;
	}

	//handle commas for objects
	if (json[0] == ',') {
		parseJSON(walk(json));
	}

	//handle objects
	if (obj){
		parseJSON(walk(json));
	}

	var walk = function(str, remainder) {
		var key = [];
		if (remainder == undefined) {
			for (var i=1; i<str.length; i++) {
				if (!(/[\{\}\[\],\": ]/.test(str[i]))) {
					key.push(str[i]);
				}

				if (str[i] == ':') {
					var keyStr = key.join('');
					var remainder = str.substr(i, str.length-(i));
					var val = parseJSON(keyStr);
					result[keyStr] = val;
					return remainder;
				}
			}
		}
  	};

  
	return result;
};



//json '{"id":"value"}'
		//'"id:"value"'





/*if (obj){
		//remove spaces
		json.split(' ').join('');
		var newStr = json.substr(2, json.length-3);
		var key = '';
		var count = 0;
		if (newStr.indexOf(':') != -1){
			while (newStr[count+1] != ':' && newStr[count+1] != ','){
				key += newStr[count];
				count++;
			}
		}
		var remainder = newStr.substr(count+2, newStr.length-4);
		if (remainder[0] == '{' || remainder[0] == '['){
			result[key] = parseJSON(remainder);
		}

	}
*/


/*//creates an array where each index is a key value pair, removes all spaces
  	var strArr = json.split(' ').join('').split(',');

  	//iterates through said arrray
  	for (var i=0; i<strArr.length; i++){


  		//creates an array splitting keys and values
  		var keyVal = strArr[i].split(':');
  	
  		var key = (Object.keys(result).length) ? keyVal[0].slice(1, keyVal[0].length-1) : keyVal[0].slice(2, keyVal[0].length-1);

  	
  		//Handle objects and arrays (currently not arrays)
  			if (keyVal[1][0] == '['){
  				if(keyVal[2]){
  					while (keyVal[2].indexOf(']') == -1){
  						keyVal[1]+= ',' + keyVal[2];
  						keyVal.splice(2, 1);
  					}
  				}
  				keyVal[1]+= ',' + keyVal[2] + ']';
  				keyVal.splice(2,1);
  				keyVal[1] = keyVal[1].replace(']]', '');
  				//keyVal[1] = keyVal[1].substr(0, keyVal[1].length-1);
  				var val = parseJSON(keyVal[1]);
  			}
  	
  			if (keyVal[1][0] == '{'){;
  				if(keyVal[2]){
  					while (keyVal[2].indexOf('}') == -1){
  						keyVal[1]+= ':' + keyVal[2];
  						keyVal.splice(2, 1);
  					}
  				}
  				keyVal[1]+= ':' + keyVal[2] + '}';
  				keyVal.splice(2,1);
  				keyVal[1] = keyVal[1].replace('}}', '');
  				//keyVal[1] = keyVal[1].substr(0, keyVal[1].length-1);
  				var val = parseJSON(keyVal[1]);
  			}else {
  				var val = (keyVal[1].substr(-1) == '}') ? keyVal[1].slice(1, keyVal[1].length-1) : keyVal[1].slice(1, keyVal[1].length-1);
  			}

  			result[key] = val;
  	
	}*/




/*

str = '{"id":"file","value":"File","popup":"test"}'
//"{"id":"file","value":"File","popup":"test"}"
array = str.split(',');
//["{"id":"file"", ""value":"File"", ""popup":"test"}"]
nested = array[0].split(':');
//["{"id"", ""file""]
newobj={};
//Object {}
newobj[nested[0][2]+nested[0][3]] = nested[1][0]+nested[1][1]+nested[1][2]+nested[1][3]+nested[1][4]+nested[1][5];
//Object {id: ""file""}

teststr2 = "{"id":"file","value":"File","popup":"test","obj":"{"key":"val"}}""

//not working

teststr3 = '{"id":"file", "id2": {"file2":"val"}}'
//"{"id":"file", "id2": {"file2":"val"}}"
var strArr = teststr3.split(' ').join('').split(',');
//["{"id":"file"", ""id2":{"file2":"val"}}"]
var nested = strArr[1].split(':');
//[""id2"", "{"file2"", ""val"}}"] //this splits up the objects. need to join them somehow

*/