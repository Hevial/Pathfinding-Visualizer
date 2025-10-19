import { ThemeProvider } from "@/components/theme-provider";

import { PathfindingProvider } from "@/context/PathfindingContext";
import { TileProvider } from "@/context/TileContext";
import { SpeedProvider } from "@/context/SpeedContext";
import { Test } from "@/components/Test";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<PathfindingProvider>
				<TileProvider>
					<SpeedProvider>
						<Test />
					</SpeedProvider>
				</TileProvider>
			</PathfindingProvider>
		</ThemeProvider>
	);
}

export default App;
