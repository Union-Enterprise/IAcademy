"use client";
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

  console.log(modulo)

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
        const xOffset = 400; 
        let currentY = 50;

        const parentNodeId = `topic-${modulo}`;
        const parentNodeX = 0; 
        newNodes.push({
          id: parentNodeId,
          data: { label: capitalizeWords(modulo) },
          position: { x: parentNodeX, y: currentY },
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

        currentY += 150;

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
              backgroundColor: "#E3EFFF",
              border: "2px solid #1865F2",
              borderRadius: "8px",
              padding: "20px",
              width: "300px",
              fontSize: "22px",
              textAlign: "center",
            },
          });

          newEdges.push({
            id: `${parentNodeId}-${unidadeNodeId}`,
            source: parentNodeId,
            target: unidadeNodeId,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#1865F2", strokeWidth: 2 },
          });

          let topicY = currentY + 150;
          let previousTopicNodeId = null;
          Object.keys(unidade.topicos).forEach((topicoKey, topicIndex) => {
            const topicoNodeId = `topico-${unidadeKey}-${topicoKey}`;

            newNodes.push({
              id: topicoNodeId,
              data: { label: topicoKey },
              position: { x: currentX, y: topicY },
              style: {
                backgroundColor: "#F5FAFF",
                border: "1px solid #1865F2",
                borderRadius: "8px",
                padding: "20px",
                width: "250px",
                fontSize: "18px",
                textAlign: "center",
              },
            });

            if (topicIndex === 0) {
              newEdges.push({
                id: `${unidadeNodeId}-${topicoNodeId}`,
                source: unidadeNodeId,
                target: topicoNodeId,
                type: "smoothstep",
                animated: true,
                style: { stroke: "#1865F2", strokeWidth: 2 },
              });
            } else if (previousTopicNodeId) {
              newEdges.push({
                id: `${previousTopicNodeId}-${topicoNodeId}`,
                source: previousTopicNodeId,
                target: topicoNodeId,
                type: "smoothstep",
                animated: true,
                style: { stroke: "#1865F2", strokeWidth: 2 },
              });
            }

            previousTopicNodeId = topicoNodeId;
            topicY += 150;
          });

          currentX += xOffset;
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
    <div style={{ height: "80vh", width: "100vw" }}>
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
