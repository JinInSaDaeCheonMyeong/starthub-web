import { ProfileData } from "@/shared/types/ProfileTypes";

export interface ProfileFormData {
  username: string;
  gender: "MALE" | "FEMALE" | "";
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  companyName: string;
  companyDescription: string;
  startupLocation: string;
  annualRevenue: string;
  numberOfEmployees: string;
  companyWebsite: string;
}

export const INITIAL_FORM_DATA: ProfileFormData = {
  username: "",
  gender: "",
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  companyName: "",
  companyDescription: "",
  startupLocation: "",
  annualRevenue: "",
  numberOfEmployees: "",
  companyWebsite: "",
};

export const formatProfileToForm = (profile: ProfileData): ProfileFormData => {
  const birthDate = new Date(profile.birth);
  return {
    username: profile.username,
    gender: profile.gender,
    birthYear: birthDate.getFullYear().toString(),
    birthMonth: (birthDate.getMonth() + 1).toString(),
    birthDay: birthDate.getDate().toString(),
    companyName: profile.companyName,
    companyDescription: profile.companyDescription,
    startupLocation: profile.startupLocation,
    annualRevenue: profile.annualRevenue.toString(),
    numberOfEmployees: profile.numberOfEmployees.toString(),
    companyWebsite: profile.companyWebsite,
  };
};

export const formatFormToProfile = (formData: ProfileFormData): Partial<ProfileData> => {
  const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(2, "0")}-${formData.birthDay.padStart(2, "0")}`;

  return {
    username: formData.username,
    gender: formData.gender as "MALE" | "FEMALE",
    birth: birthDate,
    companyName: formData.companyName,
    companyDescription: formData.companyDescription,
    startupLocation: formData.startupLocation,
    annualRevenue: parseInt(formData.annualRevenue) || 0,
    numberOfEmployees: parseInt(formData.numberOfEmployees) || 0,
    companyWebsite: formData.companyWebsite,
  };
};

export const validateRequiredFields = (formData: ProfileFormData): boolean => {
  const { username, gender, birthYear, birthMonth, birthDay, companyName } = formData;

  if (!username.trim() || !gender || !birthYear || !birthMonth || !birthDay || !companyName.trim()) {
    alert("필수 항목을 입력해주세요");
    return false;
  }

  return true;
};

export const generateYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);
};

export const generateMonths = (): number[] =>
  Array.from({ length: 12 }, (_, i) => i + 1);

export const generateDays = (): number[] =>
  Array.from({ length: 31 }, (_, i) => i + 1);
