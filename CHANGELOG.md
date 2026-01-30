# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Dynamic and Responsive Grid System**: Implemented a flexible grid system that adapts to different screen sizes and user-defined dimensions
- **Dynamic Maze Selector Reset**: Maze selector automatically resets when grid size changes

### Changed
- Improved grid responsiveness and layout calculations

---

## [1.0.0] - 30-11-2025

This is the stable release of the Pathfinding Visualizer with complete algorithm implementations and visualization system.

### Added
- **A* Pathfinding Algorithm**: Implemented the A* algorithm for efficient pathfinding with heuristic-based search
- **Grid Path Reset Functionality**: Added ability to reset path visualization while preserving walls and start/end positions
- **Drawing Animations**: Implemented smooth animations for path and wall drawing during algorithm visualization
- **Dijkstra's Algorithm with MinHeap**: Implemented Dijkstra's algorithm with a stable MinHeap data structure with tie-breaking for optimal shortest path calculation
- **Depth-First Search (DFS) Algorithm**: Implemented DFS algorithm for pathfinding with backtracking support
- **Algorithm Registry System**: Created a centralized registry for managing and selecting pathfinding algorithms
- **Breadth-First Search (BFS) Algorithm**: Implemented BFS algorithm with efficient queue-based traversal
- **Path Animation System**: Created animatePath utility for visualizing discovered paths with smooth transitions
- **Recursive Division Maze Algorithm**: Implemented recursive division algorithm for dynamic maze generation
- **Clear Button Component**: Added clear button to reset grid and remove all walls and paths
- **Animation Framework**: Implemented CSS keyframe animations for wall and path visualization
- **Binary Tree Maze Generation Algorithm**: Implemented Binary Tree maze generation algorithm with customizable complexity
- **Navigation Bar with Selectors**: Created navbar component with algorithm and maze selectors, plus play button
- **Draw Wall Functionality**: Implemented ability to draw walls on the grid by clicking and dragging
- **Grid and Tile Components**: Created core Grid and Tile components for grid-based visualization
- **Tile and Speed Context Providers**: Implemented context providers for managing tile state and animation speed
- **Pathfinding Context**: Created context for managing pathfinding algorithm state and results
- **Shadcn/UI Integration**: Integrated Shadcn/UI component library and implemented basic theme system with dark/light mode support

### Changed
- **Select Component Improvements**: Added dynamic width calculation and responsive trigger behavior for better UX
- **BFS Algorithm Optimization**: Refactored BFS with more efficient queue implementation
- **File Naming Conventions**: Renamed BFS.ts to Bfs.ts for consistent naming conventions across the codebase
- **TypeScript Configuration**: Updated tsconfig with path aliases and removed deprecated settings

### Fixed
- **Shadcn/UI Aliases Configuration**: Fixed shadcn/ui component path aliases configuration
- **Grid Border Rendering**: Corrected left grid border rendering issue in animatePath animation
- **Select Component Behavior**: Fixed issue where select components remained enabled while algorithms were running
- **Grid Aspect Ratio**: Fixed grid aspect ratio display across different screen sizes
- **Unused Parameters**: Removed unused parameters from utility functions

### Style
- **Path Animation Styling**: Added background color to 100% completion keyframe for path animations

### Chore
- **Debug Logging Cleanup**: Removed debug console logs from production code
- **TypeScript Upgrade**: Updated TypeScript to latest stable version
- **Dependency Configuration**: Removed ignoreDeprecations from tsconfig
- **Documentation**: Updated README.md with project information and live demo link

---

## [0.1.0] - 14-10-2025

### Added
- **Initial Project Setup**: Created Pathfinding Visualizer project with React, TypeScript, and Vite
- **Project Foundation**: Configured build tools, TypeScript, and development environment
- **Shadcn/UI Base Integration**: Added Shadcn/UI component library and basic components
- **Theme System**: Implemented light/dark theme toggle and theme provider
- **Pathfinding Context**: Created context for managing pathfinding algorithm state and results
- **Tile and Speed Context Providers**: Implemented context providers for managing tile state and animation speed
- **Grid and Tile Components**: Created core Grid and Tile components for grid-based visualization
- **Draw Wall Functionality**: Implemented ability to draw walls on the grid by clicking and dragging
- **Navigation Bar with Selectors**: Created navbar component with algorithm and maze selectors, plus play button

### Changed
- **TypeScript Configuration**: Updated tsconfig with proper path aliases

---

## [0.0.1] - 17-11-2024

### Added
- **Initial Commit**: Project repository initialization with basic setup files
