import {
	Select as ShadcnSelect,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
	return (
		<div className="flex flex-col gap-1 disabled:opacity-50 disabled:pointer-events-none">
			<Label className="text-muted-foreground">{label}</Label>

			<ShadcnSelect
				value={String(value)}
				onValueChange={onChange}
				disabled={isDisabled}
			>
				<SelectTrigger className="min-w-[175px]">
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
