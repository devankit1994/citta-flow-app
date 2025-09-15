import React from "react";

interface AvailableNode {
  type: string;
  label: string;
  backgroundColor: string;
}

interface LeftSidebarProps {
  availableNodes: AvailableNode[];
  onDragStart: (event: React.DragEvent, node: AvailableNode) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  availableNodes,
  onDragStart,
}) => (
  <div
    style={{
      width: 200,
      background: "#f4f4f4",
      borderRight: "1px solid #ccc",
      padding: "10px",
    }}
  >
    <h4>Available Nodes</h4>
    {availableNodes.map((node) => (
      <div
        key={node.type + "-" + node.label}
        onDragStart={(e) => onDragStart(e, node)}
        draggable
        style={{
          marginBottom: 8,
          padding: 5,
          border: "1px solid #aaa",
          cursor: "grab",
          backgroundColor: node.backgroundColor,
        }}
      >
        {node.label}
      </div>
    ))}
  </div>
);

export default LeftSidebar;
