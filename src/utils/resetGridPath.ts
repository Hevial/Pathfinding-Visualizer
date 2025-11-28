import {
	END_TILE_CONFIGURATION,
	MAX_COLS,
	MAX_ROWS,
	START_TILE_CONFIGURATION,
	TILE_STYLE,
} from "./constants";
import { isEqual } from "./helpers";
import { GridType, TileType } from "./types";

export const resetGridPath = ({
	grid,
	startTile = START_TILE_CONFIGURATION,
	endTile = END_TILE_CONFIGURATION,
}: {
	grid: GridType;
	startTile?: TileType;
	endTile?: TileType;
}) => {
	for (let row = 0; row < MAX_ROWS; row++) {
		for (let col = 0; col < MAX_COLS; col++) {
			const tile = grid[row][col];
			tile.isTraversed = false;
			tile.isPath = false;
			tile.distance = Infinity;
			tile.parent = null;

			if (
				!isEqual(tile, startTile) &&
				!isEqual(tile, endTile) &&
				!tile.isWall
			) {
				const tileElement = document.getElementById(`${row}-${col}`);

				if (tileElement) {
					tileElement.className = TILE_STYLE;
				}

				if (tile.row === MAX_ROWS - 1) {
					tileElement?.classList.add("border-b");
				}

				if (tile.col === 0) {
					tileElement?.classList.add("border-l");
				}
			}
		}
	}

	return null;
};
