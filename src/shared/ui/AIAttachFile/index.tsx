import { ReactComponent as AIBmcIcon } from "@assets/icons/ai-bmc.svg";

export interface AIAttachFileProps {
  title: string;
  date: string;
  link: string;
}

const StartHubAIAttachFile = ({ title, date, link }: AIAttachFileProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex bg-[#d7e4ff] px-[10px] py-[14px] w-[200px] h-[60px] rounded-[10px] no-underline text-inherit cursor-pointer"
    >
      <div className="flex items-center justify-start gap-[10px] w-full [&_svg]:w-[31px] [&_svg]:h-auto [&_svg]:shrink-0 [&_svg]:block">
        <AIBmcIcon />
        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="font-pt-caption1-semibold text-[#12398F] m-0 block overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            {title}
          </h1>
          <p className="font-pt-caption1-regular text-[10px] m-0 text-inherit">
            {date}
          </p>
        </div>
      </div>
    </a>
  );
};

export default StartHubAIAttachFile;