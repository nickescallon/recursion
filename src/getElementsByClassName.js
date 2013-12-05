// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  var results = [];

  var getElements = function(element){
  	var nodes = element.childNodes;
  	for (var i=0; i<nodes.length; i++) {
  		if(nodes[i].classList) {
  			if(nodes[i].classList.contains(className)) {
  				results.push(nodes[i]);
  			}
  		}
  		if(nodes[i].childNodes) {
  			getElements(nodes[i]);
  		}
  	}
  	return results;
  }

  return getElements(document);

};

