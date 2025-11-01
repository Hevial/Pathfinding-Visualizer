import { binaryTree } from "@/lib/algorithms/maze/binaryTree";
import { GridType, MazeType, SpeedType, TileType } from "./types";

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
	}
};
