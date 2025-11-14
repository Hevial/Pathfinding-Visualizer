import { ThemeProvider } from "@/components/theme-provider";

import { PathfindingProvider } from "@/context/PathfindingContext";
import { TileProvider } from "@/context/TileContext";
import { SpeedProvider } from "@/context/SpeedContext";
import { Grid } from "@/components/Grid";
import { useRef } from "react";
import { Nav } from "@/components/Nav";

// Import algorithms file for auto registration
import "@/lib/algorithms/pathfinding/index";

function App() {
	const isVisualizationRunningRef = useRef(false);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<PathfindingProvider>
				<TileProvider>
					<SpeedProvider>
						<div className="flex flex-col items-center h-screen w-screen">
							<Nav
								isVisualizationRunningRef={
									isVisualizationRunningRef
								}
							/>
							<div className="flex flex-col justify-center items-center h-full w-full">
								<Grid
									isVisualizationRunningRef={
										isVisualizationRunningRef
									}
								/>
							</div>
						</div>

						<div className="fixed bottom-4 right-4 text-xs text-gray-400 border-gray-600 border rounded-md p-2">
							Development Build
						</div>
					</SpeedProvider>
				</TileProvider>
			</PathfindingProvider>
		</ThemeProvider>
	);
}

export default App;
