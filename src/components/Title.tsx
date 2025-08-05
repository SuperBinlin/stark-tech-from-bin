import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="inline-block px-4 py-3 font-medium rounded border text-white bg-[var(--primary)]">
      {text}
    </div>
  );
};

export default Title;