import {
	PathfindingAlgorithm,
	GridType,
	TileType,
	PathfindingResult,
} from "@/utils/types";
import { registerAlgorithm } from "./registry";
import { initHeuristicCost, initFunctionCost } from "@/utils/heuristics";
import { MinHeap } from "@/utils/MinHeap";
import { isEqual } from "@/utils/helpers";
import { getUntraversedNeighbors } from "@/utils/getUntraversedNeighbors";

export class AStar implements PathfindingAlgorithm {
	run(
		grid: GridType,
		startTile: TileType,
		endTile: TileType
	): PathfindingResult {
		const traversedTiles: TileType[] = [];
		const heuristicCost = initHeuristicCost(grid, endTile); // Initialize the heuristic cost for each tile
		const functionCost = initFunctionCost(); // Initialize the function cost for each tile

		// Initialize the starting tile
		const start = grid[startTile.row][startTile.col];
		start.isTraversed = true;
		start.distance = 0;
		functionCost[start.row][start.col] =
			start.distance + heuristicCost[start.row][start.col];

		const heap: MinHeap<TileType> = new MinHeap((a, b) => {
			if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
				// In a tie, choose the path which has made the most progress
				// so far, i.e. the one with the shortest heuristic distance
				// remaining.
				// For example, if two tiles have the same total cost (f-score),
				// prefer the one that is closer to the goal (lower heuristic value).
				// This helps the algorithm prioritize paths that are more likely
				// to reach the end sooner and can improve performance in some grids.
				return b.distance - a.distance;
			}

			return functionCost[a.row][a.col] - functionCost[b.row][b.col];
		});
		heap.insert(start);

		while (!heap.isEmpty()) {
			const currentTile = heap.extractMin();
			if (!currentTile) continue;

			if (currentTile.isWall) continue;
			if (currentTile.distance === Infinity) break; // All remaining tiles are inaccessible

			currentTile.isTraversed = true;
			traversedTiles.push(currentTile);
			if (isEqual(currentTile, endTile)) break; // Reached the end tile

			const neighbors = getUntraversedNeighbors(grid, currentTile);

			for (const n of neighbors) {
				const tentativeGCost = currentTile.distance + 1; // Assuming uniform cost for each step

				if (tentativeGCost < n.distance) {
					n.distance = tentativeGCost;
					functionCost[n.row][n.col] =
						n.distance + heuristicCost[n.row][n.col];
					n.parent = currentTile;

					if (heap.contains(n)) {
						heap.decreaseKey(n);
					} else {
						heap.insert(n);
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

registerAlgorithm("A_STAR", AStar);
