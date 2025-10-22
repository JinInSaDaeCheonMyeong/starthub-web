import { useQuery } from '@tanstack/react-query';
import { profileApi } from '@/shared/api/profileApi';
import { ProfileData } from '@/shared/types/ProfileTypes';

export const PROFILE_QUERY_KEY = ['profile'] as const;

export const useProfile = () => {
  return useQuery<ProfileData>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: profileApi.getUserProfile,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
