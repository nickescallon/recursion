// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

var stringifyJSON = function (obj) {
	var result = '';

	//handle numbers and booleans
	if (typeof obj === 'number' || typeof obj === 'boolean') { 
	 	result += obj.toString();
	 }

	 //handle strings
	 if (typeof obj === 'string') {
	 	result += '"' + obj + '"';
	 }

	 //handle null
	 if (obj === null) {
	 	result += 'null';
	 }

	 //handle arrays and objects, ignoring functions and undefined
	 if (Array.isArray(obj)){
	 	result += '[';
	 	for (var i=0; i<obj.length; i++) {
	 		result += stringifyJSON(obj[i]);
	 		if (i < obj.length - 1) {
	 			result += ',';
	 		}
	 	}
	 	result += ']';
	 } else if (typeof obj === 'object' && obj != null ) {
	 	result += '{';
	 	var len = Object.getOwnPropertyNames(obj).length -1;
	 	var count = 0;
	 	for (keys in obj){
	 		if ((typeof obj[keys] != 'undefined') && (typeof obj[keys] != 'function')) {
	 			result += stringifyJSON(keys) + ':' + stringifyJSON(obj[keys]);
	 			if (count < len) {
	 			result += ',';
	 			}
	 		}
	 		count ++;
	 	}
	 	result += '}';
	 }

	return result;
};

