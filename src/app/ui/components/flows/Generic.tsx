"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, { Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

// interface RoadmapData {
//   [topic: string]: string[];
// }

// const ENEMRoadmap: React.FC = () => {
//   const [nodes, setNodes] = useState<Node[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);
//   const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const response = await axios.get<{ roadmap: RoadmapData[] }>(
//           "http://localhost:5002/roadmap"
//         );

//         const roadmapData = response.data[0];
//         const roadmap = roadmapData.roadmap;

//         if (typeof roadmap !== "object" || roadmap === null) {
//           throw new Error("Roadmap is not a valid object");
//         }

//         const newNodes: Node[] = [];
//         const newEdges: Edge[] = [];
//         let currentY = 50;
//         const xOffset = 420;

//         let previousNodeId: string | null = null;
//         let isLeft = true;

//         for (const [topic, subjects] of Object.entries(roadmap)) {
//           if (!Array.isArray(subjects)) {
//             continue;
//           }

//           const parentNodeId = `topic-${newNodes.length + 1}`;
//           newNodes.push({
//             id: parentNodeId,
//             data: { label: topic },
//             position: { x: 50, y: currentY },
//             style: {
//               backgroundColor: "#1865F2",
//               color: "#fff",
//               borderRadius: "8px",
//               padding: "20px",
//               width: "400px",
//               fontWeight: "bold",
//               fontSize: "30px",
//             },
//           });

//           currentY += 150;

//           const limitedSubjects = expandedNodes.includes(parentNodeId)
//             ? subjects
//             : subjects.slice(0, 3);
//           const remainingCount = subjects.length - limitedSubjects.length;

//           const childXPosition = isLeft ? -xOffset : xOffset;

//           limitedSubjects.forEach((subject, index) => {
//             const childNodeId = `subject-${newNodes.length + 1}`;
//             newNodes.push({
//               id: childNodeId,
//               data: { label: subject },
//               position: { x: 50 + childXPosition, y: currentY },
//               style: {
//                 backgroundColor: "#E3EFFF",
//                 border: "2px solid #1865F2",
//                 borderRadius: "8px",
//                 padding: "20px",
//                 width: "400px",
//                 fontSize: "29px",
//               },
//             });

//             newEdges.push({
//               id: `${parentNodeId}-${childNodeId}`,
//               source: parentNodeId,
//               target: childNodeId,
//               animated: true,
//               style: { stroke: "#1865F2" },
//             });

//             currentY += 105;
//           });

//           if (remainingCount > 0 && !expandedNodes.includes(parentNodeId)) {
//             const moreNodeId = `more-${newNodes.length + 1}`;
//             newNodes.push({
//               id: moreNodeId,
//               data: { label: `+ ${remainingCount} mais...`, onClick: () => handleExpand(parentNodeId) },
//               position: { x: 50 + childXPosition, y: currentY },
//               style: {
//                 backgroundColor: "#FFC107",
//                 border: "2px solid #1865F2",
//                 borderRadius: "8px",
//                 padding: "20px",
//                 width: "400px",
//                 fontSize: "25px",
//                 textAlign: "center",
//                 cursor: "pointer",
//               },
//             });

//             newEdges.push({
//               id: `${parentNodeId}-${moreNodeId}`,
//               source: parentNodeId,
//               target: moreNodeId,
//               animated: true,
//               style: { stroke: "#1865F2" },
//             });

//             currentY += 75;
//           }

//           if (previousNodeId) {
//             newEdges.push({
//               id: `${previousNodeId}-${parentNodeId}`,
//               source: previousNodeId,
//               target: parentNodeId,
//               animated: true,
//               style: { stroke: "#1865F2" },
//             });
//           }

//           previousNodeId = parentNodeId;
//           currentY += 100;
//           isLeft = !isLeft;
//         }

//         setNodes(newNodes);
//         setEdges(newEdges);
//       } catch (error) {
//         console.error("Error fetching roadmap data:", error);
//       }
//     };

//     fetchRoadmap();
//   }, [expandedNodes]);

//   const handleExpand = (nodeId: string) => {
//     setExpandedNodes((prev) => [...prev, nodeId]);
//   };

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodeClick={(_, node) => node.data?.onClick && node.data.onClick()}
//         defaultViewport={{ x: 200, y: 0, zoom: 0.4 }}
//       >
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default ENEMRoadmap;

const edges = [
  { id: "1-2", source: "1", target: "2", animated: true, style: { stroke: "#1865F2" } },
  { id: "2-3", source: "2", target: "3", animated: true, style: { stroke: "#1865F2" } },
  { id: "3-4", source: "3", target: "4", animated: true, style: { stroke: "#1865F2" } },
  { id: "4-5", source: "4", target: "5", animated: true, style: { stroke: "#1865F2" } },
  { id: "5-6", source: "5", target: "6", animated: true, style: { stroke: "#1865F2" } },
  { id: "6-7", source: "6", target: "7", animated: true, style: { stroke: "#1865F2" } },
  { id: "7-8", source: "7", target: "8", animated: true, style: { stroke: "#1865F2" } },
  { id: "8-9", source: "8", target: "9", animated: true, style: { stroke: "#1865F2" } },
  { id: "9-10", source: "9", target: "10", animated: true, style: { stroke: "#1865F2" } },
  { id: "10-11", source: "10", target: "11", animated: true, style: { stroke: "#1865F2" } },
  { id: "11-12", source: "11", target: "12", animated: true, style: { stroke: "#1865F2" } },
  { id: "12-13", source: "12", target: "13", animated: true, style: { stroke: "#1865F2" } },
  { id: "13-14", source: "13", target: "14", animated: true, style: { stroke: "#1865F2" } },
  { id: "14-15", source: "14", target: "15", animated: true, style: { stroke: "#1865F2" } },
];
const nodes = [
  {
    id: "1",
    data: { label: "Preparativo para o ENEM" },
    position: { x: 50, y: 250 },
    style: {
      backgroundColor: "#1865F2",
      color: "#fff",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontWeight: "bold",
      fontSize: "30px",
    },
  },
  {
    id: "2",
    data: { label: "Análise Combinatória" },
    position: { x: 420, y: 500 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "3",
    data: { label: "Razão e Proporção" },
    position: { x: 100, y: 670 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "4",
    data: { label: "Geometria Plana" },
    position: { x: 650, y: 670 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "5",
    data: { label: "Geometria Espacial" },
    position: { x: 420, y: 850 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "6",
    data: { label: "Equações e Funções" },
    position: { x: 100, y: 1020 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "7",
    data: { label: "Porcentagem" },
    position: { x: 650, y: 1020 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "8",
    data: { label: "Estatística e Probabilidade" },
    position: { x: 420, y: 1180 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "9",
    data: { label: "Operações Básicas" },
    position: { x: 100, y: 1380 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "10",
    data: { label: "Frações" },
    position: {  x: 650, y: 1380 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "11",
    data: { label: "Números Decimais e Potenciação" },
    position: { x: 420, y: 1570 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "12",
    data: { label: "Radiciação" },
    position: { x: 100, y: 1800 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "13",
    data: { label: "Regra de Três" },
    position: { x: 650, y: 1800 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "14",
    data: { label: "Transformação de Unidades" },
    position: { x: 420, y: 1980 },
    style: {
      backgroundColor: "#E3EFFF",
      border: "2px solid #1865F2",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "29px",
    },
  },
  {
    id: "15",
    data: { label: "Vestibular" },
    position: { x: 700, y: 2300 },
    style: {
      backgroundColor: "#1865F2",
      color: "#fff",
      borderRadius: "8px",
      padding: "20px",
      width: "400px",
      fontSize: "30px",
    },
  },
 


];
const RoadmapEstatisc = () => {

  
  return (
      <div  style={{ height: "80vh", width: "140vh" }}>
        <ReactFlow nodes={nodes} edges={edges} fitView={true} >
          <Controls />
        </ReactFlow>
      </div>
    
  );
};
export default RoadmapEstatisc;