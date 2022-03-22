import { Queue } from './Queue.js';
import { Stack } from './Stack.js';

class GraphNode {
  constructor(value) {
    this.value = value;
    this.adjacents = []; // adjacency list
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }

  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if (index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }

  getAdjacents() {
    return this.adjacents;
  }

  isAdjacent(node) {
    return this.adjacents.indexOf(node) > -1;
  }
}

class Graph {
  constructor(edgeDirection = Graph.UNDIRECTED) {
    this.nodes = new Map();
    this.edgeDirection = edgeDirection;
  }

  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode.addAdjacent(destinationNode);

    if (this.edgeDirection === Graph.UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode);
    }

    return [sourceNode, destinationNode];
  }

  removeEdge(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);

      if (this.edgeDirection === Graph.UNDIRECTED) {
        destinationNode.removeAdjacent(sourceNode);
      }
    }

    return [sourceNode, destinationNode];
  }

  addVertex(value) {
    if (this.nodes.has(value)) {
      return this.nodes.get(value);
    } else {
      const vertex = new GraphNode(value);
      this.nodes.set(value, vertex);
      return vertex;
    }
  }

  removeVertex(value) {
    const current = this.nodes.get(value);
    if (current) {
      for (const node of this.nodes.values()) {
        node.removeAdjacent(current);
      }
    }
    return this.nodes.delete(value);
  }

  display() {
    console.log(this.nodes);
  }

  *bfs(first) {
    const visited = new Map();
    const visitList = new Queue();

    visitList.enqueue(first);

    while (!visitList.isEmpty()) {
      const node = visitList.dequeue();
      if (node && !visited.has(node)) {
        yield node;
        visited.set(node);
        node.getAdjacents().forEach(adj => visitList.enqueue(adj));
      }
    }
  }

  *dfs(first) {
    const visited = new Map();
    const visitList = new Stack();

    visitList.push(first);

    while (!visitList.isEmpty()) {
      const node = visitList.pop();
      if (node && !visited.has(node)) {
        yield node;
        visited.set(node);
        node.getAdjacents().forEach(adj => visitList.push(adj));
      }
    }
  }
}

Graph.DIRECTED = Symbol('directed graph');
Graph.UNDIRECTED = Symbol('undirected graph');

const graph = new Graph(Graph.UNDIRECTED);

const [first] = graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(5, 2);
graph.addEdge(6, 3);
graph.addEdge(7, 3);
graph.addEdge(8, 4);
graph.addEdge(9, 5);
graph.addEdge(10, 6);

const bfsFromFirst = graph.bfs(first);
console.log([...bfsFromFirst].map(node => node.value)); // [1,2,3,4,5,6,7,8,9,10]

const dfsFromFirst = graph.dfs(first);
const visitedOrder = [...dfsFromFirst];
const values = visitedOrder.map(node => node.value);
console.log(values); // [1, 4, 8, 3, 7, 6, 10, 2, 5, 9]
console.log(graph.nodes);
