import { z } from "zod";

import { getProposalesConfig } from "./config";
import { ProposalesProposalResponse, ProposalesProposalSearchResponse, ProposalSummary } from "@/types/proposal-types";

const proposalSearchResponseSchema = z.object({
  data: z.array(
    z.object({
      uuid: z.string(),
      title: z.string(),
      status: z.string(),
      version: z.number().nullable(),
      company_id: z.number(),
      url: z.string(),
      created_at: z.union([z.number(), z.string()]),
      updated_at: z.union([z.number(), z.string()]),
      data: z.object({
        booking: z
          .object({
            number: z.string().optional(),
            status: z.string().optional(),
          })
          .nullable()
          .optional(),
      }).optional(),
    })
  ),
});

const proposalResponseSchema = z.object({
  data: z.object({
    uuid: z.string(),
    title: z.string(),
    status: z.string(),
    version: z.number().nullable(),
    recipient_name: z.string().nullable(),
    recipient_company_name: z.string().nullable(),
    recipient_email: z.string().nullable(),
    currency: z.string(),
    value_with_tax: z.number(),
    value_without_tax: z.number(),
    updated_at: z.number(),
    expires_at: z.number().nullable(),
    data: z
      .object({
        booking: z
          .object({
            number: z.string().optional(),
            status: z.string().optional(),
          })
          .nullable()
          .optional(),
      })
      .optional(),
    tracking: z.record(z.string(), z.unknown()),
    blocks: z.array(z.unknown()),
    has_been_sent: z.boolean(),
    series_uuid: z.string().optional(),
  }),
});

function getHeaders() {
  const { apiKey } = getProposalesConfig();

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Proposales API returned ${response.status} for ${url}`);
  }

  return (await response.json()) as T;
}

export async function searchProposals(): Promise<ProposalSummary[]> {
  const { baseUrl } = getProposalesConfig();
  const raw = await fetchJson<unknown>(`${baseUrl}/v3/proposal-search?limit=25`);
  const result = proposalSearchResponseSchema.parse(raw) as ProposalesProposalSearchResponse;

  return result.data.map((proposal) => ({
    uuid: proposal.uuid,
    title: proposal.title,
    status: proposal.status,
    version: proposal.version,
    companyId: proposal.company_id,
    url: proposal.url,
    createdAt: String(proposal.created_at),
    updatedAt: String(proposal.updated_at),
    data: proposal.data ?? {},
  }));
}

export async function getProposal(uuid: string) {
  const { baseUrl } = getProposalesConfig();
  const raw = await fetchJson<unknown>(`${baseUrl}/v3/proposals/${uuid}`);
  const result = proposalResponseSchema.parse(raw) as ProposalesProposalResponse;

  const proposal = result.data;

  return {
    uuid: proposal.uuid,
    title: proposal.title,
    status: proposal.status,
    version: proposal.version,
    recipient: {
      name: proposal.recipient_name,
      company: proposal.recipient_company_name,
      email: proposal.recipient_email,
    },
    currency: proposal.currency,
    valueWithTax: proposal.value_with_tax / 100,
    valueWithoutTax: proposal.value_without_tax / 100,
    updatedAt: proposal.updated_at,
    expiresAt: proposal.expires_at,
    booking: proposal.data?.booking,
    tracking: proposal.tracking,
    blocks: proposal.blocks,
    hasBeenSent: proposal.has_been_sent,
    url: `https://secure.proposales.com/proposals/${proposal.uuid}/view`,
  };
}