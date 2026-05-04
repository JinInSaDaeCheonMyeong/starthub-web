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
    <div className="flex justify-center items-center min-h-screen bg-hub-white-2 p-5">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-[500px] rounded-[20px] gap-2.5 flex flex-col bg-white p-10 md:p-[30px] md:px-10 sm:p-5 sm:px-5"
      >
        <div className="flex flex-col items-center">
          <StartHubLogo width={143} height={55} />
        </div>

        <h2>회원가입</h2>

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
          className="font-pt-body1-semibold margin-top-20"
          onClick={handleSignUp}
          textTheme="#FFFFFF"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default SignUpPage;
