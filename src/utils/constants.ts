export const MAX_ROWS = 40;
export const MAX_COLS = 40;

export const START_TILE_CONFIGURATION = { 
	row: 1,
	col: 1,
	isStart: true,
	isEnd: false,
	isWall: false,
	isTraversed:false,
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
	isTraversed:false,
	isPath: false,
	distance: 0,
	parent: null,
};

export const TILE_STYLE = "border-t border-r border-sky-200";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-400";
export const START_TILE_STYLE = TILE_STYLE + " bg-green-400";
export const END_TILE_STYLE = TILE_STYLE + " bg-red-400";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-400";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-500";