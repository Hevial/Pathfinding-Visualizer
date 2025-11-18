import { getUntraversedNeighbors } from "@/utils/getUntraversedNeighbors";
import {
	GridType,
	PathfindingAlgorithm,
	PathfindingResult,
	TileType,
} from "@/utils/types";
import { registerAlgorithm } from "./registry";
import { Stack } from "@/utils/Stack";

export class Dfs implements PathfindingAlgorithm {
	run(
		grid: GridType,
		startTile: TileType,
		endTile: TileType
	): PathfindingResult {
		const traversedTiles: TileType[] = [];

		// Starting tile
		const start = grid[startTile.row][startTile.col];
		const stack = new Stack<TileType>();

		stack.push(start);

		while (!stack.isEmpty()) {
			const tile = stack.pop()!;

			if (tile.isWall) continue;

			tile.isTraversed = true;
			traversedTiles.push(tile);

			// Stop if we reached the end tile
			if (tile.isEnd) break;

			// Explore neighbors
			const neighbors = getUntraversedNeighbors(grid, tile);

			for (const n of neighbors) {
				// Avoid revisiting and avoid inserting duplicates
				if (!stack.contains(n)) {
					n.parent = tile;
					stack.push(n);
				}
			}
		}

		// Backtrack the final path
		const path: TileType[] = [];
		let tile: TileType | null = grid[endTile.row][endTile.col];

		if (tile.isTraversed) {
			while (tile) {
				tile.isPath = true;
				path.unshift(tile);
				tile = tile.parent ?? null;
			}
		}

		return { traversedTiles, path };
	}
}

registerAlgorithm("DFS", Dfs);
