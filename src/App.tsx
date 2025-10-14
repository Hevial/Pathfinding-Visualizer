import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { SelectDemo } from "@/components/selectDemo";
import { MinimalModeToggle } from "@/components/mode-toggle-minimal";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="flex justify-center items-center flex-col h-screen gap-4">
				<h1 className=" text-3xl font-bold underline text-primar">
					Hello world!
				</h1>
				<div className="flex flex-col gap-4 justify-center items-center ">
					<div className="flex gap-2">
						<Button
							className="active:scale-95 transition-transform duration-100 ease-out"
							variant={"outline"}
							size={"default"}
						>
							Button
						</Button>
						<ModeToggle />
						<MinimalModeToggle />
					</div>

					<SelectDemo></SelectDemo>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
