import { ThemeProvider } from "@/components/theme-provider";

import { PathfindingProvider } from "@/context/PathfindingContext";
import { TileProvider } from "@/context/TileContext";
import { SpeedProvider } from "@/context/SpeedContext";
import { Grid } from "./components/Grid";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<PathfindingProvider>
				<TileProvider>
					<SpeedProvider>
						<div className="flex justify-center items-center h-screen w-screen p-12">
							<Grid />
						</div>
					</SpeedProvider>
				</TileProvider>
			</PathfindingProvider>
		</ThemeProvider>
	);
}

export default App;
