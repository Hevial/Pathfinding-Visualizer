import {
	GridType,
	PathfindingAlgorithm,
	PathfindingResult,
	TileType,
} from "@/utils/types";
import { registerAlgorithm } from "./registry";
import { getUntraversedNeighbors } from "@/utils/getUntraversedNeighbors";
import { Queue } from "@/utils/Queue";

export class Bfs implements PathfindingAlgorithm {
	run(
		grid: GridType,
		startTile: TileType,
		endTile: TileType
	): PathfindingResult {
		const traversedTiles: TileType[] = [];

		// Initialize the starting tile
		const start = grid[startTile.row][startTile.col];

		// BFS queue
		const queue = new Queue<TileType>();
		queue.enqueue(start);

		// BFS main loop
		while (!queue.isEmpty()) {
			const tile = queue.dequeue()!;

			// Skip walls
			if (tile.isWall) continue;

			// Record traversal order
			tile.isTraversed = true;
			traversedTiles.push(tile);

			// Stop if the end tile is reached
			if (tile.isEnd) break;

			// Explore neighbors
			const neighbors = getUntraversedNeighbors(grid, tile);

			for (const n of neighbors) {
				// Enqueue valid, unvisited neighbors
				if (!queue.contains(n)) {
					n.parent = tile;
					queue.enqueue(n);
				}
			}
		}

		// Path reconstruction (backtracking from the end tile)
		const path: TileType[] = [];
		let tile: TileType = grid[endTile.row][endTile.col];

		if (tile.isTraversed) {
			while (tile) {
				tile.isPath = true;
				path.unshift(tile);
				tile = tile.parent!;
			}
		}

		return { traversedTiles, path };
	}
}

registerAlgorithm("BFS", Bfs);
