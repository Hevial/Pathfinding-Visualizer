import { GridType, TileType } from "./types";

export const getUntraversedNeighbors = (grid: GridType, tile: TileType) => {
	const rows = grid.length;
	const cols = grid[0].length;
	const { row, col } = tile;
	const neighbors: TileType[] = [];

	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < rows - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < cols - 1) neighbors.push(grid[row][col + 1]);

	return neighbors.filter((neighbor) => !neighbor.isTraversed);
};
