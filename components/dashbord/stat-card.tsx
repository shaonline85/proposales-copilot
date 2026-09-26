export function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-xl border bg-white p-5 shadow-sm">
			<div className="text-sm text-gray-500">{label}</div>
			<div className="mt-2 text-3xl font-bold text-gray-900">{value}</div>
		</div>
	);
}
