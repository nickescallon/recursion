// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var result = {};

if (typeof json === 'number' || typeof json === 'boolean') { 
	 	return json;
	}


  //creates an array where each index is a key value pair, removes all spaces
  var strArr = json.split(' ').join('').split(',');

  //iterates through said arrray
  for (var i=0; i<strArr.length; i++){


  	//creates an array splitting keys and values
  	var keyVal = strArr[i].split(':');
  	
  	var key = (Object.keys(result).length) ? keyVal[0].slice(1, keyVal[0].length-1) : keyVal[0].slice(2, keyVal[0].length-1);

  	
  	//Handle objects and arrays (currently not arrays)
  	if (keyVal[1]){
  	
  		if (keyVal[1][0] == '{'){;
  			/*while(keyVal[2]){
  				if (keyVal[2].indexOf('}') == -1){
  					keyVal[1]+= ':' + keyVal[2] + ",";
  					keyVal.splice(2, 0);
  				}
  			}*/
  			keyVal[1]+= ':' + keyVal[2] + '}';
  			keyVal.splice(2,0);
  			keyVal[1] = keyVal[1].replace('}}', '}');
  			var val = parseJSON(keyVal[1]);
  		}else {
  			var val = (keyVal[1].substr(-1) == '}') ? keyVal[1].slice(1, keyVal[1].length-2) : keyVal[1].slice(1, keyVal[1].length-1);
  		}

  		result[key] = val;
  	
  	}
}

  //
return result;
};



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