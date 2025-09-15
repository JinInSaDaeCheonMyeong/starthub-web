export interface ProfileData {
  username: string;
  profileImage: string;
  companyIds: number[];
  birth: string;
  gender: "MALE" | "FEMALE";
  startupStatus: "PRE_STARTUP" | "STARTUP" | "SCALE_UP";
  companyName: string;
  companyDescription: string;
  numberOfEmployees: number;
  companyWebsite: string;
  startupLocation: string;
  annualRevenue: number;
  startupFields: string[];
}