import React, { useState } from "react";
import {
  ReactFlowProvider,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "../App.css";
import "@xyflow/react/dist/style.css";
import FlowCanvas from "../components/FlowCanvas";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  interface AvailableNode {
    type: string;
    label: string;
    backgroundColor: string;
  }

  const onDragStart = (event: React.DragEvent, node: AvailableNode) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(node));
    event.dataTransfer.effectAllowed = "move";
  };

  const availableNodes: AvailableNode[] = [
    { type: "input", label: "Input Node", backgroundColor: "#e6f3ff" },
    { type: "default", label: "Process Node", backgroundColor: "#fff" },
    { type: "output", label: "Output Node", backgroundColor: "#e6ffe6" },
    { type: "custom", label: "Custom Node", backgroundColor: "#fff0e6" },
  ];

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <LeftSidebar availableNodes={availableNodes} onDragStart={onDragStart} />

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <button
            onClick={() => console.log("Final Output:", { nodes, edges })}
          >
            Log Final Output
          </button>
        </div>
        <div style={{ flexGrow: 1 }}>
          <ReactFlowProvider>
            <FlowCanvas
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeSelect={setSelectedNode}
            />
          </ReactFlowProvider>
        </div>
      </div>

      <RightSidebar selectedNode={selectedNode} />
    </div>
  );
}

export default Home;
