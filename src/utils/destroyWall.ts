import { SLEEP_TIME, SPEEDS, TILE_STYLE } from "./constants";
import { sleep } from "./helpers";
import { GridType, SpeedType } from "./types";

export const destroyWall = async (
	grid: GridType,
	row: number,
	col: number,
	isRight: number,
	speed: SpeedType
) => {
	let targetRow = row;
	let targetCol = col;
	const animationDelay =
		SLEEP_TIME * SPEEDS.find((s) => s.value === speed)!.value;

	if (isRight && grid[row][col + 1]) {
		targetCol = col + 1;
	} else if (grid[row + 1]) {
		targetRow = row + 1;
	}

	const tileElement = document.getElementById(`${targetRow}-${targetCol}`);
	if (!tileElement) return;

	grid[targetRow][targetCol].isWall = false;
	tileElement.className = `${TILE_STYLE} animate-destroy-wall`;
	await sleep(animationDelay);
};
