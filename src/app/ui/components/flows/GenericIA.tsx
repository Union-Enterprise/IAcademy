import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactFlow, { Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { useUser } from "@/app/context/UserContext";
import { useParams } from "next/navigation";

interface RoadmapData {
  [topic: string]: string[];
}

const ENEMRoadmap: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { user, loading } = useUser();

  const params = useParams();
  const modulo = decodeURIComponent(params.modulo);
  const unidadeKey = decodeURIComponent(params.unidade);

  function capitalizeWords(text) {
    return text
      .toLowerCase()
      .split(' ') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' ');
  }

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5002/roadmap", {}, { withCredentials: true }
        );

        const roadmap = response.data[modulo];
        if (typeof roadmap !== "object" || roadmap === null) {
          throw new Error("Roadmap is not a valid object");
        }

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        const xOffset = 500; // Ajuste do espaçamento horizontal
        let currentY = 50;

        const parentNodeId = `topic-${modulo}`;
        const parentNodeX = 0;
        newNodes.push({
          id: parentNodeId,
          data: { label: capitalizeWords(modulo) },
          position: { x: parentNodeX, y: currentY },
          style: {
            backgroundColor: "#0057B7",
            color: "#fff",
            borderRadius: "8px",
            padding: "20px",
            width: "320px",
            fontWeight: "bold",
            fontSize: "24px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)"
          },
        });

        currentY += 200;

        const unidadeKeys = Object.keys(roadmap.unidades);
        const totalUnidades = unidadeKeys.length;
        let currentX = -(xOffset * (totalUnidades - 1)) / 2;

        unidadeKeys.forEach((unidadeKey, index) => {
          const unidade = roadmap.unidades[unidadeKey];
          const unidadeNodeId = `unidade-${unidadeKey}`;

          newNodes.push({
            id: unidadeNodeId,
            data: { label: unidade.title },
            position: { x: currentX, y: currentY },
            style: {
              backgroundColor: "#E6F2FF",
              border: "2px solid #0057B7",
              borderRadius: "8px",
              padding: "20px",
              width: "320px",
              fontSize: "20px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            },
          });

          newEdges.push({
            id: `${parentNodeId}-${unidadeNodeId}`,
            source: parentNodeId,
            target: unidadeNodeId,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#0057B7", strokeWidth: 2 },
          });

          let topicY = currentY + 200; // Aumenta o espaçamento vertical entre tópicos
          let previousTopicNodeId = null;
          Object.keys(unidade.topicos).forEach((topicoKey, topicIndex) => {
            const topicoNodeId = `topico-${unidadeKey}-${topicoKey}`;

            newNodes.push({
              id: topicoNodeId,
              data: { label: topicoKey },
              position: { x: currentX, y: topicY },
              style: {
                backgroundColor: "#F0F8FF",
                border: "1px solid #0057B7",
                borderRadius: "8px",
                padding: "10px",
                width: "280px",
                fontSize: "18px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              },
            });

            if (topicIndex === 0) {
              newEdges.push({
                id: `${unidadeNodeId}-${topicoNodeId}`,
                source: unidadeNodeId,
                target: topicoNodeId,
                type: "smoothstep",
                animated: true,
                style: { stroke: "#0057B7", strokeWidth: 2 },
              });
            } else if (previousTopicNodeId) {
              newEdges.push({
                id: `${previousTopicNodeId}-${topicoNodeId}`,
                source: previousTopicNodeId,
                target: topicoNodeId,
                type: "smoothstep",
                animated: true,
                style: { stroke: "#0057B7", strokeWidth: 2 },
              });
            }

            previousTopicNodeId = topicoNodeId;
            topicY += 200; // Ajusta o espaçamento vertical entre os tópicos
          });

          currentX += xOffset; // Incrementa o espaçamento horizontal entre as unidades
        });

        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error fetching roadmap data:", error);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div style={{ height: "80vh", width: "100%", overflow: "hidden" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ENEMRoadmap;
