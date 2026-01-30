import { usePathfinding } from "@/hooks/usePathfinding";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { createNewGrid, isTileStartOrEnd } from "@/utils/helpers";

export function Grid({
	isVisualizationRunningRef,
}: {
	isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
	const { grid, setGrid, rows, cols } = usePathfinding();
	const [isMouseDown, setIsMouseDown] = useState(false);

	// Handle mouse down: start drawing a wall
	const handleMouseDown = (row: number, col: number) => {
		if (
			isVisualizationRunningRef.current ||
			isTileStartOrEnd(grid[row][col])
		)
			return;

		setIsMouseDown(true);
		const newGrid = createNewGrid(grid, row, col);

		setGrid(newGrid);
	};

	// Handle mouse up: stop drawing a wall
	const handleMouseUp = (row: number, col: number) => {
		if (
			isVisualizationRunningRef.current ||
			isTileStartOrEnd(grid[row][col])
		)
			return;

		setIsMouseDown(false);
	};

	// Handle mouse enter: draw walls while dragging
	const handleMouseEnter = (row: number, col: number) => {
		if (
			isVisualizationRunningRef.current ||
			isTileStartOrEnd(grid[row][col])
		)
			return;

		if (isMouseDown) {
			const newGrid = createNewGrid(grid, row, col);
			setGrid(newGrid);
		}
	};

	return (
		<div
			className="grid h-full w-full p-4"
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${cols},  1fr)`,
				gridTemplateRows: `repeat(${rows},  1fr)`,
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
							totalRows={rows}
						/>
					);
				})
			)}
		</div>
	);
}
