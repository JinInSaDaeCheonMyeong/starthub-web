import * as S from './style';
import { StartHubButton } from '@/shared/ui';
import { useSignUpForm } from '@/shared/hooks/SignUp/useSignUpForm';
import { StartHubColors, StartHubFont } from '@/shared/design';
import SignUpBox from '@/features/auth/signUp/ui/SignUpForm';
import AgreementSection from '@/features/auth/signUp/ui/SignUpForm/AgreementSection';
import { StartHubLogo } from '@/assets/logo';

const SignUpPage: React.FC = () => {

  const {
    formData,
    fieldErrors,
    agreeCheckedItems,
    isAllAgreed,
    loadingStates,
    codeSent,
    isEmailVerified,
    isLoading,
    
    handleFormChange,
    handleAllCheck,
    handleSingleCheck,
    handleSendVerificationCode,
    handleVerifyCode,
    handleSignUp
  } = useSignUpForm();

  return (
    <S.LoginContainer>
      <S.LoginForm onSubmit={(e) => e.preventDefault()}>
        <S.Logo>
          <StartHubLogo width={143} height={55} />
        </S.Logo>
        
        <h2>회원가입</h2>
        
        <SignUpBox
          formData={formData}
          handleFormChange={handleFormChange}
          handleSendVerificationCode={handleSendVerificationCode}
          handleVerifyCode={handleVerifyCode}
          codeSent={codeSent}
          isEmailVerified={isEmailVerified}
          loadingStates={loadingStates}
          fieldErrors={fieldErrors}
        />
        
        <AgreementSection
          checkedItems={agreeCheckedItems}
          isAllChecked={isAllAgreed}
          onAllCheck={handleAllCheck}
          onSingleCheck={handleSingleCheck}
        />
        
        
        <StartHubButton
          text="회원가입"
          width={320}
          height={50}
          backgroundColor={StartHubColors.Primary}
          typography={StartHubFont.Pretendard.Body1.Medium}
          onClick={handleSignUp}
          textTheme={StartHubColors.White1}
          customStyle={{ marginTop: "20px" }}
          disabled={isLoading}
        />
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default SignUpPage;
