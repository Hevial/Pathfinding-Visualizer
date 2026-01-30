import { WALL_TILE_STYLE, SPEEDS, SLEEP_TIME } from "@/utils/constants";
import {
	getRandomEvenInt,
	getRandomOddInt,
	isEqual,
	sleep,
} from "@/utils/helpers";
import { GridType, TileType, SpeedType } from "@/utils/types";
import { recursiveDivision } from "./recursiveDivision";

export const verticalDivision = async ({
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
	const makeWallAt = getRandomEvenInt(col, col + width - 1);
	const makePassageAt = getRandomOddInt(row, row + height - 1);
	const animationDelay =
		SLEEP_TIME * SPEEDS.find((s) => s.value === speed)!.value;

	for (let i = 0; i < height; i++) {
		const isStartOrEnd =
			isEqual(grid[row + i][makeWallAt], startTile) ||
			isEqual(grid[row + i][makeWallAt], endTile);

		if (makePassageAt != row + i && !isStartOrEnd) {
			grid[row + i][makeWallAt].isWall = true;

			const tileElement = document.getElementById(
				`${row + i}-${makeWallAt}`
			);
			if (tileElement) {
				tileElement.className = `${WALL_TILE_STYLE} animate-wall`;
			}

			await sleep(animationDelay);
		}
	}

	await recursiveDivision({
		grid,
		startTile,
		endTile,
		row,
		col,
		width: makeWallAt - col,
		height,
		speed,
	});

	await recursiveDivision({
		grid,
		startTile,
		endTile,
		row,
		col: makeWallAt + 1,
		width: col + width - (makeWallAt + 1),
		height,
		speed,
	});
};
