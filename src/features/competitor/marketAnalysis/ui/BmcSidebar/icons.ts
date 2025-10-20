import { ReactComponent as UserIcon } from "@assets/icons/fi-sr-user.svg";
import { ReactComponent as UserBlueIcon } from "@assets/icons/fi-sr-user-blue.svg";
import { ReactComponent as DiamondIcon } from "@assets/icons/fi-sr-diamond.svg";
import { ReactComponent as DiamondBlueIcon } from "@assets/icons/fi-sr-diamond-blue.svg";
import { ReactComponent as TruckIcon } from "@assets/icons/fi-sr-truck-side.svg";
import { ReactComponent as TruckBlueIcon } from "@assets/icons/fi-sr-truck-side-blue.svg";
import { ReactComponent as HeartIcon } from "@assets/icons/fi-sr-hand-holding-heart.svg";
import { ReactComponent as HeartBlueIcon } from "@assets/icons/fi-sr-hand-holding-heart-blue.svg";
import { ReactComponent as DatabaseIcon } from "@assets/icons/fi-sr-database.svg";
import { ReactComponent as DatabaseBlueIcon } from "@assets/icons/fi-sr-database-blue.svg";
import { ReactComponent as ChatIcon } from "@assets/icons/fi-sr-chat-arrow-grow.svg";
import { ReactComponent as ChatBlueIcon } from "@assets/icons/fi-sr-chat-arrow-grow-blue.svg";
import { ReactComponent as LinkIcon } from "@assets/icons/fi-sr-link.svg";
import { ReactComponent as LinkBlueIcon } from "@assets/icons/fi-sr-link-blue.svg";
import { ReactComponent as CreditCardIcon } from "@assets/icons/fi-sr-credit-card.svg";
import { ReactComponent as CreditCardBlueIcon } from "@assets/icons/fi-sr-credit-card-blue.svg";
import { ReactComponent as DollarIcon } from "@assets/icons/fi-sr-dollar.svg";
import { ReactComponent as DollarBlueIcon } from "@assets/icons/fi-sr-dollar-blue.svg";

export const BMC_ICONS = {
  user: { default: UserIcon, blue: UserBlueIcon },
  diamond: { default: DiamondIcon, blue: DiamondBlueIcon },
  truck: { default: TruckIcon, blue: TruckBlueIcon },
  heart: { default: HeartIcon, blue: HeartBlueIcon },
  database: { default: DatabaseIcon, blue: DatabaseBlueIcon },
  chat: { default: ChatIcon, blue: ChatBlueIcon },
  link: { default: LinkIcon, blue: LinkBlueIcon },
  creditCard: { default: CreditCardIcon, blue: CreditCardBlueIcon },
  dollar: { default: DollarIcon, blue: DollarBlueIcon },
} as const;

export type BmcIconType = keyof typeof BMC_ICONS;
