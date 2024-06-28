type NavButtonProps = {
  text?: string | number;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const NavButton = ({ text, onClick, children }: NavButtonProps) => {
  return (
    // Text in center of circle
    <button
      onClick={onClick}
      className="flex items-center bg-amber-600 px-2 font-mono hover:cursor-pointer hover:bg-amber-700"
    >
      {children ?? text}
    </button>
  );
};
