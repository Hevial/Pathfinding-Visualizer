import {
	EXTENDED_SLEEP_TIME,
	PATH_TILE_STYLE,
	SLEEP_TIME,
	SPEEDS,
	TRAVERSED_TILE_STYLE,
} from "./constants";
import { isEqual } from "./helpers";
import { SpeedType, TileType } from "./types";

export const animatePath = (
	traversedTiles: TileType[],
	path: TileType[],
	startTile: TileType,
	endTile: TileType,
	speed: SpeedType
) => {
	const speedVal = SPEEDS.find((s) => s.value === speed)!.value;

	for (let i = 0; i < traversedTiles.length; i++) {
		const tile = traversedTiles[i];
		const isStartOrEnd = isEqual(tile, startTile) || isEqual(tile, endTile);

		if (isStartOrEnd) continue;

		setTimeout(() => {
			document
				.getElementById(`${tile.row}-${tile.col}`)!
				.classList.add(
					...TRAVERSED_TILE_STYLE.split(" "),
					"animate-traversed"
				);
		}, SLEEP_TIME * i * speedVal);
	}

	const delayBeforePath = SLEEP_TIME * (traversedTiles.length - 1) * speedVal;

	for (let i = 0; i < path.length; i++) {
		const tile = path[i];
		const isStartOrEnd = isEqual(tile, startTile) || isEqual(tile, endTile);

		if (isStartOrEnd) continue;

		setTimeout(() => {
			document.getElementById(
				`${tile.row}-${tile.col}`
			)!.className = `${PATH_TILE_STYLE} animate-path`;
		}, delayBeforePath + EXTENDED_SLEEP_TIME * i * speedVal);
	}
};
