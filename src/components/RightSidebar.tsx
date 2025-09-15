import React from "react";
import type { Node } from "@xyflow/react";
import InputNodeDetails from "./InputNodeDetails";
import DefaultNodeDetails from "./DefaultNodeDetails";
import OutputNodeDetails from "./OutputNodeDetails";

interface RightSidebarProps {
  selectedNode: Node | null;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ selectedNode }) => {
  if (!selectedNode) return null;

  return (
    <div
      style={{
        width: 220,
        background: "#f9f9f9",
        borderLeft: "1px solid #ccc",
        padding: "16px",
        boxShadow: "0 0 8px rgba(0,0,0,0.05)",
      }}
    >
      {selectedNode.type === "input" ? (
        <InputNodeDetails data={selectedNode.data} />
      ) : selectedNode.type === "output" ? (
        <OutputNodeDetails data={selectedNode.data} />
      ) : selectedNode.type === "default" ? (
        <DefaultNodeDetails data={selectedNode.data} id={selectedNode.id} />
      ) : (
        <>
          <h4>
            <span style={{ textTransform: "capitalize" }}>
              {selectedNode.type}
            </span>{" "}
            Node Details
          </h4>
          <div>
            <strong>ID:</strong> {selectedNode.id}
          </div>
          <div>
            <strong>Label:</strong> {String(selectedNode.data?.label)}
          </div>
        </>
      )}
    </div>
  );
};

export default RightSidebar;
