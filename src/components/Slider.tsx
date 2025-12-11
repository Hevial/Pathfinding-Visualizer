import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface Props {
	onChange: (value: number) => void;
	label: string;
	min: number;
	max: number;
	step: number;
	defaulValue: number[];
	isDisabled: boolean;
	rows: number;
	cols: number;
}

export function Slider({
	onChange,
	label,
	min,
	max,
	step,
	defaulValue,
	isDisabled,
	rows,
	cols,
}: Props) {
	return (
		<div className="flex flex-col items-start justify-center gap-1 disabled:opacity-50 disabled:pointer-events-none">
			<div className="text-muted-foreground mb-2 flex justify-between items-end w-full">
				<Label>{label}</Label>
				<Label>{`${rows}x${cols}`}</Label>
			</div>

			<ShadcnSlider
				className="w-full sm:w-36"
				defaultValue={defaulValue}
				min={min}
				max={max}
				step={step}
				onValueChange={(val) => onChange(Number(val))}
				disabled={isDisabled}
			/>
		</div>
	);
}
