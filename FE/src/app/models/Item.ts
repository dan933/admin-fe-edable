export interface Item {
    id?:string,
    name?: string;
    summary?:string;
    description?:string;
    initialPrice?: number;
    totalDonations?: number;
    activeStatus?: boolean;
    orgID?: string;
    img?: string;
  }