const myTree = ['A', [['B', [['E'], ['F']]], ['C'], ['D', [['G'], ['J'], ['K']]]]];


// ONE

const depthFirstSearch = tree => {
  const [name, children] = tree;

  console.log(name);

  if (!children) {
    return;
  }

  return children.map(depthFirstSearch);
}

depthFirstSearch(myTree);


// TWO

const treeToLowerCase = tree => {
  const [name, children] = tree;

  const lowerCaseName = name.toLowerCase();

  if (!children) {
    return [lowerCaseName];
  }

  return [lowerCaseName, children.map(treeToLowerCase)];
}

console.log(JSON.stringify(treeToLowerCase(myTree)));


// THREE

