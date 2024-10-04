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

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get<{ roadmap: RoadmapData[] }>("http://localhost:5002/roadmap");
        
        console.log("API Response:", response.data);

        const roadmapData = response.data[0];
        const roadmap = roadmapData.roadmap;

        if (typeof roadmap !== "object" || roadmap === null) {
          throw new Error("Roadmap is not a valid object");
        }

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        let nodeId = 1;

        if (Object.keys(roadmap).length === 0) {
          console.error("Roadmap is empty");
          return; 
        }

        let previousNodeId: string | null = null;

        for (const [topic, subjects] of Object.entries(roadmap)) {
          if (!Array.isArray(subjects)) {
            console.error(`Subjects for topic "${topic}" is not an array:`, subjects);
            continue; 
          }

          const parentNodeId = nodeId.toString();
          newNodes.push({
            id: parentNodeId,
            data: { label: topic },
            position: { x: 50, y: nodeId * 75 }, 
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

          const limitedSubjects = subjects.slice(0, 3);
          const remainingCount = subjects.length - limitedSubjects.length;

          limitedSubjects.forEach((subject, index) => {
            const childNodeId = (nodeId + index + 1).toString();
            newNodes.push({
              id: childNodeId,
              data: { label: subject },
              position: { x: 420, y: (nodeId + index + 1) * 75 },
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
          });

          if (remainingCount > 0) {
            const moreNodeId = (nodeId + limitedSubjects.length + 1).toString();
            newNodes.push({
              id: moreNodeId,
              data: { label: `+ ${remainingCount} mais...` },
              position: { x: 420, y: (nodeId + limitedSubjects.length + 1) * 75 },
              style: {
                backgroundColor: "#FFC107",
                border: "2px solid #1865F2",
                borderRadius: "8px",
                padding: "20px",
                width: "400px",
                fontSize: "25px",
                textAlign: "center",
              },
            });
            newEdges.push({
              id: `${parentNodeId}-${moreNodeId}`,
              source: parentNodeId,
              target: moreNodeId,
              animated: true,
              style: { stroke: "#1865F2" },
            });
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
          nodeId += subjects.length + 1;
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
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ENEMRoadmap;
