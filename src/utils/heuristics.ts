import { GridType, TileType } from "./types";

const manhattanDistance = (tileA: TileType, tileB: TileType) => {
	const dx = Math.abs(tileA.col - tileB.col);
	const dy = Math.abs(tileA.row - tileB.row);
	return dx + dy;
};

/**
 * Initializes a 2D array representing the heuristic cost (using Manhattan distance)
 * from each tile in the grid to the specified end tile.
 *
 * @param grid - The 2D array of tiles representing the grid.
 * @param endTile - The target tile to which the heuristic cost is calculated.
 * @returns {number[][]} A 2D array of numbers where each entry corresponds to the Manhattan distance
 *          from the respective tile in the grid to the end tile.
 */
export const initHeuristicCost = (
	grid: GridType,
	endTile: TileType
): number[][] => {
	const heuristicCost = [];
	const rows = grid.length;
	const cols = grid[0].length;

	for (let i = 0; i < rows; i++) {
		const row = [];

		for (let j = 0; j < cols; j++) {
			row.push(manhattanDistance(grid[i][j], endTile));
		}
		heuristicCost.push(row);
	}

	return heuristicCost;
};

/**
 * Initializes a 2D array of function costs for pathfinding algorithm.
 * Each cell in the grid is set to Infinity as the initial cost value.
 *
 * @returns {number[][]} A 2D array of dimensions rows × cols with all values set to Infinity.
 */
export const initFunctionCost = (grid: GridType): number[][] => {
	const functionCost = [];
	const rows = grid.length;
	const cols = grid[0].length;

	for (let i = 0; i < rows; i++) {
		const row = [];
		for (let j = 0; j < cols; j++) {
			row.push(Infinity);
		}
		functionCost.push(row);
	}

	return functionCost;
};
