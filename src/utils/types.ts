export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";
export interface AlgorithmSelectType {
	label: string;
	value: AlgorithmType;
}
export interface PathfindingResult {
	traversedTiles: TileType[];
	path: TileType[];
}
export interface PathfindingAlgorithm {
	run(
		grid: GridType,
		startTile: TileType,
		endTile: TileType
	): PathfindingResult;
}

export type MazeType = "NONE" | "RECURSIVE_DIVISION" | "BINARY_TREE";
export interface MazeSelectType {
	label: string;
	value: MazeType;
}

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
export interface SpeedSelectType {
	label: string;
	value: SpeedType;
}
