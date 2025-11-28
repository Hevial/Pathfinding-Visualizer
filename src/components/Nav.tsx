import { usePathfinding } from "@/hooks/usePathfinding";
import { Select } from "./Select";
import {
	ALGORITHMS,
	EXTENDED_SLEEP_TIME,
	MAZES,
	SLEEP_TIME,
	SPEEDS,
} from "@/utils/constants";
import { AlgorithmType, MazeType, SpeedType } from "@/utils/types";
import { PlayButton } from "./PlayButton";
import { useSpeed } from "@/hooks/useSpeed";
import { resetGrid } from "@/utils/resetGrid";
import { useTile } from "@/hooks/useTile";
import { MutableRefObject, useState } from "react";
import { ClearButton } from "./ClearButton";
import { runMazeAlgorithm } from "@/utils/runMazeAlgorithm";
import { runPanthfindingAlgoritm } from "@/utils/runPathfindingAlgorithm";
import { animatePath } from "@/utils/animatePath";
import { resetGridPath } from "@/utils/resetGridPath";

export function Nav({
	isVisualizationRunningRef,
}: {
	isVisualizationRunningRef: MutableRefObject<boolean>;
}) {
	const {
		maze,
		setMaze,
		algorithm,
		setAlgorithm,
		grid,
		setGrid,
		isGraphVisualized,
		setIsGraphVisualized,
	} = usePathfinding();
	const { speed, setSpeed } = useSpeed();
	const { startTile, endTile } = useTile();
	const [isDisabled, setIsDisabled] = useState(false);

	const handleGenerateMaze = (maze: MazeType) => {
		setIsGraphVisualized(false);
		resetGrid({ grid, startTile, endTile });

		if (maze === "NONE") {
			setMaze(maze);
			setIsDisabled(false);
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

		const newGrid = grid.slice();
		setGrid(newGrid);
		setIsGraphVisualized(false);
	};

	const handlerRunVisualizer = () => {
		if (isGraphVisualized) {
			setIsGraphVisualized(false);
			resetGridPath({ grid: grid.slice(), startTile, endTile });
			return;
		}

		const { traversedTiles, path } = runPanthfindingAlgoritm({
			algorithm,
			grid,
			startTile,
			endTile,
		});

		animatePath(traversedTiles, path, startTile, endTile, speed);
		setIsDisabled(true);
		isVisualizationRunningRef.current = true;

		const speedVal = SPEEDS.find((s) => s.value === speed)!.value;
		const traversedTime =
			SLEEP_TIME * traversedTiles.length * speedVal + 1500;
		const pathTime = EXTENDED_SLEEP_TIME * path.length * speedVal + 500;

		setTimeout(() => {
			const newGrid = grid.slice();
			setGrid(newGrid);
			setIsGraphVisualized(true);
			setIsDisabled(false);
			isVisualizationRunningRef.current = false;
		}, traversedTime + pathTime);
	};

	return (
		<div className=" h-fit w-full bg-card text-white flex flex-col items-center justify-center p-2 gap-3 border-b-2 border-b-accent">
			<div className="flex flex-col gap-6 lg:flex-row w-full justify-between items-center max-w-[52rem]">
				<div className="flex justify-center items-center text-center w-fit">
					Pathfinding Visualizer
				</div>

				<div className="flex flex-col gap-2 sm:flex-row justify-center items-end">
					<Select
						label="Maze"
						value={maze}
						options={MAZES}
						isDisabled={isDisabled}
						onChange={(val) => {
							handleGenerateMaze(val as MazeType);
						}}
					/>
					<Select
						label="Algorithm"
						value={algorithm}
						options={ALGORITHMS}
						isDisabled={isDisabled}
						onChange={(val) => {
							setAlgorithm(val as AlgorithmType);
							//handle maze generation
						}}
					/>
					<Select
						label="Speed"
						value={speed}
						options={SPEEDS}
						isDisabled={isDisabled}
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
								setIsGraphVisualized(false);
							}}
							isDisabled={isDisabled}
						/>
						<PlayButton
							handlerRunVisualizer={handlerRunVisualizer}
							isDisabled={isDisabled}
							isGraphVisualized={isGraphVisualized}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
