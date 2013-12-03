// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

var stringifyJSON = function (obj) {
	var result = '';

	//handle numbers and booleans
	if (typeof obj === 'number' || typeof obj === 'boolean') {
	 	result += obj.toString();
	 } 

	 //handle arrays
	 if (Array.isArray(obj)){
	 	result += '[';
	 	for (var i=0; i<obj.length-1; i++) {
	 		result += stringifyJSON(obj[i]);
	 		if (i < obj.length - 1) {
	 			result += ',';
	 		}
	 	}
	 	result += ']';
	 }


	return result;
};

