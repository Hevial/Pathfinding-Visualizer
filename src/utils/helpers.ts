import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./type"

const createRow = (row: number, startTile: TileType, endTile: TileType) : TileType[] => {
	const currentRow : TileType[] = [];
	for (let col = 0; col < MAX_COLS; col++) {
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
}

export const createGrid = (startTile: TileType, endTile: TileType) : GridType => {
	const grid : GridType = [];

	for (let row = 0; row < MAX_ROWS; row++) {
		grid.push(createRow(row, startTile, endTile));
	}
	return grid;
}