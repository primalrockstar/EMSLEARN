import React from "react";

type ProMedixLogoProps = {
  width?: number;
  height?: number;
  showGlow?: boolean;
  customStyle?: React.CSSProperties;
};

const ProMedixLogo: React.FC<ProMedixLogoProps> = ({
  width,
  height,
  showGlow,
  customStyle,
}) => {
  const style = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    ...customStyle,
  };

  return (
    <div className="relative inline-block" style={style}>
      <div className="rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm">
        {/* Logo SVG or content here */}
      </div>
      {showGlow && (
        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg scale-150" style={customStyle} />
      )}
    </div>
  );
};

export default ProMedixLogo;