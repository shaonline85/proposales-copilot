export type ProposalesProposalSearchItem = {
  uuid: string;
  title: string;
  status: string;
  version: number;
  company_id: number;
  url: string;
  created_at: string;
  updated_at: string;
  data: {
    booking?: {
      number?: string;
      status?: string;
    };
  };
};

export type ProposalesProposalSearchResponse = {
  data: ProposalesProposalSearchItem[];
};

export type ProposalSummary = {
  uuid: string;
  title: string;
  status: string;
  version: number | null;
  companyId: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  data: {
    booking?: {
      number?: string;
      status?: string;
    };
  };

};

export type ChatPart = {
  type?: string;
  text?: string;
};

export type ChatMessageItem = {
  id: string;
  role: string;
  parts?: ChatPart[];
};

export type ProposalStats = {
  active: number;
  accepted: number;
  rejected: number;
  total: number;
};
