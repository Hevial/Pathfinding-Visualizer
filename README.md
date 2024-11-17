# Pathfinding Visualizer

A dynamic and interactive tool to visualize pathfinding algorithms in action. This project demonstrates how popular algorithms like Dijkstra, A*, BFS, and DFS solve the shortest path problem in grid-based environments. Additionally, it features maze generation algorithms to create interesting scenarios for testing. It is designed to be both educational and visually appealing.

👉 [Live Demo]()

---

## Features

- 🛤 **Pathfinding Algorithms**: Includes Dijkstra, A*, BFS, and DFS.  
- 🧩 **Maze Generation Algorithms**: Create challenging mazes with Recursive Division and Binary Tree.  
- 🎨 **Interactive Grid**: Customize the grid by placing start/end nodes, walls, and weights.  
- ⚡ **Real-time Visualization**: Watch the algorithms work step by step.  
- 🔧 **Customizable**: Adjust speed, grid size, and algorithm parameters.  

---

## How to Use

1. **Setup the Grid**:
   - Place the **Start Node** and **End Node**.
   - Add walls to block paths.
   - Add weighted nodes to increase cost.

2. **Choose an Algorithm**:
   - Select from the available pathfinding or maze generation algorithms in the menu.

3. **Visualize**:
   - Click the "Start Visualization" button to watch the algorithm in action.

4. **Reset**:
   - Use the "Clear Grid" or "Clear Path" buttons to start over.

---

## Algorithms

### Pathfinding Algorithms

- **Dijkstra's Algorithm**  
  Guaranteed to find the shortest path, but explores all possible options.  

- **A***  
  A heuristic-based algorithm that efficiently finds the shortest path by prioritizing nodes with the lowest cost.  

- **Breadth-First Search (BFS)**  
  Explores nodes level by level. Ideal for unweighted graphs.  

- **Depth-First Search (DFS)**  
  Explores as far as possible along each branch before backtracking. Not guaranteed to find the shortest path.  

### Maze Generation Algorithms

- **Recursive Division**  
  Splits the grid recursively to create a maze with complex paths.  

- **Binary Tree**  
  Generates a simple yet structured maze using a binary tree approach.  
