"use client";

import { useEffect, useMemo, useState } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";

import { ChatPanel } from "../copilot/chat-panel";
import { DashboardHeader } from "./header";
import { ProposalCard } from "./proposal-card";
import type { ChatMessageItem, Proposal } from "@/types/proposal-types";
import { StatsGrid } from "./stats-grid";

export function ProposalDashboard() {
	const [proposals, setProposals] = useState<Proposal[]>([]);
	const [loading, setLoading] = useState(true);
	const [input, setInput] = useState("");
	const [error, setError] = useState<string | null>(null);

	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
	});

	useEffect(() => {
		async function loadProposals() {
			try {
				const response = await fetch("/api/proposals");

				if (!response.ok) {
					throw new Error("Failed to load proposals");
				}

				const result = await response.json();
				setProposals(result.proposals ?? []);
				setError(null);
			} catch (loadError) {
				console.error(loadError);
				setError("We couldn’t load your proposals right now.");
			} finally {
				setLoading(false);
			}
		}

		loadProposals();
	}, []);

	const stats = useMemo(() => {
		const nextStats = {
			active: 0,
			accepted: 0,
			rejected: 0,
		};

		for (const proposal of proposals) {
			if (proposal.status in nextStats) {
				nextStats[proposal.status as keyof typeof nextStats] += 1;
			}
		}

		return {
			...nextStats,
			total: proposals.length,
		};
	}, [proposals]);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const text = input.trim();

		if (!text || status !== "ready") {
			return;
		}

		sendMessage({ text });
		setInput("");
	}

	if (loading) {
		return (
			<main className="min-h-screen bg-gray-50 p-8 text-gray-900">
				<div className="mx-auto max-w-7xl">Loading proposals...</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-gray-50 p-6 text-gray-900 md:p-8">
			<div className="mx-auto max-w-7xl">
				<DashboardHeader />

				<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
					<section>
						<StatsGrid stats={stats} />

						<section className="mt-10">
							<div className="flex items-center justify-between gap-4">
								<h2 className="text-xl font-semibold text-gray-900">
									Proposals
								</h2>
								<span className="text-sm text-gray-500">
									{proposals.length} total
								</span>
							</div>

							{error ? (
								<div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
									{error}
								</div>
							) : proposals.length === 0 ? (
								<div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
									No proposals available.
								</div>
							) : (
								<div className="mt-4 space-y-4">
									{proposals.map((proposal) => (
										<ProposalCard key={proposal.uuid} proposal={proposal} />
									))}
								</div>
							)}
						</section>
					</section>

					<ChatPanel
						messages={messages as ChatMessageItem[]}
						status={status}
						input={input}
						onInputChange={setInput}
						onSubmit={handleSubmit}
						onQuestion={(question) => sendMessage({ text: question })}
					/>
				</div>
			</div>
		</main>
	);
}
