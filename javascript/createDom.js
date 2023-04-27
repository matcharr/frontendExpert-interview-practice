function createDom(root) {
  const node = document.createElement(root.type);

  if (root.attributes) {
    for (const [attributeName, value] of Object.entries(root.attributes)) {
      node.setAttribute(attributeName, value);
    }
  }

  if (root.children) {
    root.children.forEach((child) => {
      node.appendChild(
        typeof child === "string"
          ? document.createTextNode(child)
          : createDom(child)
      );
    });
  }

  return node;
}

// Do not edit the line below.
exports.createDom = createDom;
