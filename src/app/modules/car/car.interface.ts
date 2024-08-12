/* eslint-disable no-unused-vars */
export interface TCar {
  save(arg0: { session: import("mongodb").ClientSession; }): unknown;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status?: "available" | "unavailable";
  features: string[];
  pricePerHour: number;
  isDeleted?: boolean;
}
