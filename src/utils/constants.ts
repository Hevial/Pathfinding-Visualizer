import {
	AlgorithmSelectType,
	MazeSelectType,
	SpeedSelectType,
} from "@/utils/types";

export const MAX_ROWS = 39;
export const MAX_COLS = 39;

export const START_TILE_CONFIGURATION = {
	row: 1,
	col: 1,
	isStart: true,
	isEnd: false,
	isWall: false,
	isTraversed: false,
	isPath: false,
	distance: 0,
	parent: null,
};

export const END_TILE_CONFIGURATION = {
	row: MAX_ROWS - 2,
	col: MAX_COLS - 2,
	isStart: false,
	isEnd: true,
	isWall: false,
	isTraversed: false,
	isPath: false,
	distance: 0,
	parent: null,
};

export const TILE_STYLE = "border-t border-r border-sky-200";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-400";
export const START_TILE_STYLE = TILE_STYLE + " bg-green-400";
export const END_TILE_STYLE = TILE_STYLE + " bg-red-400";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-200";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-500";

export const MAZES: MazeSelectType[] = [
	{ label: "None", value: "NONE" },
	{ label: "Recursive Division", value: "RECURSIVE_DIVISION" },
	{ label: "Binary Tree", value: "BINARY_TREE" },
];

export const ALGORITHMS: AlgorithmSelectType[] = [
	{ label: "Dijkstra", value: "DIJKSTRA" },
	{ label: "A*", value: "A_STAR" },
	{ label: "BFS", value: "BFS" },
	{ label: "DFS", value: "DFS" },
];

export const SPEEDS: SpeedSelectType[] = [
	{ label: "Fast", value: 0.5 },
	{ label: "Medium", value: 1 },
	{ label: "Slow", value: 2 },
];
