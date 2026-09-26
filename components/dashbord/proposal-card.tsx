import { StatusBadge } from "./status-badge";
import type { ProposalSummary } from "@/types/proposal-types";

function formatDate(timestamp: number) {
	return new Date(timestamp).toLocaleDateString("en-SE", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function ProposalCard({ proposal }: { proposal: ProposalSummary }) {
	return (
		<article className="rounded-xl border bg-white p-6 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h3 className="text-lg font-semibold text-gray-900">
						{proposal.title}
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						Version {proposal.version ?? "—"}
					</p>
				</div>

				<StatusBadge status={proposal.status} />
			</div>

			<div className="mt-5 grid grid-cols-2 gap-4">
				<div>
					<div className="text-sm text-gray-500">Booking</div>
					<div className="mt-1 font-medium text-gray-900">
						{proposal.data.booking?.number ?? "—"}
					</div>
				</div>

				<div>
					<div className="text-sm text-gray-500">Booking status</div>
					<div className="mt-1 font-medium capitalize text-gray-900">
						{proposal.data.booking?.status ?? "—"}
					</div>
				</div>
			</div>

			<div className="mt-5 flex items-center justify-between gap-4">
				<span className="text-sm text-gray-500">
					Created {formatDate(proposal.createdAt)}
				</span>

				<a
					href={proposal.url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm font-medium text-gray-900 underline underline-offset-2"
				>
					View proposal →
				</a>
			</div>
		</article>
	);
}
