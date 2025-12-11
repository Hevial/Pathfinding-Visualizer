import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const createRow = (
	row: number,
	cols: number,
	startTile: TileType,
	endTile: TileType
): TileType[] => {
	const currentRow: TileType[] = [];
	for (let col = 0; col < cols; col++) {
		currentRow.push({
			row,
			col,
			isStart: row === startTile.row && col === startTile.col,
			isEnd: row === endTile.row && col === endTile.col,
			isWall: false,
			isPath: false,
			isTraversed: false,
			distance: Infinity,
			parent: null,
		});
	}
	return currentRow;
};

export const createGrid = (
	startTile: TileType,
	endTile: TileType,
	rows: number,
	cols: number
): GridType => {
	const grid: GridType = [];

	for (let row = 0; row < rows; row++) {
		grid.push(createRow(row, cols, startTile, endTile));
	}
	return grid;
};

// export const checkIfStartOrEnd = (row: number, col: number): boolean => {
// 	return (
// 		(row === 1 && col === 1) ||
// 		(row === MAX_ROWS - 2 && col === MAX_COLS - 2)
// 	);
// };

export const createNewGrid = (
	grid: GridType,
	row: number,
	col: number
): GridType => {
	const newGrid = grid.slice();

	const newTile = {
		...newGrid[row][col],
		isWall: !newGrid[row][col].isWall,
	};

	newGrid[row][col] = newTile;

	return newGrid;
};

export const isTileStartOrEnd = (tile: TileType): boolean => {
	return tile.isStart || tile.isEnd;
};

export const isEqual = (tileA: TileType, tileB: TileType): boolean => {
	return tileA.row === tileB.row && tileA.col === tileB.col;
};

export const isRowColEqual = (
	row: number,
	col: number,
	tile: TileType
): boolean => {
	return row === tile.row && col === tile.col;
};

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getDelay = (delay: number, row: number, col: number) => {
	return delay * (row * (MAX_COLS / 2) + col);
};

export const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomEvenInt = (min: number, max: number): number => {
	let start = min % 2 === 0 ? min : min + 1;
	let count = Math.floor((max - start) / 2) + 1;
	return start + Math.floor(Math.random() * count) * 2;
};

export const getRandomOddInt = (min: number, max: number): number => {
	let start = min % 2 === 1 ? min : min + 1;
	let count = Math.floor((max - start) / 2) + 1;
	return start + Math.floor(Math.random() * count) * 2;
};
