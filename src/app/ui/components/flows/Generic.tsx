import React from "react";
import ReactFlow, {
  Controls,
  Node,
  Edge,
  ReactFlowProvider,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

// Edge configurations
const edges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: false,
    targetHandle: "targetTop",
    style: { stroke: "#1865F2", strokeWidth: "3" },
  },
  {
    id: "2-3",
    source: "2",
    sourceHandle: "right",
    target: "3",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "2-4",
    source: "2",
    sourceHandle: "right",
    target: "4",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "2-5",
    source: "2",
    sourceHandle: "right",
    target: "5",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "2-6",
    source: "2",
    sourceHandle: "right",
    target: "6",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "2-11",
    source: "2",
    sourceHandle: "left",
    targetHandle: "targetTop",
    target: "11",
    animated: false,
    style: { stroke: "#1865F2", strokeWidth: "3" },
  },
  {
    id: "11-17",
    source: "11",
    sourceHandle: "left",
    target: "17",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "11-18",
    source: "11",
    sourceHandle: "bottom",
    target: "18",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "11-25",
    source: "11",
    sourceHandle: "bottom",
    target: "25",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "11-30",
    source: "11",
    sourceHandle: "right",
    targetHandle: "targetLeft",
    target: "30",
    animated: false,
    style: { stroke: "#1865F2", strokeWidth: "3" },
  },
  {
    id: "30-32",
    source: "30",
    sourceHandle: "top",
    target: "32",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "30-33",
    source: "30",
    sourceHandle: "right",
    target: "33",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "30-34",
    source: "30",
    sourceHandle: "right",
    target: "34",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "30-36",
    source: "30",
    sourceHandle: "right",
    target: "36",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "30-37",
    source: "30",
    sourceHandle: "right",
    target: "37",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "30-38",
    source: "30",
    sourceHandle: "right",
    target: "38",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "30-39",
    source: "30",
    sourceHandle: "left",
    targetHandle: "targetRight",
    target: "39",
    animated: false,
    style: { stroke: "#1865F2", strokeWidth: "3" },
  },
  {
    id: "39-40",
    source: "39",
    sourceHandle: "left",
    target: "40",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "39-41",
    source: "39",
    sourceHandle: "bottom",
    target: "41",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "39-44",
    source: "39",
    sourceHandle: "bottom",
    target: "44",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "39-48",
    source: "39",
    sourceHandle: "right",
    targetHandle: "targetLeft",
    target: "48",
    animated: false,
    style: { stroke: "#1865F2", strokeWidth: "3" },
  },
  {
    id: "48-50",
    source: "48",
    sourceHandle: "top",
    target: "50",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "48-51",
    source: "48",
    sourceHandle: "right",
    targetHandle: "targetLeft",
    target: "51",
    animated: false,
    style: { stroke: "#1865F2", strokeWidth: "3" },
  },
  {
    id: "51-52",
    source: "51",
    sourceHandle: "bottom",
    target: "52",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "51-59",
    source: "51",
    sourceHandle: "left",
    targetHandle: "targetTop",
    target: "59",
    animated: false,
    style: { stroke: "#1865F2", strokeWidth: "3" },
  },
  {
    id: "59-60",
    source: "59",
    sourceHandle: "left",
    target: "60",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "59-61",
    source: "59",
    sourceHandle: "left",
    target: "61",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "59-62",
    source: "59",
    sourceHandle: "left",
    target: "62",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "59-63",
    source: "59",
    sourceHandle: "left",
    target: "63",
    animated: false,
    style: { stroke: "#1865F2", strokeDasharray: "6" },
  },
  {
    id: "59-64",
    source: "59",
    sourceHandle: "bottom",
    target: "64",
    animated: false,
    style: { stroke: "#1865F2", strokeWidth: "3" },
  },
];

const RoadMapNode = ({ data }: any) => (
  <div
    style={{
      padding: 10,
      backgroundColor: data.bg || "#FFEB3B",
      border: data.border || "1px solid black",
      borderRadius: 4,
      fontSize: "12px",
      width: data.width || "fit-content",
      minWidth: 150,
      display: "flex",
      justifyContent: "center",
      fontWeight: data.weight || "normal",
    }}
  >
    {data.label}
    {data.showSTopHandle && (
      <Handle type={"source"} position={Position.Top} id="top" />
    )}
    {data.showSRightHandle && (
      <Handle type={"source"} position={Position.Right} id="right" />
    )}
    {data.showSBottomHandle && (
      <Handle type={"source"} position={Position.Bottom} id="bottom" />
    )}
    {data.showSLeftHandle && (
      <Handle type={"source"} position={Position.Left} id="left" />
    )}
    {data.showTTopHandle && (
      <Handle type={"target"} position={Position.Top} id="targetTop" />
    )}
    {data.showTRightHandle && (
      <Handle type={"target"} position={Position.Right} id="targetRight" />
    )}
    {data.showTBottomHandle && (
      <Handle type={"target"} position={Position.Bottom} id="targetBottom" />
    )}
    {data.showTLeftHandle && (
      <Handle type={"target"} position={Position.Left} id="targetLeft" />
    )}
  </div>
);

const TopicNode = ({ data }: any) => (
  <div
    style={{
      padding: 10,
      backgroundColor: data.bg || "#CAFFAA",
      border: data.border || "1px solid black",
      borderRadius: 4,
      color: data.color || "#000",
      fontSize: "12px",
      width: data.width,
      height: data.height || "fit-content",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {data.label}
    {data.showTopHandle && <Handle type="target" position={Position.Top} />}
    {data.showRightHandle && <Handle type="target" position={Position.Right} />}
    {data.showBottomHandle && (
      <Handle type="target" position={Position.Bottom} />
    )}
    {data.showLeftHandle && <Handle type="target" position={Position.Left} />}
  </div>
);

const nodes: Node[] = [
  {
    id: "1",
    type: "roadmap",
    data: {
      label: "Matemática Ensino Médio",
      showSBottomHandle: true,
      bg: "transparent",
      border: "none",
      width: 200,
      weight: "bold",
    },
    position: { x: 475, y: 0 },
  },
  {
    id: "2",
    type: "roadmap",
    data: {
      label: "Álgebra 1",
      showTTopHandle: true,
      showSRightHandle: true,
      showSLeftHandle: true,
    },
    position: { x: 500, y: 180 },
  },
  {
    id: "3",
    type: "topic",
    data: {
      label: "Expressões e Operações Algébricas",
      showLeftHandle: true,
      width: 250,
    },
    position: { x: 800, y: 100 },
  },
  {
    id: "4",
    type: "topic",
    data: {
      label: "Equações e Inequações de 1° grau",
      width: 250,
      showLeftHandle: true,
    },
    position: { x: 800, y: 150 },
  },
  {
    id: "5",
    type: "topic",
    data: { label: "Razão e Proporção", width: 250, showLeftHandle: true },
    position: { x: 800, y: 200 },
    targetPosition: Position.Left,
  },
  {
    id: "6",
    type: "topic",
    data: { label: "Sistemas Lineares", width: 250, showLeftHandle: true },
    position: { x: 800, y: 250 },
    targetPosition: Position.Left,
  },
  {
    id: "7",
    type: "topic",
    data: { label: "Taxas", width: 150 },
    position: { x: 1060, y: 100 },
  },
  {
    id: "8",
    type: "topic",
    data: { label: "Juros", width: 150 },
    position: { x: 1060, y: 150 },
  },
  {
    id: "9",
    type: "topic",
    data: { label: "Função Afim", width: 150 },
    position: { x: 1060, y: 200 },
  },
  {
    id: "10",
    type: "topic",
    data: { label: "Função Quadrática", width: 150 },
    position: { x: 1060, y: 250 },
  },
  {
    id: "11",
    type: "roadmap",
    data: {
      label: "Geometria",
      showTTopHandle: true,
      showSLeftHandle: true,
      showSRightHandle: true,
      showSBottomHandle: true,
    },
    position: { x: 295, y: 300 },
  },
  {
    id: "12",
    type: "topic",
    data: { label: "Polígonos Regulares", width: 210 },
    position: { x: 0, y: 150 },
  },
  {
    id: "13",
    type: "topic",
    data: { label: "Noções sobre Fractais", width: 210 },
    position: { x: 0, y: 200 },
  },
  {
    id: "14",
    type: "topic",
    data: { label: "Simetrias", width: 100 },
    position: { x: 0, y: 250 },
  },
  {
    id: "15",
    type: "topic",
    data: { label: "Isometrias", width: 100 },
    position: { x: 110, y: 250 },
  },
  {
    id: "16",
    type: "topic",
    data: { label: "Semelhança", width: 100 },
    position: { x: 0, y: 300 },
  },
  {
    id: "17",
    type: "topic",
    data: { label: "Congruência", width: 100, showRightHandle: true },
    position: { x: 110, y: 300 },
    targetPosition: Position.Right,
  },
  {
    id: "18",
    type: "topic",
    data: { label: "Geometria Espacial", width: 210, showTopHandle: true },
    position: { x: 25, y: 450 },
  },
  {
    id: "19",
    type: "topic",
    data: { label: "Volume", width: 100 },
    position: { x: 25, y: 500 },
  },
  {
    id: "20",
    type: "topic",
    data: { label: "Conceitos", width: 100 },
    position: { x: 135, y: 500 },
  },
  {
    id: "21",
    type: "topic",
    data: { label: "Cones", width: 100 },
    position: { x: 25, y: 550 },
  },
  {
    id: "22",
    type: "topic",
    data: { label: "Pirâmides", width: 100 },
    position: { x: 135, y: 550 },
  },
  {
    id: "23",
    type: "topic",
    data: { label: "Esferas", width: 100 },
    position: { x: 25, y: 600 },
  },
  {
    id: "24",
    type: "topic",
    data: { label: "Cilíndros", width: 100 },
    position: { x: 135, y: 600 },
  },
  {
    id: "25",
    type: "topic",
    data: { label: "Geometria Plana", width: 200, showTopHandle: true },
    position: { x: 270, y: 450 },
  },
  {
    id: "26",
    type: "topic",
    data: { label: "Relações de Euler", width: 200 },
    position: { x: 270, y: 500 },
  },
  {
    id: "27",
    type: "topic",
    data: { label: "Área", width: 95 },
    position: { x: 270, y: 550 },
  },
  {
    id: "28",
    type: "topic",
    data: { label: "Perímetro", width: 95 },
    position: { x: 375, y: 550 },
  },
  {
    id: "29",
    type: "topic",
    data: { label: "Operações com Polinômios", width: 200 },
    position: { x: 270, y: 600 },
  },
  {
    id: "30",
    type: "roadmap",
    data: {
      label: "Álgebra 2",
      showTLeftHandle: true,
      showSLeftHandle: true,
      showSTopHandle: true,
      showSRightHandle: true,
    },
    position: { x: 675, y: 525 },
  },
  {
    id: "31",
    type: "topic",
    data: { label: "Progressão Aritmética (P.A.)", width: 200 },
    position: { x: 650, y: 375 },
  },
  {
    id: "32",
    type: "topic",
    data: {
      label: "Progressão Geométrica (P.G.)",
      width: 200,
      showBottomHandle: true,
    },
    position: { x: 650, y: 425 },
  },
  {
    id: "33",
    type: "topic",
    data: {
      label: "Funções definidas por partes",
      width: 210,
      showLeftHandle: true,
    },
    position: { x: 975, y: 450 },
  },
  {
    id: "34",
    type: "topic",
    data: { label: "Exponenciais", width: 100, showLeftHandle: true },
    position: { x: 975, y: 500 },
  },
  {
    id: "35",
    type: "topic",
    data: { label: "Logarítmicas", width: 100 },
    position: { x: 1085, y: 500 },
  },
  {
    id: "36",
    type: "topic",
    data: { label: "Equações de reta", width: 210, showLeftHandle: true },
    position: { x: 975, y: 550 },
  },
  {
    id: "37",
    type: "topic",
    data: { label: "Retas e circunferência", width: 210, showLeftHandle: true },
    position: { x: 975, y: 600 },
  },
  {
    id: "38",
    type: "topic",
    data: {
      label: "Pensamento Computacional",
      width: 210,
      showLeftHandle: true,
    },
    position: { x: 975, y: 650 },
  },
  {
    id: "39",
    type: "roadmap",
    data: {
      label: "Estatística",
      showTRightHandle: true,
      showSLeftHandle: true,
      showSBottomHandle: true,
      showSRightHandle: true,
    },
    position: { x: 300, y: 750 },
  },
  {
    id: "40",
    type: "topic",
    data: {
      label: "Introdução / Conceitos básicos",
      width: 200,
      showRightHandle: true,
    },
    position: { x: 0, y: 750 },
  },
  {
    id: "41",
    type: "topic",
    data: { label: "Representação de dados", width: 200, showTopHandle: true },
    position: { x: 0, y: 850 },
  },
  {
    id: "42",
    type: "topic",
    data: { label: "Distribuição de frequências", width: 200 },
    position: { x: 0, y: 900 },
  },
  {
    id: "43",
    type: "topic",
    data: { label: "Medidas de Tendência Central", width: 200 },
    position: { x: 0, y: 950 },
  },
  {
    id: "44",
    type: "topic",
    data: { label: "Medidas de Dispersão", width: 200, showTopHandle: true },
    position: { x: 210, y: 850 },
  },
  {
    id: "45",
    type: "topic",
    data: { label: "Distribuição Normal", width: 200 },
    position: { x: 210, y: 900 },
  },
  {
    id: "46",
    type: "topic",
    data: { label: "Estatística inferencial", width: 200 },
    position: { x: 210, y: 950 },
  },
  {
    id: "47",
    type: "topic",
    data: { label: "Amortização", width: 410 },
    position: { x: 0, y: 1000 },
  },
  {
    id: "48",
    type: "roadmap",
    data: {
      label: "Medidas",
      showTLeftHandle: true,
      showSTopHandle: true,
      showSRightHandle: true,
    },
    position: { x: 675, y: 750 },
  },
  {
    id: "49",
    type: "topic",
    data: { label: "Notação Científica", width: 150 },
    position: { x: 675, y: 615 },
  },
  {
    id: "50",
    type: "topic",
    data: { label: "Sistema Binário", width: 150, showBottomHandle: true },
    position: { x: 675, y: 665 },
  },

  {
    id: "51",
    type: "roadmap",
    data: {
      label: "Trigonometria",
      showTLeftHandle: true,
      showSLeftHandle: true,
      showSBottomHandle: true,
    },
    position: { x: 1060, y: 750 },
  },
  {
    id: "52",
    type: "topic",
    data: { label: "Triângulos Retângulos", width: 250, showTopHandle: true },
    position: { x: 1010, y: 825 },
  },
  {
    id: "53",
    type: "topic",
    data: { label: "Triângulos quaisquer", width: 250 },
    position: { x: 1010, y: 875 },
  },
  {
    id: "54",
    type: "topic",
    data: { label: "Razões inversas", width: 250 },
    position: { x: 1010, y: 925 },
  },
  {
    id: "55",
    type: "topic",
    data: { label: "Ângulos e arcos de uma circunferência", width: 250 },
    position: { x: 1010, y: 975 },
  },
  {
    id: "56",
    type: "topic",
    data: { label: "Ciclo trigonométrico", width: 250 },
    position: { x: 1010, y: 1025 },
  },
  {
    id: "57",
    type: "topic",
    data: { label: "Funções trigonométricas", width: 250 },
    position: { x: 1010, y: 1075 },
  },
  {
    id: "58",
    type: "topic",
    data: { label: "Identidades Trigonométricas", width: 250 },
    position: { x: 1010, y: 1125 },
  },
  {
    id: "59",
    type: "roadmap",
    data: {
      label: "Probabilidade",
      showTTopHandle: true,
      showSLeftHandle: true,
      showSBottomHandle: true,
    },
    position: { x: 750, y: 950 },
  },
  {
    id: "60",
    type: "topic",
    data: { label: "Contagem", width: 175, showRightHandle: true },
    position: { x: 450, y: 875 },
  },
  {
    id: "61",
    type: "topic",
    data: { label: "Probabilidade", width: 175, showRightHandle: true },
    position: { x: 450, y: 925 },
  },
  {
    id: "62",
    type: "topic",
    data: {
      label: "Probabilidade e Contagem",
      width: 175,
      showRightHandle: true,
    },
    position: { x: 450, y: 975 },
  },
  {
    id: "63",
    type: "topic",
    data: {
      label: "Probabilidade e Estatística",
      width: 175,
      showRightHandle: true,
    },
    position: { x: 450, y: 1025 },
  },
  {
    id: "64",
    type: "topic",
    data: {
      label: "",
      width: 460,
      showTopHandle: true,
      bg: "#fff",
      height: 150,
    },
    position: { x: 350, y: 1200 },
  },
  {
    id: "65",
    type: "topic",
    data: {
      label: "Dê uma olhada em algumas outras trilhas relevantes",
      width: 460,
      bg: "transparent",
      border: "none",
    },
    position: { x: 350, y: 1200 },
  },
  {
    id: "66",
    type: "topic",
    data: {
      label: "Álgebra 1",
      width: 100,
      bg: "#1865F2",
      border: "none",
      color: "#fff",
    },
    position: { x: 365, y: 1250 },
  },
  {
    id: "67",
    type: "topic",
    data: {
      label: "Geometria",
      width: 100,
      bg: "#1865F2",
      border: "none",
      color: "#fff",
    },
    position: { x: 475, y: 1250 },
  },
  {
    id: "68",
    type: "topic",
    data: {
      label: "Álgebra 2",
      width: 100,
      bg: "#1865F2",
      border: "none",
      color: "#fff",
    },
    position: { x: 585, y: 1250 },
  },
  {
    id: "69",
    type: "topic",
    data: {
      label: "Estatística",
      width: 100,
      bg: "#1865F2",
      border: "none",
      color: "#fff",
    },
    position: { x: 695, y: 1250 },
  },
  {
    id: "70",
    type: "topic",
    data: {
      label: "Medidas",
      width: 100,
      bg: "#1865F2",
      border: "none",
      color: "#fff",
    },
    position: { x: 435, y: 1295 },
  },
  {
    id: "71",
    type: "topic",
    data: {
      label: "Trigonometria",
      width: 100,
      bg: "#1865F2",
      border: "none",
      color: "#fff",
    },
    position: { x: 545, y: 1295 },
  },
  {
    id: "72",
    type: "topic",
    data: {
      label: "Probabilidade",
      width: 100,
      bg: "#1865F2",
      border: "none",
      color: "#fff",
    },
    position: { x: 655, y: 1295 },
  },
];

const nodeTypes = {
  roadmap: RoadMapNode,
  topic: TopicNode,
};

const RoadmapEstatisc = () => {
  return (
    <div className="w-full h-[100vh]">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView />
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
