import type { UIMessage } from "ai";

export type ProposalStatus =
  | "active"
  | "accepted"
  | "draft"  
  | "expired"
  | (string & {});

export type ProposalBooking = {
  number?: string;
  status?: string;
};

export type ProposalTracking = {
  sent_at?: string;
  replaces_uuid?: string;
  last_viewed_at?: string;
  first_viewed_at?: string;
  number_of_views?: number;
  created_from_proposal?: string;
};

export type ProposalBlock = {
  type: string;
  unit: string;
  uuid: string;
  title: string;
  currency: string;
  language: string;
  content_id: number;
  updated_at: string;
  description: string;
  package_split?: Array<{
    vat: number;
    type: string;
    fixed: boolean;
    value_with_tax: number;
    enable_discount: boolean;
    value_without_tax: number;
    value_saved_with_tax: boolean;
  }>;
  inventory_connected: boolean;
  unit_value_with_discount_with_tax: number;
  unit_value_with_discount_without_tax: number;
  unit_value_without_discount_with_tax: number;
  unit_value_without_discount_without_tax: number;
};

export type ProposalesProposal = {
  uuid: string;
  title: string;
  status: ProposalStatus;
  version: number;
  recipient_company_name: string | null;
  recipient_email: string | null;
  recipient_name: string | null;
  currency: string;
  value_with_tax: number;
  value_without_tax: number;
  expires_at: number | null;
  updated_at: number;
  data: {
    booking?: ProposalBooking | null;
  };
  blocks: ProposalBlock[];
  tracking: ProposalTracking;
  has_been_sent: boolean;
  series_uuid: string;
};

export type ProposalesProposalSearchItem = {
  uuid: string;
  title: string;
  status: ProposalStatus;
  version: number;
  company_id: number;
  url: string;
  created_at: string;
  updated_at: string;
  data: {
    booking?: {
      number?: string;
      status?: string;
    } | null;
  };
};

export type ProposalesProposalSearchResponse = {
  data: ProposalesProposalSearchItem[];
};

export type ProposalesProposalResponse = {
  data: ProposalesProposal;
};

export type ProposalSummary = {
  uuid: string;
  title: string;
  status: ProposalStatus;
  version: number | null;
  companyId: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  data: {
    booking?: {
      number?: string;
      status?: string;
    } | null;
  };
};

export type ChatMessageItem = UIMessage;

export type ProposalStats = {
  active: number;
  accepted: number;
  rejected: number;
  total: number;
};
