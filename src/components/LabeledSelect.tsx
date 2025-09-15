import React from "react";

interface LabeledSelectProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  style?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  disabled?: boolean;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({
  label,
  value,
  onChange,
  options,
  style,
  selectStyle,
  labelStyle,
  disabled = false,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2, ...style }}>
    <label style={{ fontSize: 12, color: "#888", ...labelStyle }}>
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      style={{
        width: "-webkit-fill-available",
        fontSize: 14,
        padding: "4px 8px",
        border: "1px solid #ccc",
        borderRadius: 4,
        ...selectStyle,
      }}
      disabled={disabled}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default LabeledSelect;
