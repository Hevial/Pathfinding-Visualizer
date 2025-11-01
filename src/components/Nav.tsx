import { usePathfinding } from "@/hooks/usePathfinding";
import { Select } from "./Select";
import { ALGORITHMS, MAZES, SPEEDS } from "@/utils/constants";
import { AlgorithmType, MazeType, SpeedType } from "@/utils/types";
import { PlayButton } from "./PlayButton";
import { useSpeed } from "@/hooks/useSpeed";
import { resetGrid } from "@/utils/resetGrid";
import { useTile } from "@/hooks/useTile";
import { useState } from "react";
import { ClearButton } from "./ClearButton";
import { runMazeAlgorithm } from "@/utils/runMazeAlgorithm";

export function Nav() {
	const { maze, setMaze, algorithm, setAlgorithm, grid } = usePathfinding();
	const { speed, setSpeed } = useSpeed();
	const { startTile, endTile } = useTile();
	const [isDisabled, setIsDisabled] = useState(false);

	const handleGenerateMaze = (maze: MazeType) => {
		if (maze === "NONE") {
			setMaze(maze);
			setIsDisabled(false);
			resetGrid({ grid, startTile, endTile });
			return;
		}

		setMaze(maze);
		setIsDisabled(true);

		console.log(maze);

		runMazeAlgorithm({
			maze,
			grid,
			startTile,
			endTile,
			speed,
			setIsDisabled,
		});
	};

	return (
		<div className=" h-fit w-full bg-card text-white flex flex-col items-center justify-center p-2 gap-3 border-b-2 border-b-accent">
			<div className="flex flex-col gap-6 lg:flex-row w-fit justify-between items-center max-w-[56rem]">
				<div className="flex justify-center items-center text-center w-full">
					Pathfinding Visualizer
				</div>

				<div className="flex flex-col gap-2 sm:flex-row justify-center items-end">
					<Select
						label="Maze"
						value={maze}
						options={MAZES}
						onChange={(val) => {
							handleGenerateMaze(val as MazeType);
						}}
					/>
					<Select
						label="Algorithm"
						value={algorithm}
						options={ALGORITHMS}
						onChange={(val) => {
							setAlgorithm(val as AlgorithmType);
							//handle maze generation
						}}
					/>
					<Select
						label="Speed"
						value={speed}
						options={SPEEDS}
						onChange={(val) => {
							setSpeed(Number(val) as SpeedType);
							//handle speed
						}}
					/>
					<div className=" mt-2 flex gap-2 justify-center items-center w-full">
						<ClearButton
							handlerClearGrid={() => {
								resetGrid({ grid, startTile, endTile });
								if (maze !== "NONE") {
									setMaze("NONE");
								}
							}}
							isDisabled={isDisabled}
							isGraphVisualized={true}
						/>
						<PlayButton
							handlerRunVisualizer={() => {
								// handler
							}}
							isDisabled={isDisabled}
							isGraphVisualized={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
