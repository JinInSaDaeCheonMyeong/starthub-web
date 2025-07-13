import * as S from "./style";

const categorySelector = () => {
    return (
      <S.Section>
        <S.SectionTitle>관심 분야(1개 이상)</S.SectionTitle>
        <S.SectionDescription>
          관심 분야를 알려주시면, 맞춤형 콘텐츠를 추천해드려요!
        </S.SectionDescription>
  
        <S.CategoryGrid>
            
            return (
              <S.CategoryButton
              >
                <div 
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                </div>
              </S.CategoryButton>
            );
        </S.CategoryGrid>
      </S.Section>
    );
}

export default categorySelector