"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, { Controls, Node, Edge } from "reactflow";
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
  ];
  const nodes = [
    {
      id: "1",
      data: { label: "Geometria" },
      position: { x: 350, y: 50 },  
      style: {
        backgroundColor: "#1865F2",
        color: "#fff",
        borderRadius: "12px",
        padding: "20px",
        width: "300px",
        height: "100px",
        fontWeight: "bold",
        fontSize: "22px",
      },
    },
    {
      id: "2",
      data: { label: "Ponto" },
      position: { x: 600, y: 200 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "3",
      data: { label: "Reta" },
      position: { x: 100, y: 400 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "4",
      data: { label: "Plano" },
      position: { x: 600, y: 400 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "5",
      data: { label: "Posições Relativas" },
      position: { x: 350, y: 600 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "6",
      data: { label: "Distância entre Dois Pontos" },
      position: { x: 100, y: 800 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "7",
      data: { label: "Ângulos" },
      position: { x: 600, y: 800 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "8",
      data: { label: "Polígonos" },
      position: { x: 350, y: 1000 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "9",
      data: { label: "Áreas" },
      position: { x: 100, y: 1200 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "10",
      data: { label: "Trigonometria" },
      position: { x: 600, y: 1400 },
      style: {
        backgroundColor: "#E3EFFF",
        border: "2px solid #1865F2",
        borderRadius: "12px",
        padding: "20px",
        width: "250px",
        height: "80px",
        fontSize: "18px",
      },
    },
    {
      id: "11",
      data: { label: "Quizzes" },
      position: { x: 700, y: 1700 },
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
        <ReactFlow nodes={nodes} edges={edges} >
          <Controls />
        </ReactFlow>
      </div>
    );
  };
  export default RoadmapEstatisc;