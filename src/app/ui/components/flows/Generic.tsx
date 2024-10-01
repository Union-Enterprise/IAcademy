"use client";
import React from "react";
import ReactFlow, { Controls } from "reactflow";
import "reactflow/dist/style.css";

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

const ENEMRoadmap = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ENEMRoadmap;
