import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { MouseEventHandler } from "react";

interface Props {
	handlerRunVisualizer: MouseEventHandler<HTMLButtonElement>;
	isDisabled: boolean;
	isGraphVisualized: boolean;
}

export function PlayButton({
	handlerRunVisualizer,
	isDisabled,
	isGraphVisualized,
}: Props) {
	return (
		<Button
			variant="default"
			size="icon"
			onClick={handlerRunVisualizer}
			disabled={isDisabled}
			className="disabled:pointer-events-none disabled:opacity-50 transition ease-in bg-green-500 hover:bg-green-600 active:ring-green-300 focus:ring focus:ring-green-300"
		>
			{isGraphVisualized ? <RotateCcw /> : <Play />}
		</Button>
	);
}
