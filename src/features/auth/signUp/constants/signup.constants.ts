import { SignUpFormData, SignUpFieldErrors, SignUpLoadingStates } from '../../../../entities/user/model/types';

export const SIGNUP_AGREE_ITEMS = [
    "[필수] 만 14세 이상입니다.",
    "[필수] 스타트허브 이용약관 동의",
    "[필수] 스타트허브 개인정보 수집 및 이용 동의"
]

// 초기 폼 데이터
export const INITIAL_FORM_DATA: SignUpFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  verificationCode: ''
};

// 초기 필드 에러
export const INITIAL_FIELD_ERRORS: SignUpFieldErrors = {
  email: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
  agreement: ''
};

// 초기 로딩 상태
export const INITIAL_LOADING_STATES: SignUpLoadingStates = {
  sendCode: false,
  verifyCode: false
};

// 에러 메시지 상수
export const ERROR_MESSAGES = {
  REQUIRED_EMAIL: '이메일을 입력해주세요',
  REQUIRED_PASSWORD: '비밀번호를 입력해주세요',
  REQUIRED_VERIFICATION_CODE: '인증번호를 입력해주세요',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  EMAIL_VERIFICATION_REQUIRED: '이메일 인증을 완료해주세요',
  AGREEMENT_REQUIRED: '모든 약관에 동의해주세요',
  EMAIL_SEND_FAILED: '이메일 전송에 실패했습니다',
  VERIFICATION_CODE_FAILED: '인증번호 검증에 실패했습니다',
  SIGNUP_FAILED: '회원가입 중 오류가 발생했습니다.'
} as const;

// 성공 메시지 상수
export const SUCCESS_MESSAGES = {
  VERIFICATION_CODE_SENT: '인증번호가 발송되었습니다.',
  EMAIL_VERIFIED: '이메일 인증이 완료되었습니다.',
  SIGNUP_SUCCESS: '회원가입이 성공했습니다!'
} as const;

// 폼 필드 이름
export const FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  VERIFICATION_CODE: 'verificationCode'
} as const;