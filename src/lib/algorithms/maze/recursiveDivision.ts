import { GridType, SpeedType, TileType } from "@/utils/types";
import { horizontalDivision } from "./horizontalDivision";
import { verticalDivision } from "./verticalDivision";

export const recursiveDivision = async ({
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
	if (width < 2 || height < 2) return;

	const params = {
		grid,
		startTile,
		endTile,
		row,
		col,
		width,
		height,
		speed,
	};

	if (height > width) {
		await horizontalDivision(params);
	} else if (height < width) {
		await verticalDivision(params);
	} else {
		const random = Math.random();
		if (random < 0.5) {
			await horizontalDivision(params);
		} else {
			await verticalDivision(params);
		}
	}
};
