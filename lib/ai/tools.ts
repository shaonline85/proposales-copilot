import { tool } from "ai";
import {
  searchProposals,
  getProposal,
} from "@/lib/proposales";
import { z } from "zod";

export const proposalTools = {
      searchProposals: tool({
        description:
          "Search and retrieve the user's current proposals from Proposales. Use this whenever the user asks about proposals, statuses, counts, active proposals, accepted proposals, or which proposals need attention.",

        inputSchema: z.object({}),

        execute: async () => {
          const proposals = await searchProposals();

          return proposals;
        },
      }),

      getProposal: tool({
        description:
          "Retrieve the complete details of a specific Proposales proposal using its UUID. Use this after searchProposals when detailed information about one proposal is required.",

        inputSchema: z.object({
          uuid: z
            .string()
            .describe("The UUID of the Proposales proposal"),
        }),

        execute: async ({ uuid }) => {
          const proposal = await getProposal(uuid);

          return proposal;
        },
      }),
    }