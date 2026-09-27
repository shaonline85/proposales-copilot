import { StatCard } from "./stat-card";
import type { ProposalStats } from "@/types/proposal-types";

export function StatsGrid({ stats }: { stats: ProposalStats }) {
	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
			<StatCard label="Active" value={stats.active} />
			<StatCard label="Accepted" value={stats.accepted} />
			<StatCard label="Rejected" value={stats.rejected} />
			<StatCard label="Total" value={stats.total} />
		</div>
	);
}
