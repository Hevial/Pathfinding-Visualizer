import {
	Select as ShadcnSelect,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface Option {
	label: string;
	value: string | number;
}

interface Props {
	value: string | number;
	onChange: (value: string | number) => void; // ritorna string o number
	options: Option[];
	label: string;
	isDisabled?: boolean;
}

export function Select({ value, onChange, options, label, isDisabled }: Props) {
	const [calculatedWidth, setCalculatedWidth] = useState<number>();
	const [isSmUp, setIsSmUp] = useState(window.innerWidth >= 640);

	useEffect(() => {
		const onResize = () => {
			setIsSmUp(window.innerWidth >= 640);
		};

		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	useEffect(() => {
		// Create an offscreen container to measure item widths
		const temp = document.createElement("div");
		temp.style.position = "absolute";
		temp.style.left = "-9999px";
		temp.style.top = "-9999px";
		temp.style.visibility = "hidden";
		document.body.appendChild(temp);

		let maxWidth = 0;

		options.forEach((opt) => {
			const item = document.createElement("div");
			item.style.fontSize = "14px";
			item.style.padding = "8px 12px";
			item.innerText = opt.label;
			temp.appendChild(item);

			const w = item.getBoundingClientRect().width;
			if (w > maxWidth) maxWidth = w;
		});

		document.body.removeChild(temp);

		// Add padding of the SelectTrigger
		setCalculatedWidth(maxWidth + 24);
	}, [options]);

	return (
		<div className="flex flex-col items-start gap-1 disabled:opacity-50 disabled:pointer-events-none">
			<Label className="text-muted-foreground ">{label}</Label>

			<ShadcnSelect
				value={String(value)}
				onValueChange={onChange}
				disabled={isDisabled}
			>
				<SelectTrigger
					style={{
						width: isSmUp
							? `${calculatedWidth}px` // desktop
							: "180px", // mobile
					}}
				>
					<SelectValue placeholder={`Select ${label}`} />
				</SelectTrigger>

				<SelectContent>
					{options.map((opt) => (
						<SelectItem key={opt.value} value={String(opt.value)}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</ShadcnSelect>
		</div>
	);
}
