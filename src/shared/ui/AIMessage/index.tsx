export interface AIMessageProps {
  text: string;
  type?: "small" | "big";
}

const AIMessage = ({ text, type = "big" }: AIMessageProps) => {
  return (
    <div
      className={`max-w-fit bg-hub-white-2 flex items-center rounded-[10px] ${
        type === "small" ? "p-2" : "px-5 py-[10px]"
      }`}
    >
      <span
        className={`font-pt-body2-regular text-hub-black-1 break-words ${
          type === "small" ? "text-[10px]" : ""
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default AIMessage;
