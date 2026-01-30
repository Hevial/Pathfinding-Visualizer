import {
	END_TILE_CONFIGURATION,
	START_TILE_CONFIGURATION,
} from "@/utils/constants";
import { TileType } from "@/utils/types";
import { createContext, ReactNode, useState, useEffect } from "react";
import { usePathfinding } from "@/hooks/usePathfinding";

interface TileContextInterface {
	startTile: TileType;
	setStartTile: (tile: TileType) => void;
	endTile: TileType;
	setEndTile: (tile: TileType) => void;
}

export const TileContext = createContext<TileContextInterface | undefined>(
	undefined
);

export const TileProvider = ({ children }: { children: ReactNode }) => {
	const { rows, cols } = usePathfinding();

	const initialStart = { ...START_TILE_CONFIGURATION, row: 1, col: 1 };
	const initialEnd = {
		...END_TILE_CONFIGURATION,
		row: Math.max(3, rows - 2),
		col: Math.max(3, cols - 2),
	};

	const [startTile, setStartTile] = useState<TileType>(initialStart);
	const [endTile, setEndTile] = useState<TileType>(initialEnd);

	useEffect(() => {
		setStartTile((s) => ({ ...s, row: 1, col: 1 }));
		setEndTile((e) => ({
			...e,
			row: Math.max(3, rows - 2),
			col: Math.max(3, cols - 2),
		}));
	}, [rows, cols]);

	return (
		<TileContext.Provider
			value={{
				startTile,
				setStartTile,
				endTile,
				setEndTile,
			}}
		>
			{children}
		</TileContext.Provider>
	);
};
