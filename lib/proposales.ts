
const PROPOSALES_API_URL = process.env.PROPOSALES_API_URL;

function getHeaders() {
  const apiKey = process.env.PROPOSALES_API_KEY;

  if (!apiKey) {
    throw new Error("PROPOSALES_API_KEY is not configured");
  }

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

export async function searchProposals() {
  const response = await fetch(
    `${PROPOSALES_API_URL}/v3/proposal-search?limit=25`,
    {
      headers: getHeaders(),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Proposales API returned ${response.status}`
    );
  }

  const result = await response.json();

  return result.data.map((proposal: any) => ({
    uuid: proposal.uuid,
    title: proposal.title,
    status: proposal.status,
    version: proposal.version,
    companyId: proposal.company_id,
    url: proposal.url,
    createdAt: proposal.created_at,
    updatedAt: proposal.updated_at,
    data: proposal.data,
  }));
}

export async function getProposal(uuid: string) {
  const response = await fetch(
    `${PROPOSALES_API_URL}/v3/proposals/${uuid}`,
    {
      headers: getHeaders(),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Proposales API returned ${response.status}`
    );
  }

  const proposal = await response.json();

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

    createdAt: proposal.created_at,
    updatedAt: proposal.updated_at,
    expiresAt: proposal.expires_at,

    booking: proposal.data?.booking,

    tracking: proposal.tracking,

    url: `https://secure.proposales.com/proposals/${proposal.uuid}/view`,
  };
  // return result.data;
}