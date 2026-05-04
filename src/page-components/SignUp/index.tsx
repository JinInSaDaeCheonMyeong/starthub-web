import { StartHubButton } from "@/shared/ui";
import { useSignUpForm } from "@/shared/hooks/SignUp/useSignUpForm";
import SignUpBox from "@/features/auth/signUp/ui/SignUpForm";
import AgreementSection from "@/features/auth/signUp/ui/SignUpForm/AgreementSection";
import { StartHubLogo } from "@/assets/logo";

const SignUpPage = () => {
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
    sendVerificationCode,
    verifyCode,
    handleSignUp,
  } = useSignUpForm();

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center relative p-5">
      <div className="bg-white w-[490px] min-h-[729px] rounded-[30px] relative py-[50px]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center gap-[20px]"
        >
          <div className="flex flex-col items-center gap-[10px]">
            <div className="w-[134px] h-[55px]">
              <StartHubLogo width={134} height={55} />
            </div>
            <p className="font-pt-body1-semibold text-hub-black-1 text-center">
              회원가입
            </p>
          </div>

          <div className="flex flex-col gap-[20px] w-[320px]">
            <SignUpBox
              formData={formData}
              handleFormChange={handleFormChange}
              handleSendVerificationCode={sendVerificationCode}
              handleVerifyCode={verifyCode}
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
              backgroundColor="#2466F4"
              className="font-pt-body1-semibold"
              onClick={handleSignUp}
              textTheme="#FFFFFF"
              hoverColor="#235FE0"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
