import { SPEEDS, WALL_TILE_STYLE } from "@/utils/constants";
import {
	getRandomEvenInt,
	getRandomOddInt,
	isEqual,
	sleep,
} from "@/utils/helpers";
import { GridType, TileType, SpeedType } from "@/utils/types";
import { recursiveDivision } from "./recursiveDivision";

export const horizontalDivision = async ({
	grid,
	startTile,
	endTile,
	row,
	col,
	width,
	height,
	speed,
}: {
	grid: GridType;
	startTile: TileType;
	endTile: TileType;
	row: number;
	col: number;
	width: number;
	height: number;
	speed: SpeedType;
}) => {
	const makeWallAt = getRandomEvenInt(row, row + height - 1);
	const makePassageAt = getRandomOddInt(col, col + width - 1);

	for (let i = 0; i < width; i++) {
		const isStartOrEnd =
			isEqual(grid[makeWallAt][col + i], startTile) ||
			isEqual(grid[makeWallAt][col + i], endTile);

		if (makePassageAt != col + i && !isStartOrEnd) {
			grid[makeWallAt][col + i].isWall = true;

			const tileElement = document.getElementById(
				`${makeWallAt}-${col + i}`
			);
			if (tileElement) {
				tileElement.className = `${WALL_TILE_STYLE} animate-wall`;
			}

			await sleep(10 * SPEEDS.find((s) => s.value === speed)!.value - 5);
		}
	}

	await recursiveDivision({
		grid,
		startTile,
		endTile,
		row,
		col,
		width,
		height: makeWallAt - row,
		speed,
	});

	await recursiveDivision({
		grid,
		startTile,
		endTile,
		row: makeWallAt + 1,
		col,
		width,
		height: row + height - (makeWallAt + 1),
		speed,
	});
};
