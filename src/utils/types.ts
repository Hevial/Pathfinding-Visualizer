export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";

export type MazeType = "NONE" | "RECURSIVE_DIVISION" | "BINARY_TREE";

export type TileType = {
	row: number;
	col: number;
	isStart: boolean;
	isEnd: boolean;
	isWall: boolean;
	isTraversed: boolean;
	isPath: boolean;
	distance: number;
	parent: TileType | null;
};

export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;