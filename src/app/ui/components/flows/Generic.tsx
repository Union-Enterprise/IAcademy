"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactFlow, { Controls, Node, Edge, ReactFlowProvider} from "reactflow";
import "reactflow/dist/style.css";




const edges = [
  { id: "1-2", source: "1", target: "2", animated: false, style: { stroke: "#1865F2" } },
  { id: "1-3", source: "1", target: "3", animated: false, style: { stroke: "#1865F2" } },
  { id: "1-5", source: "1", target: "5", animated: false, style: { stroke: "#1865F2" } },
  { id: "1-6", source: "1", target: "6", animated: false, style: { stroke: "#1865F2" } },
  { id: "1-7", source: "1", target: "7", animated: false, style: { stroke: "#1865F2" } },
  { id: "1-8", source: "1", target: "8", animated: false, style: { stroke: "#1865F2" } },
  { id: "2-9", source: "2", target: "9", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "9-10", source: "9", target: "10", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "10-11", source: "10", target: "11", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "11-12", source: "11", target: "12", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "5-13", source: "5", target: "13", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "13-14", source: "13", target: "14", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "14-15", source: "14", target: "15", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "15-16", source: "15", target: "16", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "3-17", source: "3", target: "17", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "17-18", source: "17", target: "18", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "18-19", source: "18", target: "19", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "19-20", source: "19", target: "20", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "7-21", source: "7", target: "21", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "20-21", source: "20", target: "", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "21-22", source: "21", target: "22", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "22-23", source: "22", target: "23", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "23-24", source: "23", target: "24", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "8-25", source: "8", target: "25", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "25-26", source: "25", target: "26", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "26-27", source: "26", target: "27", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "27-28", source: "27", target: "28", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "6-30", source: "6", target: "", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "30-31", source: "30", target: "30", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "31-32", source: "31", target: "31", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "32-33", source: "32", target: "32", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },
  { id: "33-34", source: "33", target: "33", animated: true, style: { stroke: "#1865F2" }, sourcePosition: 'right' },

 
];

const nodes = [
  { id: "1", data: { label: "Preparativo para o ENEM" }, position: { x: 500, y: 50 }, 
  style: { width: 200,  backgroundColor: "#1865F2",
    border: "2px solid #1865F2",
    color:"#fff", 
    fontWeight: 'bold' 

  },
   targetPosition:'bottom' 
 },
 { 
  id: "2", 
  data: { label: "Aritmética e Proporções" }, 
  position: { x: 10, y: 200 },  
  style: {   
    backgroundColor: "#FFEB3B",
    border: "2px solid #1865F2",
  },
  sourcePosition: 'bottom', 
  targetPosition: 'top'  
},
{ 
  id: "3", 
  data: { label: "Geometria Plana e Espacial" }, 
  position: { x: 1000, y: 200 },  
  style: {   
    backgroundColor: "#FFEB3B",
    border: "2px solid #1865F2",
  },
  sourcePosition: 'bottom', 
  targetPosition: 'top' 
},
{ 
  id: "5", 
  data: { label: "Funções e Gráficos" }, 
  position: { x: 400, y: 200 },  
  style: {   
    backgroundColor: "#FFEB3B",
    border: "2px solid #1865F2",
  },
  sourcePosition: 'bottom', 
  targetPosition: 'top'  
},
{ 
  id: "6", 
  data: { label: "Probabilidade e Estatística" }, 
  position: { x: 200, y: 200 },  
  style: {   
    backgroundColor: "#FFEB3B",
    border: "2px solid #1865F2",
  },
  sourcePosition: 'bottom', 
  targetPosition: 'top'  
},
{ 
  id: "7", 
  data: { label: "Porcentagem e Juros" }, 
  position: { x: 600, y: 200 },  
  style: {   
    backgroundColor: "#FFEB3B",
    border: "2px solid #1865F2",
  },
  sourcePosition: 'bottom', 
  targetPosition: 'top'  
},
{ 
  id: "8", 
  data: { label: "Análise Combinatória" }, 
  position: { x: 800, y: 200 },  
  style: {   
    backgroundColor: "#FFEB3B",
    border: "2px solid #1865F2",
  },
  sourcePosition: 'bottom', 
  targetPosition: 'top'  
}, 
  {
    id: "9",
    data: { label: "ponto" },
    position: { x: 10, y: 300 },
    style: { 
      
      backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
     },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "10", data: { label: "regara " }, position: { x: 10, y: 380 }, 
    style: {   
      backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false,
  },

  { id: "11", data: { label: "cu" }, position: { x: 10, y: 460 },
      style: {   
      backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "12", data: { label: "oi" }, 
    position: { x: 10, y: 540 }, 
    style: {   
      backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
  targetPosition: 'top',
  connectable: false, 
 },
  {
    id: "13",
    data: { label: "ponto" },
    position: { x: 400, y: 300 },
    style: { 
      
        backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
     },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "14", data: { label: "regara " },
     position: { x: 400, y: 380 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false,
  },

  { id: "15", data: { label: "cu" },
     position: { x: 400, y: 460 },
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "16", data: { label: "oi" }, 
    position: { x: 400, y: 540 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
  targetPosition: 'top',
  connectable: false, 
 },
  {
    id: "17",
    data: { label: "ponto" },
    position: { x: 1000, y: 300 },
    style: { 
      
        backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
     },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "18", data: { label: "regara " },
     position: { x: 1000, y: 380 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false,
  },

  { id: "19", data: { label: "cu" },
     position: { x: 1000, y: 460 },
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "20", data: { label: "oi" }, 
    position: { x: 1000, y: 540 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
  targetPosition: 'top',
  connectable: false, 
 },
  {
    id: "21",
    data: { label: "ponto" },
    position: { x: 600, y: 300 },
    style: { 
      
        backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
     },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "22", data: { label: "regara " },
     position: { x: 600, y: 380 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false,
  },

  { id: "23", data: { label: "cu" },
     position: { x: 600, y: 460 },
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "24", data: { label: "oi" }, 
    position: { x: 600, y: 540 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
  targetPosition: 'top',
  connectable: false, 
 },
  {
    id: "25",
    data: { label: "ponto" },
    position: { x: 800, y: 300 },
    style: { 
      
        backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
     },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "26", data: { label: "regara " },
     position: { x: 800, y: 380 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false,
  },

  { id: "27", data: { label: "cu" },
     position: { x: 800, y: 460 },
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "28", data: { label: "oi" }, 
    position: { x: 800, y: 540 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
  targetPosition: 'top',
  connectable: false, 
 },
  { id: "29", data: { label: "oi" }, 
    position: { x: 800, y: 540 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
  targetPosition: 'top',
  connectable: false, 
 },
  {
    id: "30",
    data: { label: "ponto" },
    position: { x: 200, y: 300 },
    style: { 
      
        backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
     },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "31", data: { label: "regara " },
     position: { x: 200, y: 380 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false,
  },

  { id: "32", data: { label: "cu" },
     position: { x: 200, y: 460 },
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
    targetPosition: 'top',
    connectable: false, 
  },
  { id: "33", data: { label: "oi" }, 
    position: { x: 200, y: 540 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
  targetPosition: 'top',
  connectable: false, 
 },
  { id: "34", data: { label: "oi" }, 
    position: { x: 200, y: 540 }, 
    style: {   
       backgroundColor: "#f3c950",
      border: "2px solid #1865F2",
    },
  targetPosition: 'top',
  connectable: false, 
 },
];


const RoadmapEstatisc = () => {

  return (
    <div style={{ height: "80vh", width: "140vh" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView={false} />
      <Controls />
    </div>
  );
};

const WrappedRoadmapEstatisc = () => (
  <ReactFlowProvider>
    <RoadmapEstatisc />
  </ReactFlowProvider>
);

export default WrappedRoadmapEstatisc;
// "use client";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import ReactFlow, { Controls, Node, Edge, ReactFlowProvider} from "reactflow";
// import "reactflow/dist/style.css";

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
//     <div style={{ height: "80vh", width: "140vh" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         fitView={false}
//         onNodeClick={(_, node) => node.data?.onClick && node.data.onClick()}
//         defaultViewport={{ x: 200, y: 0, zoom: 0.4 }}
//       >
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default ENEMRoadmap;