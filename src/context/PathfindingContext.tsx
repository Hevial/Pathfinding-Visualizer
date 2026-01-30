import {
	createContext,
	ReactNode,
	useState,
	useLayoutEffect,
	useMemo,
} from "react";
import { AlgorithmType, GridType, MazeType } from "@/utils/types";
import {
	calculateOddCellCount,
	createGrid,
	createTileConfigs,
} from "@/utils/helpers";
import {
	DEFAULT_CELL_SIZE,
	GRID_CONTAINER_ID,
	RESIZE_DEBOUNCE_MS,
} from "@/utils/constants";

interface PathfindingContextInterface {
	algorithm: AlgorithmType;
	setAlgorithm: (algorithm: AlgorithmType) => void;
	maze: MazeType;
	setMaze: (maze: MazeType) => void;
	grid: GridType;
	setGrid: (grid: GridType) => void;
	isGraphVisualized: boolean;
	setIsGraphVisualized: (isVisualizing: boolean) => void;
	cellSize: number;
	setCellSize: (size: number) => void;
	rows: number;
	setRows: (rows: number) => void;
	cols: number;
	setCols: (cols: number) => void;
}

export const PathfindingContext = createContext<
	PathfindingContextInterface | undefined
>(undefined);

export const PathfindingProvider = ({ children }: { children: ReactNode }) => {
	const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
	const [maze, setMaze] = useState<MazeType>("NONE");

	const [cellSize, setCellSize] = useState<number>(DEFAULT_CELL_SIZE);
	const [rows, setRows] = useState<number>(0);
	const [cols, setCols] = useState<number>(0);
	const [grid, setGrid] = useState<GridType>([]);
	const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

	// Recalculate grid dimensions on mount and when cellSize changes
	useLayoutEffect(() => {
		const updateGridDimensions = () => {
			const container = document.getElementById(GRID_CONTAINER_ID);
			if (!container) return;

			const calculatedRows = calculateOddCellCount(
				cellSize,
				container.clientHeight
			);

			const calculatedCols = calculateOddCellCount(
				cellSize,
				container.clientWidth
			);

			setRows(calculatedRows);
			setCols(calculatedCols);

			const { startTileConfig, endTileConfig } = createTileConfigs(
				calculatedRows,
				calculatedCols
			);

			const newGrid = createGrid(
				startTileConfig,
				endTileConfig,
				calculatedRows,
				calculatedCols
			);
			setGrid(newGrid);
		};

		// Initial calculation
		updateGridDimensions();

		// Debounced resize handler for performance optimization
		let resizeTimer: ReturnType<typeof setTimeout> | null = null;

		const handleResize = () => {
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				updateGridDimensions();
				resizeTimer = null;
			}, RESIZE_DEBOUNCE_MS);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			if (resizeTimer) clearTimeout(resizeTimer);
			window.removeEventListener("resize", handleResize);
		};
	}, [cellSize]);

	const contextValue = useMemo(
		() => ({
			algorithm,
			setAlgorithm,
			maze,
			setMaze,
			grid,
			setGrid,
			isGraphVisualized,
			setIsGraphVisualized,
			cellSize,
			setCellSize,
			rows,
			setRows,
			cols,
			setCols,
		}),
		[algorithm, maze, grid, isGraphVisualized, cellSize, rows, cols]
	);

	return (
		<PathfindingContext.Provider value={contextValue}>
			{children}
		</PathfindingContext.Provider>
	);
};
