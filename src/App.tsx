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
						<div className="flex flex-col items-center h-screen border-0 border-red-400">
							<Nav
								isVisualizationRunningRef={
									isVisualizationRunningRef
								}
							/>
							<div
								id="pathfinding-grid"
								className="flex justify-center items-center h-full w-full border-0 border-blue-400"
							>
								<Grid
									isVisualizationRunningRef={
										isVisualizationRunningRef
									}
								/>
							</div>
						</div>

						{/* Dev badge: always visible while app is in development phase */}
						{/* <div
							className="fixed bottom-1.5 right-1.5 z-40 px-2 py-1 text-[10px] rounded-full 
							bg-white/10 dark:bg-neutral-900/30 border border-white/20 dark:border-neutral-700/40 
							text-neutral-700 dark:text-neutral-300 shadow-md 
							backdrop-blur-md 
							flex items-center gap-1 "
						>
							<span
								className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse"
								aria-hidden="true"
							/>
							<span>Dev build</span>
						</div> */}
					</SpeedProvider>
				</TileProvider>
			</PathfindingProvider>
		</ThemeProvider>
	);
}

export default App;
