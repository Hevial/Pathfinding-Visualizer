import { binaryTree } from "@/lib/algorithms/maze/binaryTree";
import { GridType, MazeType, SpeedType, TileType } from "./types";
import { constructBorder } from "./constructBorder";
import { MAX_COLS, MAX_ROWS, SPEEDS } from "./constants";
import { recursiveDivision } from "@/lib/algorithms/maze/recursiveDivision";
import { sleep } from "./helpers";

export const runMazeAlgorithm = async ({
	maze,
	grid,
	startTile,
	endTile,
	speed,
	setIsDisabled,
}: {
	maze: MazeType;
	grid: GridType;
	startTile: TileType;
	endTile: TileType;
	speed: SpeedType;
	setIsDisabled: (value: boolean) => void;
}) => {
	if (maze === "BINARY_TREE") {
		await binaryTree({ grid, startTile, endTile, speed, setIsDisabled });
	} else if (maze === "RECURSIVE_DIVISION") {
		await constructBorder(grid, startTile, endTile);
		await recursiveDivision({
			grid,
			startTile,
			endTile,
			row: 1,
			col: 1,
			width: MAX_COLS - 2,
			height: MAX_ROWS - 2,
			speed,
		});

		await sleep(800 * SPEEDS.find((s) => s.value === speed)!.value);

		setIsDisabled(false);
	}
};
