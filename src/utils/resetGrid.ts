import {
	END_TILE_CONFIGURATION,
	START_TILE_CONFIGURATION,
	TILE_STYLE,
} from "./constants";
import { isEqual } from "./helpers";
import { GridType, TileType } from "./types";

export const resetGrid = ({
	grid,
	startTile = START_TILE_CONFIGURATION,
	endTile = END_TILE_CONFIGURATION,
}: {
	grid: GridType;
	startTile?: TileType;
	endTile?: TileType;
}) => {
	const rows = grid.length;
	const cols = grid[0].length;

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			const tile = grid[row][col];
			tile.isTraversed = false;
			tile.isPath = false;
			tile.distance = Infinity;
			tile.parent = null;
			tile.isWall = false;

			if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
				const tileElement = document.getElementById(`${row}-${col}`);

				if (tileElement) {
					tileElement.className = TILE_STYLE;
				}

				if (tile.row === rows - 1) {
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
