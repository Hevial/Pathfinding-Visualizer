import { PathfindingContext } from "@/context/PathfindingContext";
import { useContext } from "react";

export const usePathfinding = () => {
	const context = useContext(PathfindingContext);

	if (!context) {
		throw new Error(
			"usePathfinding must be used within a PathfindingProvider"
		);
	}

	return context;
};
