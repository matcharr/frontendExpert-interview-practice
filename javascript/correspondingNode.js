function correspondingNode(tree1, tree2, node1) {
  if (!tree1 || !tree2 || !node1) {
    return null;
  }

  function dfsTraversal(nodeA, nodeB, targetNode) {
    if (!nodeA || !nodeB) {
      return null;
    }

    if (nodeA === targetNode) {
      return nodeB;
    }

    let result = null;

    for (let i = 0; i < nodeA.children.length; i++) {
      result = dfsTraversal(nodeA.children[i], nodeB.children[i], targetNode);
      if (result) {
        break;
      }
    }

    return result;
  }

  return dfsTraversal(tree1, tree2, node1);
}

// Do not edit the line below.
exports.correspondingNode = correspondingNode;
