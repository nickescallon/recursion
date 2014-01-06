// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className, root, result) {
  result = result || [];
  root = root || document.body;

  for (var i=0; i<root.childNodes.length; i++){
    var child = root.childNodes[i];
    if (child.classList){
      if (child.classList.contains(className)){
        result.push(child);
      }
    }
    if (child.childNodes){
      getElementsByClassName(className, child, result);
    }
  }


  return result;
};

