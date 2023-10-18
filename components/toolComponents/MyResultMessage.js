import React from "react";

const MyResultMessage = ({
  isVisible,
  leftContent,
  leftContentStyle,
  rightContent,
  rightContentStyle
}) => {
  return (
    <div
      className={leftContentStyle}
      style={{
        display: isVisible,
      }}
    >
      {leftContent}
      <b style={rightContentStyle}>
        {rightContent}
      </b>
    </div>
  );
};

export default MyResultMessage;
