import { getUntraversedNeighbors } from "@/utils/getUntraversedNeighbors";
import { isEqual } from "@/utils/helpers";
import { MinHeap } from "@/utils/MinHeap";
import {
	GridType,
	PathfindingAlgorithm,
	PathfindingResult,
	TileType,
} from "@/utils/types";
import { registerAlgorithm } from "./registry";

export class Dijkstra implements PathfindingAlgorithm {
	run(
		grid: GridType,
		startTile: TileType,
		endTile: TileType
	): PathfindingResult {
		const traversedTiles: TileType[] = [];

		// Initialize the starting tile
		const start = grid[startTile.row][startTile.col];
		start.isTraversed = true;
		start.distance = 0;

		const heap = new MinHeap<TileType>((a, b) => a.distance - b.distance);
		heap.insert(start);

		while (!heap.isEmpty()) {
			const tile = heap.extractMin();

			if (tile === undefined) continue;
			if (tile.isWall) continue;
			if (tile.distance === Infinity) break;

			tile.isTraversed = true;
			traversedTiles.push(tile);
			if (isEqual(tile, endTile)) break;

			const neighbors = getUntraversedNeighbors(grid, tile);

			for (const n of neighbors) {
				if (tile.distance + 1 < n.distance) {
					n.distance = tile.distance + 1;
					n.parent = tile;

					if (!heap.contains(n)) {
						heap.insert(n); // if not in heap, add it
					} else {
						heap.decreaseKey(n); // if in heap, update it
					}
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

registerAlgorithm("DIJKSTRA", Dijkstra);
