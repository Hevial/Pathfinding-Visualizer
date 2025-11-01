import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

interface Props {
	handlerClearGrid: () => void;
	isDisabled: boolean;
	isGraphVisualized: boolean;
}

export function ClearButton({
	handlerClearGrid,
	isDisabled,
	isGraphVisualized,
}: Props) {
	return (
		<Button
			variant="default"
			size="icon"
			onClick={() => handlerClearGrid()}
			disabled={isDisabled || !isGraphVisualized}
			className="sm:w-fit sm:px-4 sm:py-2 font-medium disabled:pointer-events-none disabled:opacity-50 transition ease-in bg-green-500 hover:bg-green-600 active:ring-green-300 focus:ring focus:ring-green-300"
		>
			<Eraser aria-hidden="true" />
			<span className="hidden sm:inline uppercase font-medium">
				CLEAR
			</span>
		</Button>
	);
}
