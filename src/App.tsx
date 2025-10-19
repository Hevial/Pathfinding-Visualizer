import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { SelectDemo } from "@/components/selectDemo";
import { MinimalModeToggle } from "@/components/mode-toggle-minimal";
import { useState } from "react";
import { Undo2 } from "lucide-react";
import { Plus } from "lucide-react";
import { PathfindingProvider } from "@/context/PathfindingContext";

function App() {
	const [counter, setCounter] = useState(0);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<PathfindingProvider>
				<div className="flex justify-center items-center flex-col h-screen gap-4">
					<span>{counter}</span>
					<h1 className=" text-3xl font-bold">Hello World!</h1>
					<div className="flex flex-col gap-4 justify-center items-center ">
						<div className="flex gap-2">
							<Button
								className="active:scale-95"
								variant={"outline"}
								size={"icon"}
								onClick={() => setCounter(counter + 1)}
							>
								<Plus />
							</Button>
							<Button
								className="active:scale-95"
								variant={"outline"}
								size={"icon"}
								onClick={() => setCounter(0)}
							>
								<Undo2 />
							</Button>
							<ModeToggle />
							<MinimalModeToggle />
						</div>

						<SelectDemo></SelectDemo>
					</div>
				</div>
			</PathfindingProvider>
		</ThemeProvider>
	);
}

export default App;
