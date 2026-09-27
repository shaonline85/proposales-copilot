export function StatusBadge({ status }: { status: string }) {
	const normalizedStatus = status.toLowerCase();
	const statusClasses: Record<string, string> = {
		active: "bg-emerald-100 text-emerald-700",
		accepted: "bg-green-100 text-green-700",
		rejected: "bg-red-100 text-red-700",
		default: "bg-gray-100 text-gray-700",
	};

	return (
		<span
			className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
				statusClasses[normalizedStatus] ?? statusClasses.default
			}`}
		>
			{status}
		</span>
	);
}
