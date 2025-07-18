import { ReactComponent as User } from '@assets/icons/bmc/user.svg';
import { ReactComponent as Diamond } from '@assets/icons/bmc/diamond.svg';
import { ReactComponent as Truck } from '@assets/icons/bmc/truck.svg';
import { ReactComponent as Hand} from '@assets/icons/bmc/hand-holding-heart.svg';
import { ReactComponent as DataBase } from '@assets/icons/bmc/database.svg';
import { ReactComponent as Chat } from '@assets/icons/bmc/chat-arrow-grow.svg';
import { ReactComponent as Link } from '@assets/icons/bmc/link.svg';
import { ReactComponent as Card } from '@assets/icons/bmc/credit-card.svg';
import { ReactComponent as Dollar } from '@assets/icons/bmc/dollar.svg';
import { ReactComponent as Map } from '@assets/icons/bmc/map.svg';
import { IconWrapper } from './style';

type IconName = 'user' | 'diamond' | 'truck' | 'hand' | 'database' | 'chat' | 'link' | 'card' | 'dollar' | 'map';

interface BmcIconProps {
  name: IconName;
  className?: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

const iconMap: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  user: User,
  diamond: Diamond,
  truck: Truck,
  hand: Hand,
  database: DataBase,
  chat: Chat,
  link: Link,
  card: Card,
  dollar: Dollar,
  map: Map
};

const BmcIcon = ({ name, className, isActive = false, isCompleted = false }: BmcIconProps) => {
  const Component = iconMap[name];
  
  return (
    <IconWrapper 
      className={className}
      $isActive={isActive} 
      $isCompleted={isCompleted}
    >
      <Component />
    </IconWrapper>
  );
};

export default BmcIcon;