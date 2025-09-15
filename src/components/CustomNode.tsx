import { Handle, Position } from "@xyflow/react";

interface CustomNodeProps {
  data: {
    label: string;
  };
}

function CustomNode({ data }: CustomNodeProps) {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CustomNode;
