const AITypingIndicator = () => (
  <div className="flex items-center gap-[5px] px-[14px] py-[10px]">
    {[0, 200, 400].map((delay) => (
      <span
        key={delay}
        className="w-[7px] h-[7px] rounded-full bg-hub-primary inline-block animate-typing-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
);

export default AITypingIndicator;
