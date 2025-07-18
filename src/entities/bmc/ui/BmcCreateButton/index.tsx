import { ReactComponent as Plus } from "@assets/icons/plus.svg";
import * as S from './style'

const BmcCreateButton = () => {
  return (
    <S.ButtonContainer onClick={()=>{}}>
      <S.PlusIcon>
        <Plus />
      </S.PlusIcon>
    </S.ButtonContainer>
  )
}

export default BmcCreateButton