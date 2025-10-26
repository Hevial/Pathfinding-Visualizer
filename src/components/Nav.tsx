import { usePathfinding } from "@/hooks/usePathfinding";
import { Select } from "./Select";
import { ALGORITHMS, MAZES, SPEEDS } from "@/utils/constants";
import { AlgorithmType, MazeType, SpeedType } from "@/utils/types";
import { PlayButton } from "./PlayButton";
import { useSpeed } from "@/hooks/useSpeed";

export function Nav() {
	const { maze, setMaze, algorithm, setAlgorithm } = usePathfinding();
	const { speed, setSpeed } = useSpeed();

	return (
		<div className=" h-fit w-full bg-card text-white flex flex-col items-center justify-center p-2 gap-3 border-b-2 border-b-accent">
			<div className="flex flex-col gap-1 md:flex-row w-full justify-between items-center max-w-[52rem]">
				<div className="flex justify-center items-center text-center">
					Pathfinding Visualizer
				</div>

				<div className="flex flex-col gap-2 sm:flex-row justify-center items-end border">
					<Select
						label="Maze"
						value={maze}
						options={MAZES}
						onChange={(val) => {
							setMaze(val as MazeType);
							//handle maze generation
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
							setSpeed(val as SpeedType);
							//handle maze generation
						}}
					/>
					<PlayButton
						handlerRunVisualizer={() => {
							// handler
						}}
						isDisabled={false}
						isGraphVisualized={true}
					/>
				</div>
			</div>
		</div>
	);
}
