import { SLEEP_TIME, WALL_TILE_STYLE } from "./constants";
import { isEqual, sleep } from "./helpers";
import { GridType, TileType } from "./types";

export const constructBorder = async (
	grid: GridType,
	startTile: TileType,
	endTile: TileType
) => {
	const rows = grid.length;
	const cols = grid[0].length;

	const shape = [
		{ row: 0, col: 1 },
		{ row: 1, col: 0 },
		{ row: 0, col: -1 },
		{ row: -1, col: 0 },
	];

	let row = 0;
	let col = 0;

	for (let i = 0; i < 4; i++) {
		const direction = shape[i];
		while (
			row + direction.row >= 0 &&
			row + direction.row < rows &&
			col + direction.col >= 0 &&
			col + direction.col < cols
		) {
			row += direction.row;
			col += direction.col;

			const isStartOrEnd =
				isEqual(grid[row][col], startTile) ||
				isEqual(grid[row][col], endTile);
			if (isStartOrEnd) continue;

			grid[row][col].isWall = true;

			const tileElement = document.getElementById(`${row}-${col}`);

			if (tileElement) {
				tileElement.classList.add(
					...WALL_TILE_STYLE.split(" "),
					"animate-wall"
				);
			}

			await sleep(SLEEP_TIME);
		}

		if (row < 0) row = 0;
		if (row >= rows) row = rows - 1;
		if (col < 0) col = 0;
		if (col >= cols) col = cols - 1;
	}
};
