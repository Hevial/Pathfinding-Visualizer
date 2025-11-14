import { getAlgorithm } from "@/lib/algorithms/pathfinding/registry";
import { AlgorithmType, GridType, PathfindingResult, TileType } from "./types";

export const runPanthfindingAlgoritm = ({
	algorithm,
	grid,
	startTile,
	endTile,
}: {
	algorithm: AlgorithmType;
	grid: GridType;
	startTile: TileType;
	endTile: TileType;
}): PathfindingResult => {
	const algo = getAlgorithm(algorithm);
	return algo.run(grid, startTile, endTile);
};
