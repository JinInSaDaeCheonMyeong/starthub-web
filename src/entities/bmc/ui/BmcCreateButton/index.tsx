import { ReactComponent as Plus } from "@assets/icons/plus.svg";

const BmcCreateButton = () => {
  return (
    // ButtonContainer
    <div
      onClick={() => {}}
      className="
        w-[282px] h-[173px] border border-hub-gray-3 rounded-[10px]
        flex items-center justify-center cursor-pointer transition-all duration-300
        hover:border-hub-primary hover:bg-hub-white-2
      "
    >
      {/* PlusIcon */}
      <div className="w-[60px] h-[60px] flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-hub-primary">
        <Plus />
      </div>
    </div>
  );
};

export default BmcCreateButton;
