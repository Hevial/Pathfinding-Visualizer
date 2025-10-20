import { usePathfinding } from "@/hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "@/utils/constants";
import { Tile } from "./Tile";

export function Grid() {
	const { grid } = usePathfinding();

	return (
		<div
			className="grid aspect-square w-full max-w-[90vmin]"
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${MAX_COLS},  minmax(0, 1fr))`,
				gridTemplateRows: `repeat(${MAX_ROWS},  minmax(0, 1fr))`,
			}}
		>
			{grid.map((row) =>
				row.map((tile) => {
					const { isStart, isEnd, isWall, isTraversed, isPath } =
						tile;

					return (
						<Tile
							key={`${tile.row}-${tile.col}`}
							row={tile.row}
							col={tile.col}
							isStart={isStart}
							isEnd={isEnd}
							isWall={isWall}
							isTraversed={isTraversed}
							isPath={isPath}
						/>
					);
				})
			)}
		</div>
	);
}
