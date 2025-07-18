import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { businessApi } from "@/entities/user/api/business";
import type { BusinessFormData } from "@/entities/user/model/business";

export const useBusinessProfile = () => {
  return useQuery({
    queryKey: ["business", "my"],
    queryFn: () => businessApi.checkBusiness(),
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useCreateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BusinessFormData) => businessApi.createBusiness(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", "my"] });
    },
  });
};

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BusinessFormData }) =>
      businessApi.updateBusiness(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", "my"] });
    },
  });
};