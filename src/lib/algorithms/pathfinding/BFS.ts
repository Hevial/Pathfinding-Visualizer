import {
	GridType,
	PathfindingAlgorithm,
	PathfindingResult,
	TileType,
} from "@/utils/types";
import { registerAlgorithm } from "./registry";
import { getUntraversedNeighbors } from "@/utils/getUntraversedNeighbors";
import { isInQueue } from "@/utils/isInQueue";

export class BFS implements PathfindingAlgorithm {
	run(
		grid: GridType,
		startTile: TileType,
		endTile: TileType
	): PathfindingResult {
		const traversedTiles: TileType[] = [];
		const base = grid[startTile.row][startTile.col]; // Get the start tile from the grid
		base.distance = 0;
		base.isTraversed = true;

		const unTraversed = [base]; // Initialize the queue with the start tile

		while (unTraversed.length > 0) {
			const tile = unTraversed.shift() as TileType; // Get the first tile from the queue
			if (tile.isWall) continue;
			if (tile.distance === Infinity) break;
			tile.isTraversed = true;
			traversedTiles.push(tile);
			if (tile.isEnd) break;

			const neighbors = getUntraversedNeighbors(grid, tile);

			for (let i = 0; i < neighbors.length; i++) {
				if (!isInQueue(neighbors[i], unTraversed)) {
					const n = neighbors[i];
					n.distance = tile.distance + 1;
					n.parent = tile;
					unTraversed.push(n);
				}
			}
		}

		const path: TileType[] = [];
		let tile: TileType = grid[endTile.row][endTile.col]; // start from the end tile

		while (tile != null) {
			// Backtrack until the start tile
			tile.isPath = true;
			path.unshift(tile);
			tile = tile.parent!;
		}

		return { traversedTiles, path };
	}
}

registerAlgorithm("BFS", BFS);
