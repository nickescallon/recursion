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

	if (obj && typeof(obj) === 'object') {
		return '{' + _.map(obj, function(value, index){
		if(typeof(value) !== 'function' && value !== undefined){
			return stringifyJSON(index) + ':' + stringifyJSON(value);
		}}) + '}';
	}

	return "" + obj;

};

