import { ProfileData } from "@/shared/types/ProfileTypes";
import { toast } from "react-toastify";

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
    username: profile.username || "",
    gender: profile.gender || "",
    birthYear: birthDate.getFullYear().toString(),
    birthMonth: (birthDate.getMonth() + 1).toString(),
    birthDay: birthDate.getDate().toString(),
    companyName: profile.companyName || "",
    companyDescription: profile.companyDescription || "",
    startupLocation: profile.startupLocation || "",
    annualRevenue: profile.annualRevenue ? profile.annualRevenue.toString() : "",
    numberOfEmployees: profile.numberOfEmployees ? profile.numberOfEmployees.toString() : "",
    companyWebsite: profile.companyWebsite || "",
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

export const validateRequiredFields = (formData: ProfileFormData, startupStatus?: string): boolean => {
  const { username, gender, birthYear, birthMonth, birthDay, companyName, startupLocation } = formData;

  // 공통 필수 항목
  if (!username.trim() || !gender || !birthYear || !birthMonth || !birthDay) {
    toast.error("필수 항목을 입력해주세요");
    return false;
  }

  // 예비 창업인 경우: 이름, 성별, 생년월일, 창업 위치만 필수
  if (startupStatus === "PRE_STARTUP") {
    if (!startupLocation.trim()) {
      toast.error("필수 항목을 입력해주세요");
      return false;
    }
  } else {
    // 초기 창업, 스케일업 창업인 경우: 이름, 성별, 생년월일, 회사명, 창업 위치 필수
    if (!companyName.trim() || !startupLocation.trim()) {
      toast.error("필수 항목을 입력해주세요");
      return false;
    }
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
