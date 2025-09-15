import { useCallback } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  addEdge,
  type Connection,
  Controls,
  Background,
  useReactFlow,
  type EdgeProps,
  getBezierPath,
} from "@xyflow/react";
import CustomNode from "./CustomNode";
import "./CustomEdge.css";

interface CustomEdgeData {
  onDelete?: (id: string) => void;
}

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
  data,
}: EdgeProps & { data?: CustomEdgeData }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={24}
        height={24}
        x={midX - 10}
        y={midY - 10}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div
          onClick={(event) => {
            event.stopPropagation();
            if (data?.onDelete) {
              data.onDelete(id);
            }
          }}
        >
          ×
        </div>
      </foreignObject>
    </>
  );
};

interface FlowCanvasProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: any;
  onEdgesChange: any;
  onNodeSelect?: (node: Node | null) => void;
}

function FlowCanvas({
  nodes,
  setNodes,
  edges,
  setEdges,
  onNodesChange,
  onEdgesChange,
  onNodeSelect,
}: FlowCanvasProps) {
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (!sourceNode || !targetNode) return;

      let edgeType = "custom";
      let animated = false;
      let style = {};

      if (sourceNode.type === "input" && targetNode.type === "default") {
        edgeType = "smoothstep";
        style = { stroke: "#0041d0" };
        animated = true;
      } else if (sourceNode.type === "custom" && targetNode.type === "output") {
        edgeType = "step";
        style = { stroke: "#00a300" };
      }

      const edge = {
        ...params,
        type: edgeType,
        animated,
        style,
        data: {
          onDelete: (id: string) => {
            setEdges((eds) => eds.filter((e) => e.id !== id));
          },
        },
      };

      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges, nodes]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeData = event.dataTransfer.getData("application/reactflow");
      if (!nodeData) return;

      const { type, label, backgroundColor } = JSON.parse(nodeData);

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `n${nodes.length + 1}`,
        type: type,
        position,
        data: { label },
        style: {
          fontSize: 16,
          backgroundColor,
          border: "1px solid #ccc",
        },
      };

      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [nodes, setNodes, screenToFlowPosition]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleSelectionChange = useCallback(
    ({ nodes: selectedNodes }: { nodes: Node[] }) => {
      if (onNodeSelect) {
        onNodeSelect(
          selectedNodes && selectedNodes.length > 0 ? selectedNodes[0] : null
        );
      }
    },
    [onNodeSelect]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      attributionPosition="top-right"
      deleteKeyCode={["Backspace", "Delete"]}
      nodeTypes={{ custom: CustomNode }}
      edgeTypes={{ custom: CustomEdge }}
      onSelectionChange={handleSelectionChange}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default FlowCanvas;
