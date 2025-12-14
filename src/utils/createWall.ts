import { SPEEDS, WALL_TILE_STYLE } from "./constants";
import { getDelay, isRowColEqual } from "./helpers";
import { GridType, SpeedType, TileType } from "./types";

export const createWall = (
	grid: GridType,
	startTile: TileType,
	endTile: TileType,
	speed: SpeedType
) => {
	const speedValue = SPEEDS.find((s) => s.value === speed)!.value;
	const perTileDelay = 6 * speedValue - 1;

	const rows = grid.length;
	const cols = grid[0].length;

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const isTileValid =
				(row % 2 === 0 || col % 2 === 0) &&
				!isRowColEqual(row, col, startTile) &&
				!isRowColEqual(row, col, endTile);

			if (!isTileValid) continue;

			const tileElement = document.getElementById(`${row}-${col}`);
			if (!tileElement) continue;

			setTimeout(() => {
				tileElement.className = `${WALL_TILE_STYLE} animate-wall`;
			}, getDelay(perTileDelay, row, col, cols));
		}
	}
};
