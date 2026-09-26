export type Proposal = {
  uuid: string;
  title: string;
  status: string;
  version: number | null;
  companyId: number;
  url: string;
  createdAt: number;
  updatedAt: number;
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
