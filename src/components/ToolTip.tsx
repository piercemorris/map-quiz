import React, { useState } from 'react';

interface ToolTipProps {
  text: string;
  children: React.ReactElement;
}

const ToolTip: React.FC<ToolTipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default ToolTip;