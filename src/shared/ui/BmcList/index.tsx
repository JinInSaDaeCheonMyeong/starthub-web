import { useEffect, useState } from 'react';
import { bmcApi } from '@/entities/bmc/api/bmc';
import { BmcData } from '@/entities/bmc/model/types';
import BmcCard from '../BmcCard';
import * as S from './style';

const BmcList = () => {
  const [bmcList, setBmcList] = useState<BmcData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBmcList = async () => {
      try {
        setIsLoading(true);
        const response = await bmcApi.getCanvases();
        setBmcList(response.data);
      } catch (error) {
        console.error('BMC 리스트 조회 실패:', error);
        setBmcList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBmcList();
  }, []);

  if (isLoading) {
    return (
      <S.Container>
        <S.Text>최근 BMC</S.Text>
        <div>로딩 중...</div>
      </S.Container>
    );
  }

  if (bmcList.length === 0) {
    return (
      <S.Container>
        <S.Text>최근 BMC</S.Text>
        <div>생성된 BMC가 없습니다.</div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Text>최근 BMC</S.Text>
      <S.BmcTemplateContainer>
        {bmcList.map((bmc) => (
          <BmcCard 
            key={bmc.id}
            id={bmc.id}
            title={bmc.title}
            date={bmc.createdAt ? new Date(bmc.createdAt).toLocaleDateString('ko-KR') : ''}
            imageUrl={bmc.imageUrl}
          />
        ))}
      </S.BmcTemplateContainer>
    </S.Container>
  )
}

export default BmcList;