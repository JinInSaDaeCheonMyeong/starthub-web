import {useMutation} from '@tanstack/react-query';
import {userApi} from '@/entities/user/api/user';
import {AuthRequest, SignUpResponse} from '@/entities/user/model/types';

export const useSignUp = () => {
    return useMutation<SignUpResponse, Error, AuthRequest>({
        mutationFn: userApi.signUp,
        onSuccess: (data) => {
            console.log("회원가입 성공: ", data);
        },
        onError: (error) => {
            console.error("회원가입 실패: ", error);
        }
    })
}