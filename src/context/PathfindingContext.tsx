import {
	createContext,
	ReactNode,
	useState,
	useEffect,
	useLayoutEffect,
} from "react";
import { AlgorithmType, GridType, MazeType } from "@/utils/types";
import { createGrid } from "@/utils/helpers";
import {
	END_TILE_CONFIGURATION,
	START_TILE_CONFIGURATION,
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

	const [cellSize, setCellSize] = useState<number>(16); // in pixels
	const [rows, setRows] = useState<number>(() => {
		const container =
			typeof document !== "undefined"
				? document.getElementById("pathfinding-grid")
				: null;
		const height =
			container?.clientHeight ??
			(typeof window !== "undefined" ? window.innerHeight : 0);
		let calculatedRows = Math.floor(height / cellSize);
		return calculatedRows % 2 === 0 ? calculatedRows + 1 : calculatedRows;
	});
	const [cols, setCols] = useState<number>(() => {
		const container =
			typeof document !== "undefined"
				? document.getElementById("pathfinding-grid")
				: null;
		const width =
			container?.clientWidth ??
			(typeof window !== "undefined" ? window.innerWidth : 0);
		let calculatedCols = Math.floor(width / cellSize);
		return calculatedCols % 2 === 0 ? calculatedCols + 1 : calculatedCols;
	});
	const startTileInitial = {
		...START_TILE_CONFIGURATION,
		row: 1,
		col: 1,
	};

	const endTileInitial = {
		...END_TILE_CONFIGURATION,
		row: rows - 2,
		col: cols - 2,
	};

	const [grid, setGrid] = useState<GridType>(
		createGrid(startTileInitial, endTileInitial, rows, cols)
	);
	const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

	useLayoutEffect(() => {
		const updateGridDimensions = () => {
			const container = document.getElementById("pathfinding-grid");
			if (!container) return;

			let calculatedRows = Math.floor(container.clientHeight / cellSize);
			calculatedRows =
				calculatedRows % 2 === 0 ? calculatedRows + 1 : calculatedRows;

			let calculatedCols = Math.floor(container.clientWidth / cellSize);
			calculatedCols =
				calculatedCols % 2 === 0 ? calculatedCols + 1 : calculatedCols;

			setRows(calculatedRows);
			setCols(calculatedCols);
			const startTileConfig = {
				...START_TILE_CONFIGURATION,
				row: 1,
				col: 1,
			};

			const endTileConfig = {
				...END_TILE_CONFIGURATION,
				row: calculatedRows - 2,
				col: calculatedCols - 2,
			};

			const newGrid = createGrid(
				startTileConfig,
				endTileConfig,
				calculatedRows,
				calculatedCols
			);
			setGrid(newGrid);
		};

		// Ricalcola subito quando il provider viene montato o quando cellSize cambia
		updateGridDimensions();

		// Ricalcola anche al resize della finestra, con debounce per performance
		const DEBOUNCE_MS = 10;
		let resizeTimer: ReturnType<typeof setTimeout> | null = null;

		const debouncedResize = () => {
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				updateGridDimensions();
				resizeTimer = null;
			}, DEBOUNCE_MS);
		};

		// Ricalcola anche al resize della finestra
		window.addEventListener("resize", debouncedResize);
		return () => {
			if (resizeTimer) clearTimeout(resizeTimer);
			window.removeEventListener("resize", debouncedResize);
		};
	}, [cellSize]);

	// Aggiorna la grid quando rows/cols cambiano (assicura sync tra grid e dimensioni)
	useEffect(() => {
		if (rows <= 0 || cols <= 0) return;

		const startTileConfig = {
			...START_TILE_CONFIGURATION,
			row: 1,
			col: 1,
		};

		const endTileConfig = {
			...END_TILE_CONFIGURATION,
			row: Math.max(3, rows - 2),
			col: Math.max(3, cols - 2),
		};

		const newGrid = createGrid(startTileConfig, endTileConfig, rows, cols);
		setGrid(newGrid);
	}, [rows, cols]);

	useEffect(() => {
		// Debug: logga lo stato aggiornato dopo che rows/cols/cellSize cambiano
		console.log("Grid dimensions updated:", {
			cellSize,
			rows,
			cols,
		});
	}, [cellSize, rows, cols]);

	return (
		<PathfindingContext.Provider
			value={{
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
			}}
		>
			{children}
		</PathfindingContext.Provider>
	);
};
