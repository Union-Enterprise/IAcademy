import { ReactFlow, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const edges = [{ id: "1-2", source: "1", target: "2" }];

const nodes = [
  {
    id: "0",
    data: { label: "Construir um 'roadmap' gigante aqui." },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 200, y: 200 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "World" },
    position: { x: 300, y: 400 },
  },
  {
    id: "4",
    data: { label: "World" },
    position: { x: 200, y: 510 },
  },
];

function Flow() {
  return (
    <div className="h-full w-full min-h-[80vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        edgesFocusable={false}
        nodesConnectable={false}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default Flow;
