import { TileContext } from "@/context/TileContext";
import { useContext } from "react";

export const useTile = () => {
	const tileContext = useContext(TileContext);

	if (!tileContext) {
		throw new Error("useTile must be used within a TileProvider");
	}

	return tileContext;
};
