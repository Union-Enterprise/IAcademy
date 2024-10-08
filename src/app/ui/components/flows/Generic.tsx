"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactFlow, { Controls, Node, Edge} from "reactflow";
import "reactflow/dist/style.css";

interface RoadmapData {
  [topic: string]: string[];
}

const ENEMRoadmap: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get<{ roadmap: RoadmapData[] }>(
          "http://localhost:5002/roadmap"
        );

        const roadmapData = response.data[0];
        const roadmap = roadmapData.roadmap;

        if (typeof roadmap !== "object" || roadmap === null) {
          throw new Error("Roadmap is not a valid object");
        }

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        let currentY = 50;
        const xOffset = 420;

        let previousNodeId: string | null = null;
        let isLeft = true;

        for (const [topic, subjects] of Object.entries(roadmap)) {
          if (!Array.isArray(subjects)) {
            continue;
          }

          const parentNodeId = `topic-${newNodes.length + 1}`;
          newNodes.push({
            id: parentNodeId,
            data: { label: topic },
            position: { x: 50, y: currentY },
            style: {
              backgroundColor: "#1865F2",
              color: "#fff",
              borderRadius: "8px",
              padding: "20px",
              width: "400px",
              fontWeight: "bold",
              fontSize: "30px",
            },
          });

          currentY += 150;

          const limitedSubjects = expandedNodes.includes(parentNodeId)
            ? subjects
            : subjects.slice(0, 3);
          const remainingCount = subjects.length - limitedSubjects.length;

          const childXPosition = isLeft ? -xOffset : xOffset;

          limitedSubjects.forEach((subject, index) => {
            const childNodeId = `subject-${newNodes.length + 1}`;
            newNodes.push({
              id: childNodeId,
              data: { label: subject },
              position: { x: 50 + childXPosition, y: currentY },
              style: {
                backgroundColor: "#E3EFFF",
                border: "2px solid #1865F2",
                borderRadius: "8px",
                padding: "20px",
                width: "400px",
                fontSize: "29px",
              },
            });

            newEdges.push({
              id: `${parentNodeId}-${childNodeId}`,
              source: parentNodeId,
              target: childNodeId,
              animated: true,
              style: { stroke: "#1865F2" },
            });

            currentY += 105;
          });

          if (remainingCount > 0 && !expandedNodes.includes(parentNodeId)) {
            const moreNodeId = `more-${newNodes.length + 1}`;
            newNodes.push({
              id: moreNodeId,
              data: { label: `+ ${remainingCount} mais...`, onClick: () => handleExpand(parentNodeId) },
              position: { x: 50 + childXPosition, y: currentY },
              style: {
                backgroundColor: "#FFC107",
                border: "2px solid #1865F2",
                borderRadius: "8px",
                padding: "20px",
                width: "400px",
                fontSize: "25px",
                textAlign: "center",
                cursor: "pointer",
              },
            });

            newEdges.push({
              id: `${parentNodeId}-${moreNodeId}`,
              source: parentNodeId,
              target: moreNodeId,
              animated: true,
              style: { stroke: "#1865F2" },
            });

            currentY += 75;
          }

          if (previousNodeId) {
            newEdges.push({
              id: `${previousNodeId}-${parentNodeId}`,
              source: previousNodeId,
              target: parentNodeId,
              animated: true,
              style: { stroke: "#1865F2" },
            });
          }

          previousNodeId = parentNodeId;
          currentY += 100;
          isLeft = !isLeft;
        }

        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error fetching roadmap data:", error);
      }
    };

    fetchRoadmap();
  }, [expandedNodes]);

  const handleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => [...prev, nodeId]);
  };

  return (
    <div style={{ height: "80vh", width: "140vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView={false}
        onNodeClick={(_, node) => node.data?.onClick && node.data.onClick()}
        defaultViewport={{ x: 200, y: 0, zoom: 0.4 }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ENEMRoadmap;



// const edges = [
//   { id: "1-2", source: "1", target: "2", animated: false, style: { stroke: "#1865F2" } },
//   { id: "1-3", source: "1", target: "3", animated: false, style: { stroke: "#1865F2" } },
//   { id: "1-5", source: "1", target: "5", animated: false, style: { stroke: "#1865F2" } },
//   { id: "1-6", source: "1", target: "6", animated: false, style: { stroke: "#1865F2" } },
//   { id: "1-7", source: "1", target: "7", animated: false, style: { stroke: "#1865F2" } },
//   { id: "1-8", source: "1", target: "8", animated: false, style: { stroke: "#1865F2" } },
//   { id: "2-9", source: "2", target: "9", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
//   { id: "2-10", source: "2", target: "10", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
//   { id: "2-11", source: "2", target: "11", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
//   { id: "2-12", source: "2", target: "12", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
//   { id: "5-13", source: "5", target: "13", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
//   { id: "5-14", source: "5", target: "14", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
//   { id: "5-15", source: "5", target: "15", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
//   { id: "5-16", source: "5", target: "16", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
// ];

// const nodes = [
//   { id: "1", data: { label: "Preparativo para o ENEM" }, position: { x: 500, y: 50 }, 
//   style: { width: 200,  backgroundColor: "#E3EFFF",
//     border: "2px solid #1865F2", 
//     fontWeight: 'bold' 

//   },
//    targetPosition:'bottom' 
//  },
//   { id: "2", data: { label: "Matemática" }, position: { x: 360, y: 200 },  style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//     sourcePosition: 'left', targetPosition:'top'  },
//   { id: "3", data: { label: "Linguagens" }, position: { x: 760, y: 200 },  style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//      sourcePosition: 'left', targetPosition:'top' },
//   { id: "5", data: { label: "Geometria" }, position: { x: 400, y: 350 },  style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//      sourcePosition: 'left', targetPosition:'top'  },
//   { id: "6", data: { label: "Álgebra" }, position: { x: 500, y: 500 },  style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//      sourcePosition: 'left', targetPosition:'top'  },
//   { id: "7", data: { label: "Redação" }, position: { x: 700, y: 350 },  style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//      sourcePosition: 'left', targetPosition:'top'  },
//   { id: "8", data: { label: "gramatica" }, position: { x: 700, y: 350 },  style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//      sourcePosition: 'left', targetPosition:'top'  },
//   {
//     id: "9",
//     data: { label: "ponto" },
//     position: { x: 50, y: 90 },
//     style: { 
      
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//      },
//     targetPosition: 'right',
//     connectable: false, 
//   },
//   { id: "10", data: { label: "regara " }, position: { x: 50, y: 140 }, 
//     style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//     targetPosition: 'right',
//     connectable: false,
//   },

//   { id: "11", data: { label: "cu" }, position: { x: 50, y: 190 },
//       style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//     targetPosition: 'right',
//     connectable: false, 
//   },
//   { id: "12", data: { label: "oi" }, 
//     position: { x: 50, y: 240 }, 
//     style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//   targetPosition: 'right',
//   connectable: false, 
//  },
//   {
//     id: "13",
//     data: { label: "ponto" },
//     position: { x: 80, y: 90 },
//     style: { 
      
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//      },
//     targetPosition: 'right',
//     connectable: false, 
//   },
//   { id: "14", data: { label: "regara " },
//      position: { x: 80, y: 140 }, 
//     style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//     targetPosition: 'right',
//     connectable: false,
//   },

//   { id: "15", data: { label: "cu" },
//      position: { x: 80, y: 190 },
//     style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//     targetPosition: 'right',
//     connectable: false, 
//   },
//   { id: "16", data: { label: "oi" }, 
//     position: { x: 80, y: 240 }, 
//     style: {   
//       backgroundColor: "#E3EFFF",
//       border: "2px solid #1865F2",
//     },
//   targetPosition: 'right',
//   connectable: false, 
//  },
// ];


// const RoadmapEstatisc = () => {

//   return (
//     <div style={{ height: "80vh", width: "140vh" }}>
//       <ReactFlow nodes={nodes} edges={edges} fitView={false} />
//       <Controls />
//     </div>
//   );
// };

// const WrappedRoadmapEstatisc = () => (
//   <ReactFlowProvider>
//     <RoadmapEstatisc />
//   </ReactFlowProvider>
// );

// export default WrappedRoadmapEstatisc;