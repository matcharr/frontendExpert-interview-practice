function createDom(root) {
  // Write your code here.
  let dom = document.createElement(root.name);
  for (let key in root.attributes) {
    dom.setAttribute(key, root.attributes[key]);
  }
  for (let i = 0; i < root.children.length; i++) {
    dom.appendChild(createDom(root.children[i]));
  }
  return dom;
}

// Do not edit the line below.
exports.createDom = createDom;
