import { SpeedContext } from "@/context/SpeedContext";
import { useContext } from "react";

export const useSpeed = () => {
	const speedContext = useContext(SpeedContext);

	if (!speedContext) {
		throw new Error("useSpeed must be used within a SpeedProvider");
	}

	return speedContext;
};
