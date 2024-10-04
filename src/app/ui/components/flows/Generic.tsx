"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, { Controls, Node, Edge } from "reactflow";
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
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={(_, node) => node.data?.onClick && node.data.onClick()}
        defaultViewport={{ x: 200, y: 0, zoom: 0.4 }}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ENEMRoadmap;
