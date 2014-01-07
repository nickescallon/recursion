// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

var stringifyJSON = function (obj) {

	if (typeof(obj) === 'string'){
		return '"' + obj + '"';
	}

	if (Array.isArray(obj)){
		return '[' + _.map(obj, function(value){
			return stringifyJSON(value);
		}).join(',') + ']';
	}



	if (obj && typeof obj === 'object') {
		var string = "{";
		var count = 0;
		for (var key in obj) {
			if(typeof(obj[key]) !== 'function' && obj[key] !== undefined){
				string += stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
				if (count < Object.keys(obj).length-1){
					string += ',';
					count++;
				}
			}
		}
		return string + '}';
	}



	return "" + obj;

};

