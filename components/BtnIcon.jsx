import React from "react";

const BtnIcon = ({ Icon, text, onClick, special }) => {
  return (
    <div
      className="relative icon-btn group"
      onClick={() => (onClick ? onClick() : "")}
    >
      <Icon
        className={`${
          special && "text-lg"
        } h-5 group-hover:text-black text-gray-500`}
      />

      {text && (
        <div className="hidden group-hover:inline absolute bottom-0 mb-[-30px] rounded-xl px-2 py-1 text-xs text-white whitespace-nowrap bg-gray-900">
          {text}
        </div>
      )}
    </div>
  );
};

export default BtnIcon;
