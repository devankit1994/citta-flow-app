import React from "react";
import LabeledInput from "./LabeledInput";
import LabeledSelect from "./LabeledSelect";

interface InputNodeDetailsProps {
  data: any;
}

const InputNodeDetails: React.FC<InputNodeDetailsProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <label style={{ fontSize: 12, color: "#888" }}>Filter Code</label>
        <div style={{ fontSize: 13, marginTop: 2, color: "#444" }}>
          {data?.filterCode || "28c845cf734a666272875d0a2fa7f465"}
        </div>
      </div>
      <LabeledInput label="Name" value={data?.name || "Read"} />
      <LabeledInput
        label="Description"
        value={data?.description || "Description"}
      />
      <div>
        <label style={{ fontSize: 12, color: "#888" }}>Data Connection</label>
        <button
          style={{
            width: "-webkit-fill-available",
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#f4f4f4",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: "4px 8px",
            fontSize: 14,
            fontWeight: "normal",
            cursor: "default",
            backgroundColor: "white",
          }}
        >
          <span role="img" aria-label="db" style={{ fontSize: 16 }}>
            <img
              src="https://img.icons8.com/wired/64/data-configuration.png"
              width={18}
              style={{ verticalAlign: "middle" }}
            />
          </span>
          Application Object V2
        </button>
      </div>
      <LabeledSelect
        label="Application Group"
        options={[{ value: "AG-Ankit-TEST", label: "AG-Ankit-TEST" }]}
      />
      <LabeledSelect
        label="Application"
        options={[{ value: "Test_App_1", label: "Test_App_1" }]}
      />
      <LabeledSelect
        label="Application Object"
        options={[{ value: "products", label: "products" }]}
      />
      <LabeledInput
        label="Read Write Mode"
        value={data?.readWriteMode || "read"}
      />
      <LabeledInput
        label="Enter Node label"
        value={data?.nodeLabel || "any rule"}
      />
    </div>
  );
};

export default InputNodeDetails;
