import React from "react";

interface LabeledInputProps {
  label: string;
  value: string;
  readOnly?: boolean;
  containerStyle?: React.CSSProperties;
  rightIcon?: React.ReactNode;
  type?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  value,
  readOnly = false,
  containerStyle = {},
  rightIcon,
  type = "text",
}) => {
  return (
    <div style={containerStyle}>
      <label style={{ fontSize: 12, color: "#888" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          value={value}
          readOnly={readOnly}
          style={{
            width: "-webkit-fill-available",
            fontSize: 14,
            padding: "4px 8px",
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
        {rightIcon && (
          <span
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#00bfae",
              fontSize: 20,
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
};

export default LabeledInput;
