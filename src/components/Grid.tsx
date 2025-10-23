import { usePathfinding } from "@/hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "@/utils/constants";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "@/utils/helpers";

export function Grid({
	isVisualizationRunningRef,
}: {
	isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
	const { grid, setGrid } = usePathfinding();
	const [isMouseDown, setIsMouseDown] = useState(false);

	// Handle mouse down: start drawing a wall
	const handleMouseDown = (row: number, col: number) => {
		if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col))
			return;

		setIsMouseDown(true);
		const newGrid = createNewGrid(grid, row, col);

		setGrid(newGrid);
	};

	// Handle mouse up: stop drawing a wall
	const handleMouseUp = (row: number, col: number) => {
		if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col))
			return;

		setIsMouseDown(false);
	};

	// Handle mouse enter: draw walls while dragging
	const handleMouseEnter = (row: number, col: number) => {
		if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col))
			return;

		if (isMouseDown) {
			const newGrid = createNewGrid(grid, row, col);
			setGrid(newGrid);
		}
	};

	return (
		<div
			className="grid aspect-square w-full max-w-[90vmin]"
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${MAX_COLS},  minmax(0, 1fr))`,
				gridTemplateRows: `repeat(${MAX_ROWS},  minmax(0, 1fr))`,
			}}
		>
			{grid.map((r) =>
				r.map((tile) => {
					const {
						row,
						col,
						isStart,
						isEnd,
						isWall,
						isTraversed,
						isPath,
					} = tile;

					return (
						<Tile
							key={`${row}-${col}`}
							row={row}
							col={col}
							isStart={isStart}
							isEnd={isEnd}
							isWall={isWall}
							isTraversed={isTraversed}
							isPath={isPath}
							onMouseDown={() => handleMouseDown(row, col)}
							onMouseUp={() => handleMouseUp(row, col)}
							onMouseEnter={() => handleMouseEnter(row, col)}
						/>
					);
				})
			)}
		</div>
	);
}
