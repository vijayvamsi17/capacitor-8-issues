export type CobrowseSession = {
  sessionCode: string;
  isPending: boolean;
  isActive: boolean;
  isEnded: boolean;
  endedReason?: string | null;
  [key: string]: any;
};
