import * as S from "./style"
import { StartHubCheckBox } from "@/components/common"
import { useState } from "react";
import { SIGNUP_AGREE_ITEMS } from "@/constants/SignUp/signup.constants";

const AgreementSection = () =>{
    const [isChecked, setIsChecked] = useState(false);

    return(
        <>
        <S.CheckboxContainer>
          <StartHubCheckBox checked={isChecked} onChange={setIsChecked} />
          <S.CheckboxLabelMain>
            전체 동의
          </S.CheckboxLabelMain>
        </S.CheckboxContainer>
        <S.Divider/>
        {SIGNUP_AGREE_ITEMS.map((agree)=>(
           <S.CheckboxContainer>
           <StartHubCheckBox
             checked={isChecked}
             onChange={setIsChecked}
           />
           <S.CheckboxLabel>
             {agree}
           </S.CheckboxLabel>
         </S.CheckboxContainer>
        ))}
        </>
    )
}

export default AgreementSection