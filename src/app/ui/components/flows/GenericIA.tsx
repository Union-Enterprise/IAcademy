"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactFlow, { Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { useUser } from "@/app/context/UserContext";

interface RoadmapData {
  [topic: string]: string[];
}

const ENEMRoadmap: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { user, loading } = useUser();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.post<{ roadmap: RoadmapData[] }>(
          "http://localhost:5002/roadmap",
          { email: user.email } //deixar esse email dinamico a depender do usuario - tá feito, se n funcionar a culpa n é minha.
        );

        const roadmapData = response.data[0];
        const roadmap = roadmapData.roadmap;

        if (typeof roadmap !== "object" || roadmap === null) {
          throw new Error("Roadmap is not a valid object");
        }

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        let currentY = 50; // Início da trilha no eixo Y
        const xOffset = 200; // Largura entre nós em cada zig-zag

        // Nó principal: Estatística
        const parentNodeId = `topic-Estatistica`;
        newNodes.push({
          id: parentNodeId,
          data: { label: "Estatística" },
          position: { x: 0, y: currentY },
          style: {
            backgroundColor: "#1865F2",
            color: "#fff",
            borderRadius: "8px",
            padding: "20px",
            width: "300px",
            fontWeight: "bold",
            fontSize: "28px",
            textAlign: "center",
          },
        });

        currentY += 150; // Espaçamento vertical após o nó principal

        // Subtópicos organizados como uma trilha
        const statisticsSubjects = roadmap["Aritmética"];
        if (statisticsSubjects && Array.isArray(statisticsSubjects)) {
          statisticsSubjects.forEach((subject, index) => {
            const childNodeId = `subject-${index + 1}`;
            const isEven = index % 2 === 0;
            const positionX = isEven ? -xOffset : xOffset; // Alterna entre esquerda e direita

            newNodes.push({
              id: childNodeId,
              data: { label: subject },
              position: { x: positionX, y: currentY },
              style: {
                backgroundColor: "#E3EFFF",
                border: "2px solid #1865F2",
                borderRadius: "8px",
                padding: "20px",
                width: "300px",
                fontSize: "22px",
                textAlign: "center",
              },
            });

            // Conexão do nó anterior com o próximo na trilha
            const sourceId = index === 0 ? parentNodeId : `subject-${index}`;
            newEdges.push({
              id: `${sourceId}-${childNodeId}`,
              source: sourceId,
              target: childNodeId,
              type: "smoothstep",
              animated: true,
              style: { stroke: "#1865F2", strokeWidth: 2 },
            });

            currentY += 120; // Incrementa o Y para dar continuidade na trilha
          });
        }

        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error fetching roadmap data:", error);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div style={{ height: "80vh", width: "140vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={(_, node) => node.data?.onClick && node.data.onClick()}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ENEMRoadmap;
