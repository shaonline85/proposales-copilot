import { ProposalCard } from "./proposal-card";
import type { ProposalSummary } from "@/types/proposal-types";

type ProposalListStateProps = {
	loading: boolean;
	error: string | null;
	proposals: ProposalSummary[];
};

export function ProposalListState({
	loading,
	error,
	proposals,
}: ProposalListStateProps) {
	if (loading) {
		return <div role="status">Loading proposals...</div>;
	}

	if (error) {
		return (
			<div
				role="alert"
				className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
			>
				{error}
			</div>
		);
	}

	if (proposals.length === 0) {
		return (
			<div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
				No proposals available.
			</div>
		);
	}

	return (
		<div className="mt-4 space-y-4">
			{proposals.map((proposal) => (
				<ProposalCard key={proposal.uuid} proposal={proposal} />
			))}
		</div>
	);
}