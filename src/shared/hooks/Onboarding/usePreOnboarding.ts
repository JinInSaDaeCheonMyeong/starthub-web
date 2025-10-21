import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/entities/user/api/user";
import { OnboardingRequest } from "@/entities/user/model/types";
import { toast } from "react-toastify";

export const usePreOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OnboardingRequest) => {
      await userApi.onboarding(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success("예비창업 온보딩 성공");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "다시 시도해 주세요");
    },
  });
};
