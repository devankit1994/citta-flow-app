import React from "react";
import LabeledInput from "./LabeledInput";

interface DefaultNodeDetailsProps {
  data: {
    code?: string;
    label?: string;
    description?: string;
    sql?: string;
  };
}

const DefaultNodeDetails: React.FC<DefaultNodeDetailsProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={{ fontSize: 12, color: "#888" }}>Filter Code</label>
        <div style={{ fontSize: 13, marginTop: 2, color: "#444" }}>
          28c845cf734a666272875d0a2fa7f465
        </div>
      </div>
      <LabeledInput label="Name" value="SQL" />
      <LabeledInput label="Description" value="Description" />
      <div>
        <label style={{ fontSize: 13, color: "#888" }}>Sql</label>
        <textarea
          value={data.sql ?? ""}
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: 4,
            padding: "8px",
            fontSize: 15,
            marginTop: 2,
            minHeight: 80,
            color: "#1a237e",
            fontFamily: "monospace",
            width: "-webkit-fill-available",
            resize: "vertical",
            overflowX: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default DefaultNodeDetails;
