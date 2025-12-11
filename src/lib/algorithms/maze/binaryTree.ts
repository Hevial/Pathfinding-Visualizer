import { createWall } from "@/utils/createWall";
import { destroyWall } from "@/utils/destroyWall";
import { isRowColEqual, sleep } from "@/utils/helpers";
import { GridType, SpeedType, TileType } from "@/utils/types";

export const binaryTree = async ({
	grid,
	startTile,
	endTile,
	speed,
	setIsDisabled,
}: {
	grid: GridType;
	startTile: TileType;
	endTile: TileType;
	speed: SpeedType;
	setIsDisabled: (value: boolean) => void;
}) => {
	createWall(grid, startTile, endTile, speed);
	const rows = grid.length;
	const cols = grid[0].length;

	await sleep(rows * cols);

	for (const row of grid) {
		for (const tile of row) {
			if (tile.row % 2 === 0 || tile.col % 2 === 0) {
				if (
					!isRowColEqual(tile.row, tile.col, startTile) ||
					!isRowColEqual(tile.row, tile.col, endTile)
				) {
					tile.isWall = true;
				}
			}
		}
	}

	for (let row = 1; row < rows - 1; row += 2) {
		for (let col = 1; col < cols - 1; col += 2) {
			if (row === rows - 2 && col === cols - 2) {
				continue;
			} else if (row === rows - 2) {
				await destroyWall(grid, row, col, 1, speed);
			} else if (col === cols - 2) {
				await destroyWall(grid, row, col, 0, speed);
			} else {
				const isRight = Math.round(Math.random());
				await destroyWall(grid, row, col, isRight, speed);
			}
		}
	}

	setIsDisabled(false);
};
